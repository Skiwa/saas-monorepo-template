[Français](README.fr.md) | English

# Notes Management Application

A modern, scalable notes management application built as a monorepo with a clean architecture approach. This application demonstrates best practices in software engineering, including Domain-Driven Design (DDD), Hexagonal Architecture, and separation of concerns between frontend and backend.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Launching](#launching)
- [Project Structure](#project-structure)
- [Tech Stack Overview](#tech-stack-overview)
- [Technical Architecture](#technical-architecture)
- [Documentation](#documentation)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 25.0 or higher
- **Yarn** 4.12.0 or higher

## Installation

1. Clone the repository (if you haven't already)
2. Install all dependencies at the root level:

```bash
yarn install
```

This will install dependencies for all packages in the monorepo (backend, frontend, and api-contracts).

## Configuration

### Environment Variables

Both backend and frontend require environment variables to be configured. Copy the example files and adjust as needed.

#### Backend Configuration

1. Navigate to the backend package:

```bash
cd packages/backend
```

2. Copy the example environment file:

```bash
cp .env.example .env
```

3. The `.env` file should contain:

```env
SERVER_ENV=development
SERVER_HTTP_HOST=0.0.0.0
SERVER_HTTP_PORT=3003
```

#### Frontend Configuration

1. Navigate to the frontend package:

```bash
cd packages/frontend
```

2. Copy the example environment file:

```bash
cp .env.example .env
```

3. The `.env` file should contain:

```env
VITE_API_URL=http://localhost:3003
```

**Note**: Make sure the `VITE_API_URL` matches the backend server address configured in the backend `.env` file.

## Launching

### Backend

From the root directory, you can start the backend in development mode using:

```bash
yarn workspace backend dev
```

Or navigate to the backend directory and run:

```bash
cd packages/backend
yarn dev
```

The backend server will start on `http://localhost:3003` (or the host/port configured in your `.env` file).

### Frontend

From the root directory, you can start the frontend development server using:

```bash
yarn workspace frontend dev
```

Or navigate to the frontend directory and run:

```bash
cd packages/frontend
yarn dev
```

The frontend will typically start on `http://localhost:5173` (Vite's default port).

## Project Structure

### Monorepo Structure

```
saas-monorepo-template/
├── packages/
│   ├── api-contracts/     # Shared TypeScript types and DTOs
│   ├── backend/           # Backend application
│   └── frontend/          # Frontend application
├── package.json           # Root workspace configuration
└── tsconfig.json          # Root TypeScript configuration
```

The project uses **Yarn workspaces** to manage multiple packages in a single repository. The `api-contracts` package contains shared types and DTOs used by both frontend and backend to ensure type safety across the application.

### Backend Structure (`packages/backend/src/`)

```
src/
├── config/                        # Application configuration
│   ├── dependency-injections/    # Dependency injection container setup
│   ├── env/                       # Environment variable configuration
│   └── http/                      # Fastify HTTP server configuration
├── domains/                       # Business domains (bounded contexts)
│   └── notes-management/         # Example domain
│       ├── adapters/             # Ports and adapters
│       │   ├── inbound/          # Controllers and routers (entry points)
│       │   └── outbound/         # Repository interfaces (exit points)
│       ├── config/                # Domain-specific DI configuration
│       ├── domain/                # Core business logic
│       │   ├── entities/          # Domain entities
│       │   ├── errors/           # Domain-specific errors
│       │   ├── use-cases/         # Application use cases
│       │   └── value-objects/     # Value objects with validation
│       └── mappers/               # DTO to domain entity mappers
├── infrastructure/                # External implementations
│   └── in-memory/                 # In-memory repository implementations
└── shared/                        # Shared base classes and utilities
    ├── Controller.ts              # Base controller class
    ├── Entity.ts                 # Base entity class
    ├── HttpServer.ts             # HTTP server interface
    ├── UseCase.ts                # Base use case class
    └── ValueObject.ts            # Base value object class
```

The backend follows **Hexagonal Architecture** (Ports and Adapters) and **Domain-Driven Design** principles. Each domain is a bounded context containing all its business logic, use cases, and adapters.

### Frontend Structure (`packages/frontend/src/`)

```
src/
├── components/                    # React components (Atomic Design)
│   ├── atoms/                    # Basic UI components (buttons, inputs)
│   ├── molecules/                # Composite components
│   ├── organisms/                # Complex components (headers, lists)
│   ├── pages/                    # Page-level components
│   ├── templates/                # Layout templates
│   └── modal/                    # Modal components
├── config/                        # Application configuration
│   └── index.ts                  # Config with environment variables
├── core/                          # Core business logic layer
│   ├── di/                       # Dependency injection container
│   ├── domain/                   # Domain layer
│   │   ├── mappers/              # DTO to domain mappers
│   │   ├── ports/                # Gateway interfaces (ports)
│   │   ├── types/                # Domain types
│   │   └── use-cases/            # Application use cases
│   └── stores/                   # Zustand state management stores
├── infrastructure/                # External implementations
│   └── gateways/                 # API gateway implementations (adapters)
├── App.tsx                        # Root component with routing
└── main.tsx                       # Application entry point
```

The frontend follows a similar architectural pattern to the backend, with clear separation between domain logic, infrastructure, and presentation layers. Components are organized using **Atomic Design** principles.

## Tech Stack Overview

### Backend Technologies

| Technology      | Version | Purpose                                                            |
| --------------- | ------- | ------------------------------------------------------------------ |
| **Node.js**     | 25.0+   | JavaScript runtime environment                                     |
| **TypeScript**  | 5.9.3   | Type-safe JavaScript with static type checking                     |
| **Fastify**     | 5.6.2   | High-performance HTTP web framework                                |
| **Effect**      | 3.19.13 | Functional programming library for error handling and side effects |
| **Zod**         | 4.2.1   | Runtime validation and schema definition                           |
| **dotenv-safe** | 9.1.0   | Environment variable management with validation                    |
| **tsx**         | 4.21.0  | TypeScript execution for development (hot reload)                  |
| **pino-pretty** | 13.1.3  | Logging formatter for development                                  |

### Frontend Technologies

| Technology         | Version | Purpose                                          |
| ------------------ | ------- | ------------------------------------------------ |
| **React**          | 19.2.0  | UI library for building user interfaces          |
| **Vite**           | 7.2.4   | Fast build tool and development server           |
| **TypeScript**     | 5.9.3   | Type-safe JavaScript with static type checking   |
| **Material-UI**    | 7.3.6   | React component library for UI components        |
| **Zustand**        | 5.0.2   | Lightweight state management library             |
| **React Router**   | 7.11.0  | Client-side routing for single-page applications |
| **Axios**          | 1.13.2  | HTTP client for API requests                     |
| **React Compiler** | 1.0.0   | React optimization compiler (via Babel)          |
| **Emotion**        | 11.14+  | CSS-in-JS styling library (used by Material-UI)  |

### Development Tools

| Tool           | Version | Purpose                                  |
| -------------- | ------- | ---------------------------------------- |
| **Yarn**       | 4.12.0  | Package manager and workspace management |
| **ESLint**     | 9.39+   | Code linting and quality checking        |
| **Prettier**   | 3.7.4   | Code formatting for consistent style     |
| **TypeScript** | 5.9.3   | Type checking and compilation            |

## Technical Architecture

### Monorepo

This project uses a **monorepo structure** managed by Yarn workspaces. This approach allows:

- **Code sharing**: The `api-contracts` package provides shared types and DTOs between frontend and backend
- **Consistent tooling**: Shared ESLint, Prettier, and TypeScript configurations
- **Simplified dependency management**: Single `yarn install` installs all dependencies
- **Atomic changes**: Changes to shared contracts automatically propagate to all consumers

### Backend Architecture

The backend follows **Hexagonal Architecture** (also known as Ports and Adapters) combined with **Domain-Driven Design** principles:

- **Hexagonal Architecture**: Separates business logic from infrastructure concerns through ports (interfaces) and adapters (implementations)
- **Domain-Driven Design**: Organizes code by business domains (bounded contexts), with each domain containing its own entities, value objects, use cases, and errors
- **Clean Architecture**: Enforces dependency rules - outer layers depend on inner layers, never the reverse
- **Effect**: Uses functional programming patterns for composable, type-safe error handling and side effects

**Key Layers:**

- **Domain Layer**: Pure business logic with entities, value objects, and use cases
- **Adapters Inbound**: HTTP controllers and routers (entry points)
- **Adapters Outbound**: Repository interfaces (exit points)
- **Infrastructure**: Concrete implementations (database, external services)
- **Shared**: Common base classes and utilities

### Frontend Architecture

The frontend follows a similar architectural pattern to ensure consistency:

- **Domain Layer**: Business logic with use cases, domain types, and mappers
- **Infrastructure Layer**: API gateways that implement domain ports
- **Presentation Layer**: React components organized by Atomic Design
- **State Management**: Zustand stores that orchestrate use cases
- **Dependency Injection**: Container pattern for managing dependencies

**Key Patterns:**

- **Use Cases**: Encapsulate business logic and orchestrate domain operations
- **Gateways**: Abstract API communication behind interfaces (ports)
- **Stores**: Manage application state and coordinate use case execution
- **Atomic Design**: Component organization from atoms to templates

## Documentation

For more detailed documentation, please refer to:

- **[Backend Documentation](./packages/backend/README.md)** - Comprehensive backend architecture and implementation details
- **[Frontend README](./packages/frontend/README.md)** - Frontend-specific documentation
- **[API Contracts](./packages/api-contracts/README.md)** - Shared types and contracts documentation

---

> 💡 **Tip for New Developers**: Start by exploring the `notes-management` domain in the backend (`packages/backend/src/domains/notes-management/`) as it serves as a complete example of the architecture. Then examine how the frontend consumes this domain through the `api-contracts` package and implements the UI in `packages/frontend/src/components/pages/Notes.tsx`.
