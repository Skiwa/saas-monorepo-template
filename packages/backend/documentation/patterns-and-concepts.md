# 🎨 Patterns & Concepts

[← Back to Main README](../README.md)

## Table of Contents

- [Overview](#overview)
- [Dependency Injection](#dependency-injection)
- [Repository Pattern](#repository-pattern)
- [Use Case Pattern](#use-case-pattern)
- [Value Object Pattern](#value-object-pattern)
- [Entity Pattern](#entity-pattern)
- [Error Handling with Effect](#error-handling-with-effect)
- [Bounded Context Pattern](#bounded-context-pattern)
- [Factory Pattern](#factory-pattern)
- [Mapper Pattern](#mapper-pattern)

## Overview

This document explains the design patterns and architectural concepts used throughout the codebase. Understanding these patterns will help you navigate, extend, and maintain the application.

## Dependency Injection

**Dependency Injection (DI)** is a design pattern where dependencies are provided to a class rather than created within it. This promotes loose coupling and testability.

### Implementation

Dependencies are injected through constructors and configured in container files:

```39:49:packages/backend/src/domains/notes-management/config/notes-management-container.ts
const buildDependencies = (): NotesManagementDependencies => ({
  notesRepository: new InMemoryNotesRepository(),
});

const buildUseCases = (deps: NotesManagementDependencies): NotesManagementUseCases => ({
  createNote: new CreateNote(deps),
  deleteNote: new DeleteNote(deps),
  getAllNotes: new GetAllNotes(deps),
  getNoteById: new GetNoteById(deps),
  updateNote: new UpdateNote(deps),
});
```

### Use Case Example

```17:20:packages/backend/src/domains/notes-management/domain/use-cases/CreateNote.ts
export class CreateNote extends PublicUseCase<CreateNoteParams, Note, ExpectedErrors> {
  constructor(private readonly deps: CreateNoteDependencies) {
    super();
  }
```

### Benefits

- ✅ **Testability** - Easy to inject mock dependencies
- ✅ **Flexibility** - Can swap implementations without changing code
- ✅ **Loose Coupling** - Classes depend on interfaces, not concrete implementations

### Container Structure

```55:65:packages/backend/src/domains/notes-management/config/notes-management-container.ts
export const notesManagementContainer = (
  params: NotesManagementContainerParams
): NotesManagementDiContainer => {
  const dependencies = buildDependencies();
  const useCases = buildUseCases(dependencies);
  const controllers = buildControllers(useCases);

  const publicRouter = new NotesManagementPublicRouter(params.httpServer, controllers);

  return { controllers, dependencies, publicRouter, useCases };
};
```

## Repository Pattern

The **Repository Pattern** provides an abstraction layer over data persistence, hiding the details of data access.

### Interface (Port)

```6:10:packages/backend/src/domains/notes-management/adapters/outbound/NotesRepository.ts
export interface NotesRepository {
  findAll(): Effect.Effect<Note[]>;
  findOneByIdOrFail(id: NoteId): Effect.Effect<Note, NoteNotFoundError>;
  saveOne(note: Note): Effect.Effect<void>;
}
```

### Implementation (Adapter)

```7:33:packages/backend/src/infrastructure/in-memory/InMemoryNotesRepository.ts
export class InMemoryNotesRepository implements NotesRepository {
  private readonly notes: Map<NoteId, NoteState> = new Map();

  findAll(): Effect.Effect<Note[]> {
    return Effect.succeed(
      Array.from(this.notes.values())
        .filter((noteState) => noteState.deletedAt === null)
        .map((noteState) => Note.fromState(noteState))
    );
  }

  findOneByIdOrFail(id: NoteId): Effect.Effect<Note, NoteNotFoundError> {
    const noteState = this.notes.get(id);
    if (!noteState) {
      return Effect.fail(new NoteNotFoundError(id));
    }

    return Effect.succeed(Note.fromState(noteState));
  }

  saveOne(note: Note): Effect.Effect<void> {
    const state = note.toState();

    this.notes.set(state.id, state);
    return Effect.succeed(undefined);
  }
}
```

### Benefits

- ✅ **Testability** - Easy to create in-memory implementations
- ✅ **Flexibility** - Can swap database implementations
- ✅ **Domain Independence** - Domain doesn't know about persistence details

## Use Case Pattern

**Use Cases** (Application Services) orchestrate business operations. Each use case represents a single business operation.

### Structure

```7:13:packages/backend/src/shared/UseCase.ts
export default abstract class PublicUseCase<
  Params,
  Response,
  Errors extends Error,
> implements IPublicUseCase<Params, Response, Errors> {
  public abstract execute(request: Params): Effect.Effect<Response, Errors>;
}
```

### Example

```17:33:packages/backend/src/domains/notes-management/domain/use-cases/CreateNote.ts
export class CreateNote extends PublicUseCase<CreateNoteParams, Note, ExpectedErrors> {
  constructor(private readonly deps: CreateNoteDependencies) {
    super();
  }

  execute(params: CreateNoteParams): Effect.Effect<Note, ExpectedErrors> {
    const note = Note.create({
      content: params.content,
      title: params.title,
    });

    return pipe(
      this.deps.notesRepository.saveOne(note),
      Effect.map(() => note)
    );
  }
}
```

### Characteristics

- ✅ **Single Responsibility** - One use case = one business operation
- ✅ **Stateless** - No internal state
- ✅ **Composable** - Can be combined with Effect
- ✅ **Type-Safe** - Typed parameters, response, and errors

## Value Object Pattern

**Value Objects** represent values that are defined by their attributes, not their identity. They are immutable and self-validating.

### Base Class

```12:42:packages/backend/src/shared/ValueObject.ts
export abstract class ValueObject<T> {
  public readonly value: T;

  constructor(props: T) {
    this.value = Object.freeze(props);
  }

  public equals(valueObject: ValueObject<T>): boolean {
    if (valueObject === null || valueObject === undefined) {
      return false;
    }

    return isEqual(this.value, valueObject.value);
  }

  public static validateSchema<T>(
    params: ValidateSchemaParams<T>
  ): Effect.Effect<T, ValidationError> {
    const { value, schema, errorMessage } = params;

    const parseResult = schema.safeParse(value);

    if (parseResult.success) {
      return Effect.succeed(parseResult.data);
    }

    return Effect.fail(
      new ValidationError({ message: errorMessage, issues: parseResult.error.issues })
    );
  }
}
```

### Example Implementation

```9:16:packages/backend/src/domains/notes-management/domain/value-objects/NoteTitle.ts
export class NoteTitle extends ValueObject<NoteTitleProps> {
  static create(value: unknown): Effect.Effect<NoteTitle, ValidationError> {
    return pipe(
      this.validateSchema({ errorMessage: 'Invalid note title', schema: NoteTitleSchema, value }),
      Effect.map((validValue) => new NoteTitle(validValue))
    );
  }
}
```

### Benefits

- ✅ **Type Safety** - Prevents primitive obsession
- ✅ **Validation** - Encapsulates validation logic
- ✅ **Immutability** - Cannot be modified after creation
- ✅ **Self-Documenting** - Clear business meaning

## Entity Pattern

**Entities** are objects with identity and lifecycle. They encapsulate business logic and state.

### Base Class

```6:20:packages/backend/src/shared/Entity.ts
export abstract class BaseEntity<T extends BaseEntityState> {
  protected constructor(protected readonly state: T) {}

  get createdAt(): Date {
    return this.state.createdAt;
  }

  get id(): T['id'] {
    return this.state.id;
  }

  toState(): T {
    return structuredClone(this.state);
  }
}
```

### Example Implementation

```22:63:packages/backend/src/domains/notes-management/domain/entities/Note.ts
export class Note extends BaseEntity<NoteState> {
  private constructor(state: NoteState) {
    super(NoteStateSchema.parse(state));
  }

  static create(params: NoteCreateParams): Note {
    return new Note({
      content: params.content.value,
      createdAt: new Date(),
      deletedAt: null,
      id: createNoteId(),
      title: params.title.value,
    });
  }

  static fromState(state: NoteState): Note {
    return new Note(NoteStateSchema.parse(state));
  }

  get content(): NoteContent {
    return Effect.runSync(NoteContent.create(this.state.content));
  }

  get title(): NoteTitle {
    return Effect.runSync(NoteTitle.create(this.state.title));
  }

  delete(): this {
    this.state.deletedAt = new Date();
    return this;
  }

  setContent(content: NoteContent): this {
    this.state.content = content.value;
    return this;
  }

  setTitle(title: NoteTitle): this {
    this.state.title = title.value;
    return this;
  }
}
```

### Characteristics

- ✅ **Identity** - Unique identifier
- ✅ **Lifecycle** - Created, modified, deleted
- ✅ **Business Logic** - Encapsulates domain rules
- ✅ **Mutability** - Can change state while maintaining identity

## Error Handling with Effect

**Effect** provides functional error handling with type safety. Errors are part of the type system, not exceptions.

### Error Types

```1:16:packages/backend/src/shared/ProjectErrors.ts
import { ZodIssue } from 'zod';

export class ValidationError extends Error {
  constructor(public readonly params: { issues: ZodIssue[]; message: string }) {
    super(params.message);
    this.name = 'ValidationError';
  }

  get issues(): ZodIssue[] {
    return this.params.issues;
  }
}

export class NotFoundError extends Error {
  constructor(public readonly params: { message: string }) {
    super(params.message);
    this.name = 'NotFoundError';
  }
}
```

### Effect Error Handling

```typescript
// Use case returns Effect with typed errors
Effect.Effect<Note, NoteNotFoundError>

// Errors are handled explicitly
pipe(
  repository.findOneByIdOrFail(id),
  Effect.catchAll((error) => {
    // Handle error
    return Effect.fail(new CustomError());
  })
)
```

### Benefits

- ✅ **Type Safety** - Errors are part of the type system
- ✅ **Explicit** - Must handle errors, cannot ignore them
- ✅ **Composable** - Errors propagate through Effect chains
- ✅ **No Exceptions** - No thrown exceptions, all errors are typed

## Bounded Context Pattern

A **Bounded Context** is a logical boundary within which a domain model is valid. Each bounded context has its own:

- Domain model
- Ubiquitous language
- Business rules
- Use cases

### Implementation

Each domain in `src/domains/` is a bounded context:

```
domains/
└── notes-management/    # Bounded context
    ├── domain/          # Domain model
    ├── adapters/       # Application adapters
    └── config/         # Context configuration
```

### Benefits

- ✅ **Isolation** - Changes don't affect other contexts
- ✅ **Clarity** - Clear boundaries and responsibilities
- ✅ **Scalability** - Easy to add new contexts
- ✅ **Team Organization** - Teams can work independently

## Factory Pattern

The **Factory Pattern** provides a way to create objects without specifying their exact class. Entities use factory methods for creation.

### Entity Factory

```27:35:packages/backend/src/domains/notes-management/domain/entities/Note.ts
  static create(params: NoteCreateParams): Note {
    return new Note({
      content: params.content.value,
      createdAt: new Date(),
      deletedAt: null,
      id: createNoteId(),
      title: params.title.value,
    });
  }
```

### Value Object Factory

```10:15:packages/backend/src/domains/notes-management/domain/value-objects/NoteTitle.ts
  static create(value: unknown): Effect.Effect<NoteTitle, ValidationError> {
    return pipe(
      this.validateSchema({ errorMessage: 'Invalid note title', schema: NoteTitleSchema, value }),
      Effect.map((validValue) => new NoteTitle(validValue))
    );
  }
```

### Benefits

- ✅ **Validation** - Ensures valid objects are created
- ✅ **Encapsulation** - Hides construction details
- ✅ **Consistency** - Ensures objects are created correctly

## Mapper Pattern

**Mappers** transform between domain entities and DTOs (Data Transfer Objects). They keep the domain model separate from API contracts.

### Example

```typescript
// NoteMapper.ts (conceptual)
export class NoteMapper {
  static toDTO(note: Note): NoteDTO {
    return {
      id: note.id,
      title: note.title.value,
      content: note.content.value,
      createdAt: note.createdAt.toISOString(),
    };
  }

  static manyToDTO(notes: Note[]): NoteDTO[] {
    return notes.map((note) => this.toDTO(note));
  }
}
```

### Benefits

- ✅ **Separation** - Domain model independent of API
- ✅ **Flexibility** - Can change DTOs without affecting domain
- ✅ **Versioning** - Easy to support multiple API versions

## Pattern Comparison

| Pattern | Purpose | When to Use |
|---------|---------|-------------|
| **Dependency Injection** | Provide dependencies | When classes need external dependencies |
| **Repository** | Abstract persistence | When accessing data storage |
| **Use Case** | Orchestrate operations | For business operations |
| **Value Object** | Represent values | For validated, immutable values |
| **Entity** | Represent objects with identity | For business objects with lifecycle |
| **Factory** | Create objects | When object creation is complex |
| **Mapper** | Transform data | When converting between layers |

## Best Practices

### 1. Use Value Objects for Validation

```typescript
// ✅ Good
function createNote(title: NoteTitle, content: NoteContent) { ... }

// ❌ Bad
function createNote(title: string, content: string) { ... }
```

### 2. Keep Use Cases Focused

```typescript
// ✅ Good - One use case per operation
class CreateNote { ... }
class UpdateNote { ... }

// ❌ Bad - Multiple operations in one class
class NoteOperations {
  create() { ... }
  update() { ... }
}
```

### 3. Inject Dependencies

```typescript
// ✅ Good - Dependency injected
constructor(private readonly deps: Dependencies) { ... }

// ❌ Bad - Dependency created internally
constructor() {
  this.repository = new InMemoryRepository();
}
```

### 4. Use Effect for Errors

```typescript
// ✅ Good - Typed errors
Effect.Effect<Note, NoteNotFoundError>

// ❌ Bad - Thrown exceptions
throw new NoteNotFoundError(id);
```

### 5. Keep Domain Pure

```typescript
// ✅ Good - No external dependencies
class Note {
  // Only uses domain types
}

// ❌ Bad - External dependencies
class Note {
  // Uses Fastify, database, etc.
}
```

---

> 💡 **Next Steps**: See how these patterns work together in the [Domain Example](./domain-example.md), or explore the [technologies](./technologies.md) that enable these patterns.

