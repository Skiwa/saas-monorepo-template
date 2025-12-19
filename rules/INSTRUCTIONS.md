# CODING INSTRUCTIONS - DETAILED

## General Principles
- Code must be **readable and maintainable** for 2+ years.
- Follow **DRY, SOLID, KISS** principles.
- Always think of the next developer reading your code.
- Code must be **in English**, including variables, functions, types, and comments.
- Avoid comments unless the code cannot be made clear otherwise.
- No TypeScript assertions (`as`) or `any` types.

## File & Folder Structure
- One file = one responsibility (Single Responsibility Principle).
- Folders: group by domain, feature, or module.
- Files/components: **PascalCase**.
- Utilities/helpers: **camelCase**.
- Object keys and imports **sorted alphabetically**.
- Keep files <300 lines if possible; split otherwise.

## Naming Conventions
- Use **explicit, descriptive names**; avoid abbreviations.
- Boolean variables: `isSomething`, `hasSomething`.
- Functions: verb + object pattern (`getUser`, `updateProfile`).
- Constants: UPPER_CASE or const with descriptive name.
- Type/Interface: PascalCase with clear suffix if needed (`UserDto`, `OrderEntity`).

## Readability & Formatting
- **2-space indentation**, no tabs.
- Max line length: 100 chars; wrap long lines.
- Use **consistent spacing** around operators, after commas, and inside braces.
- Avoid nested ternaries and deep nesting.
- Prefer early returns to reduce indentation.
- Group imports: 1) external, 2) internal, 3) styles/assets.
- Keep related lines together; separate logically distinct sections with a blank line.

## Functions & Methods
- Keep functions small (<30 lines ideally).
- Functions must have **explicit arguments** and **typed return**.
- Avoid side effects; pure functions preferred.
- Use `readonly` for arguments and immutable structures.
- Name function parameters clearly.
- Avoid too many arguments (>4); use objects if needed.

## Variables & Constants
- Prefer `const` over `let`; avoid `var`.
- Use `readonly` for immutable properties.
- Avoid `any` or unknown types; fully type everything.
- Prefer array/map/set methods over loops when readable.
- Avoid magic numbers/strings; define constants with descriptive names.

## TypeScript & Types
- Always type function arguments and returns.
- Avoid `any`, `unknown`, and type assertions (`as`).
- Prefer union types, enums, and discriminated unions for clarity.
- Use interfaces/types to describe domain models.
- Avoid inline object type literals for function parameters; define a type/interface.

## Modular & Reusable Code
- Extract reusable logic into functions or hooks.
- Avoid duplication; reuse existing utilities.
- Keep business/domain logic separate from framework or UI code.
- Prefer composition over inheritance.

## Error Handling
- Handle errors explicitly; do not ignore them.
- Return meaningful error messages, typed if possible.
- Avoid try/catch without action or logging.

## Testing
- Write **unit tests** for pure logic and critical code.
- Test edge cases and invalid inputs.
- Name tests descriptively: `shouldDoSomethingWhenCondition`.
- Avoid trivial tests (e.g., getters/setters).
- Integration tests for critical flows only.

## Git & Workflow
- Commits: present tense, descriptive, small.
- Branch naming: `feature/xxx`, `fix/xxx`.
- Always rebase and resolve conflicts cleanly.
- Include test coverage for new logic.

## Code Review
- Focus on **readability first, functionality second**.
- Question unnecessary complexity.
- Ensure all instructions in this document are followed.
- Prefer simplicity and clarity over clever solutions.

## Documentation & Comments
- Only comment when the code cannot be made clear.
- All comments must be **in English**.
- Prefer self-explanatory code over comments.

## Performance & Optimization
- Optimize only when necessary; prefer clarity first.
- Avoid premature optimizations.
- Use lazy loading, memoization, or caching only when justified.

## Security & Validation
- Validate all inputs (frontend and backend).
- Never trust client data.
- Use types to enforce contracts.
- Sanitize user input and handle exceptions.

## Optional Guidelines
- Consider patterns: Factory, Strategy, Repository, Dependency Injection when needed.
- Keep business/domain rules isolated from UI/framework code.
- Prefer immutability and functional style when reasonable.
- Avoid side-effects in utility functions.
