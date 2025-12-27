# 🛠️ Technologies

[← Back to Main README](../README.md)

## Table of Contents

- [Overview](#overview)
- [Core Technologies](#core-technologies)
- [Development Tools](#development-tools)
- [Architecture Libraries](#architecture-libraries)
- [Validation & Type Safety](#validation--type-safety)
- [Dependency Versions](#dependency-versions)
- [Technology Choices](#technology-choices)

## Overview

This document provides a comprehensive overview of all technologies, libraries, and tools used in the backend application, along with their purposes and roles.

## Core Technologies

### TypeScript

**Version:** 5.9.3  
**Purpose:** Type-safe JavaScript with static type checking

**Why TypeScript?**
- ✅ **Type Safety** - Catch errors at compile time
- ✅ **Better IDE Support** - Autocomplete, refactoring, navigation
- ✅ **Self-Documenting** - Types serve as documentation
- ✅ **Scalability** - Easier to maintain large codebases

**Usage:**
- All source code is written in TypeScript
- Strict type checking enabled
- ES modules with `.js` extensions in imports

### Node.js

**Version:** 25.0+  
**Purpose:** JavaScript runtime environment

**Why Node.js?**
- ✅ **Fast Execution** - V8 engine performance
- ✅ **Rich Ecosystem** - Large package ecosystem
- ✅ **Async I/O** - Non-blocking operations
- ✅ **Cross-Platform** - Runs on Windows, macOS, Linux

### Fastify

**Version:** 5.6.2  
**Purpose:** High-performance HTTP web framework

**Why Fastify?**
- ✅ **Performance** - One of the fastest Node.js frameworks
- ✅ **TypeScript Support** - Excellent TypeScript integration
- ✅ **Plugin System** - Extensible architecture
- ✅ **Schema Validation** - Built-in request validation
- ✅ **Low Overhead** - Minimal framework overhead

**Usage:**
- HTTP server implementation
- Request/response handling
- Route registration
- Health check endpoints

**Example:**
```typescript
// config/http/fastify.ts
const fastify = Fastify({
  logger: true
});

fastify.post('/notes', async (request, reply) => {
  // Handle request
});
```

## Development Tools

### tsx

**Version:** 4.21.0  
**Purpose:** TypeScript execution engine

**Why tsx?**
- ✅ **Direct Execution** - Run TypeScript without compilation
- ✅ **Fast Startup** - Faster than `ts-node`
- ✅ **Watch Mode** - Hot reload during development
- ✅ **ESM Support** - Native ES modules support

**Usage:**
```bash
# Development with hot reload
yarn dev  # Uses: tsx watch src/index.ts

# Direct execution
yarn start  # Uses: tsx src/index.ts
```

### pino-pretty

**Version:** 13.1.3  
**Purpose:** Pretty logger for Pino (Fastify's logger)

**Why pino-pretty?**
- ✅ **Readable Logs** - Human-readable log output
- ✅ **Colorized** - Color-coded log levels
- ✅ **Development Friendly** - Better developer experience

**Usage:**
- Development environment logging
- Pretty-printed request/response logs

### dotenv-safe

**Version:** 9.1.0  
**Purpose:** Environment variable management

**Why dotenv-safe?**
- ✅ **Validation** - Ensures required variables are set
- ✅ **Type Safety** - Validates environment variables
- ✅ **Error Messages** - Clear errors for missing variables

**Usage:**
```typescript
// config/env/index.ts
import { config as dotenvConfig } from 'dotenv-safe';
dotenvConfig();

const EnvSchema = z.object({
  env: z.enum(['development', 'production']),
  httpServer: z.object({
    host: z.string(),
    port: z.coerce.number(),
  }),
});
```

## Architecture Libraries

### Effect

**Version:** 3.19.13  
**Purpose:** Functional programming library for TypeScript

**Why Effect?**
- ✅ **Type-Safe Errors** - Errors are part of the type system
- ✅ **Composable** - Chain operations with `pipe`
- ✅ **No Exceptions** - All errors are explicit
- ✅ **Async Handling** - Built-in async/await support
- ✅ **Functional Style** - Immutable, pure functions

**Key Features:**
- `Effect.Effect<A, E>` - Represents computations that can fail
- `Effect.pipe()` - Compose operations
- `Effect.Do` - Do notation for sequential operations
- `Effect.map()`, `Effect.flatMap()` - Transform and chain

**Usage Examples:**

```typescript
// Simple effect
const result = Effect.succeed(42);

// Effect with error type
const note = Effect.Effect<Note, NoteNotFoundError>;

// Composing effects
pipe(
  repository.findOneById(id),
  Effect.map(note => note.setTitle(newTitle)),
  Effect.flatMap(note => repository.saveOne(note))
);
```

**Benefits in Our Architecture:**
- Use cases return `Effect.Effect<Response, Error>`
- Errors are typed and explicit
- No thrown exceptions
- Composable error handling

### Zod

**Version:** 4.2.1  
**Purpose:** TypeScript-first schema validation

**Why Zod?**
- ✅ **Type Inference** - Automatically infers TypeScript types
- ✅ **Runtime Validation** - Validates data at runtime
- ✅ **Type Safety** - TypeScript types from schemas
- ✅ **Composable** - Build complex schemas from simple ones
- ✅ **Error Messages** - Detailed validation errors

**Usage:**

#### Value Object Validation

```typescript
// domain/value-objects/NoteTitle.ts
export const NoteTitleSchema: z.ZodString = z.string().min(1).max(200);

// Validates and infers type
type NoteTitleProps = z.infer<typeof NoteTitleSchema>;
```

#### Request Validation

```typescript
// controllers/NotesController.ts
const validPayload = await validateSchema({
  payload: context.request.body,
  schema: V1.api.CreateNoteDTOSchema
});
```

#### Environment Validation

```typescript
// config/env/index.ts
const EnvSchema = z.object({
  env: z.enum(['development', 'production']),
  httpServer: z.object({
    host: z.string(),
    port: z.coerce.number(),
  }),
});
```

## Validation & Type Safety

### Runtime Validation

**Zod** provides runtime validation for:
- ✅ Value objects (NoteTitle, NoteContent)
- ✅ Request payloads (DTOs)
- ✅ Environment variables
- ✅ Route parameters

### Compile-Time Type Safety

**TypeScript** provides compile-time safety for:
- ✅ Function parameters and returns
- ✅ Entity state
- ✅ Use case inputs/outputs
- ✅ Repository interfaces
- ✅ Error types

## Dependency Versions

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@saas-monorepo-template/api-contracts` | `workspace:*` | Shared API contracts |
| `dotenv` | ^17.2.3 | Environment variables |
| `dotenv-safe` | ^9.1.0 | Safe environment variables |
| `effect` | ^3.19.13 | Functional programming |
| `fastify` | ^5.6.2 | HTTP server |
| `lodash` | ^4.17.21 | Utility functions |
| `shallow-equal` | ^3.1.0 | Shallow equality checks |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@types/dotenv-safe` | ^9 | TypeScript types |
| `@types/lodash` | ^4 | TypeScript types |
| `@types/node` | ^25.0.3 | Node.js types |
| `pino-pretty` | ^13.1.3 | Log formatting |
| `tsx` | ^4.21.0 | TypeScript execution |
| `typescript` | ^5.9.3 | TypeScript compiler |
| `zod` | ^4.2.1 | Schema validation |

## Technology Choices

### Why These Technologies?

#### TypeScript + Effect + Zod

This combination provides:
- **Type Safety** - TypeScript for compile-time
- **Runtime Safety** - Zod for runtime validation
- **Error Handling** - Effect for functional error handling
- **Validation** - Zod schemas for value objects

#### Fastify

Chosen for:
- **Performance** - One of the fastest frameworks
- **TypeScript** - Excellent TypeScript support
- **Simplicity** - Simple, focused API
- **Ecosystem** - Rich plugin ecosystem

#### Effect

Chosen for:
- **Functional Style** - Aligns with DDD principles
- **Type Safety** - Errors are part of types
- **Composability** - Easy to chain operations
- **No Exceptions** - Explicit error handling

### Technology Stack Summary

```
┌─────────────────────────────────────┐
│         Application Layer           │
│  (TypeScript + Effect + Zod)        │
├─────────────────────────────────────┤
│         HTTP Layer                  │
│         (Fastify)                    │
├─────────────────────────────────────┤
│         Runtime                     │
│         (Node.js)                    │
└─────────────────────────────────────┘
```

## Integration Points

### Effect + Zod

Effect and Zod work together for validation:

```typescript
// Value object creation with Effect and Zod
static create(value: unknown): Effect.Effect<NoteTitle, ValidationError> {
  return pipe(
    this.validateSchema({
      errorMessage: 'Invalid note title',
      schema: NoteTitleSchema,  // Zod schema
      value
    }),
    Effect.map((validValue) => new NoteTitle(validValue))
  );
}
```

### Fastify + TypeScript

Fastify provides excellent TypeScript support:

```typescript
// Typed route handlers
fastify.post<{ Body: CreateNoteDTO }>('/notes', async (request, reply) => {
  // request.body is typed
});
```

### Effect + Use Cases

Use cases leverage Effect for type-safe operations:

```typescript
// Typed use case
class CreateNote extends PublicUseCase<
  CreateNoteParams,
  Note,
  ExpectedErrors  // Typed errors
> {
  execute(params: CreateNoteParams): Effect.Effect<Note, ExpectedErrors> {
    // Type-safe implementation
  }
}
```

## Best Practices

### 1. Use Zod for All Validation

```typescript
// ✅ Good - Zod validation
const schema = z.string().min(1).max(200);
const value = schema.parse(input);

// ❌ Bad - Manual validation
if (input.length < 1 || input.length > 200) {
  throw new Error('Invalid');
}
```

### 2. Use Effect for Error Handling

```typescript
// ✅ Good - Effect with typed errors
Effect.Effect<Note, NoteNotFoundError>

// ❌ Bad - Thrown exceptions
throw new NoteNotFoundError(id);
```

### 3. Leverage TypeScript Types

```typescript
// ✅ Good - Explicit types
function createNote(params: CreateNoteParams): Effect.Effect<Note> { ... }

// ❌ Bad - Any types
function createNote(params: any): any { ... }
```

### 4. Use Fastify's Type System

```typescript
// ✅ Good - Typed routes
fastify.post<{ Body: CreateNoteDTO }>('/notes', handler);

// ❌ Bad - Untyped routes
fastify.post('/notes', handler);
```

## Performance Considerations

### Fastify Performance

- **Low Overhead** - Minimal framework overhead
- **Fast Routing** - Efficient route matching
- **JSON Parsing** - Optimized JSON handling
- **Request Logging** - Can be disabled in production

### Effect Performance

- **Lazy Evaluation** - Effects are lazy
- **Composition** - Efficient operation chaining
- **Memory** - Low memory footprint
- **Async** - Efficient async handling

### TypeScript Compilation

- **Incremental Builds** - Only recompiles changed files
- **Project References** - Efficient monorepo builds
- **Type Checking** - Can be separated from compilation

---

> 💡 **Next Steps**: Review the [Patterns & Concepts](./patterns-and-concepts.md) to see how these technologies enable the architectural patterns, or explore the [Domain Example](./domain-example.md) to see them in action.

