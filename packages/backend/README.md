# 🚀 Backend

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Fastify](https://img.shields.io/badge/Fastify-5.6-green?style=flat-square&logo=fastify)
![Effect](https://img.shields.io/badge/Effect-3.19-purple?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-25.0-black?style=flat-square&logo=node.js)

A modern, scalable backend application built with **Hexagonal Architecture** and **Domain-Driven Design (DDD)** principles.

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Documentation](#-documentation)
- [Technologies](#-technologies)

## 🎯 Overview

This backend application follows best practices for building maintainable and scalable software:

- **🏗️ Hexagonal Architecture** - Clean separation of concerns with ports and adapters
- **📦 Domain-Driven Design** - Business logic organized by bounded contexts
- **⚡ Effect** - Functional programming for error handling and side effects
- **🔒 Type Safety** - Full TypeScript with strict type checking
- **✅ Validation** - Zod schemas for runtime validation

## 🏛️ Architecture

The application is structured using **Hexagonal Architecture** (also known as Ports and Adapters) combined with **Domain-Driven Design** principles.

### Key Layers

- **Domain Layer** - Core business logic, entities, value objects, and use cases
- **Adapters Inbound** - HTTP controllers and routers (entry points)
- **Adapters Outbound** - Repository interfaces (exit points)
- **Infrastructure** - Concrete implementations (database, external services)
- **Shared** - Common base classes and utilities

### Domain Organization

The application is organized by **bounded contexts** (domains), each containing:

- Domain entities and value objects
- Use cases (application services)
- Domain-specific errors
- Repository interfaces
- Controllers and routers
- Domain configuration

## 🚀 Quick Start

### Prerequisites

- Node.js 25.0+
- Yarn 4.12.0+

### Installation

```bash
# Install dependencies
yarn install
```

### Environment Setup

Create a `.env` file in the `packages/backend` directory:

```env
SERVER_ENV=development
SERVER_HTTP_HOST=api.local.localhost
SERVER_HTTP_PORT=3003
```

### Development

```bash
# Start development server with hot reload
yarn dev
```

The server will start on `http://api.local.localhost:3003`

### Build

```bash
# Compile TypeScript to JavaScript
yarn build
```

### Production

```bash
# Start production server
yarn start:prod
```

## 📚 Documentation

Comprehensive documentation is available in the [`documentation/`](./documentation/) directory:

### Core Concepts

- 📁 **[Project Structure](./documentation/project-structure.md)** - Folder organization and structure
- 🏗️ **[Hexagonal Architecture](./documentation/hexagonal-architecture.md)** - Architecture layers and principles
- 📦 **[Domain-Driven Design](./documentation/domain-driven-design.md)** - DDD concepts and bounded contexts

### Implementation Details

- 🔄 **[Data Flow](./documentation/data-flow.md)** - Request lifecycle and data flow
- 🎨 **[Patterns & Concepts](./documentation/patterns-and-concepts.md)** - Design patterns and architectural concepts
- 💡 **[Domain Example](./documentation/domain-example.md)** - Complete example with `notes-management` domain
- 🛠️ **[Technologies](./documentation/technologies.md)** - Technologies, dependencies, and their roles

## 🛠️ Technologies

### Core Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **TypeScript** | 5.9.3 | Type-safe JavaScript |
| **Fastify** | 5.6.2 | High-performance HTTP server |
| **Effect** | 3.19.13 | Functional programming and error handling |
| **Zod** | 4.2.1 | Runtime validation and schema definition |

### Development Tools

- **tsx** - TypeScript execution
- **pino-pretty** - Logging formatter
- **dotenv-safe** - Environment variable management

## 📖 Example Domain

The `notes-management` domain serves as a complete example of the architecture:

- ✅ Entity with business logic (`Note`)
- ✅ Value objects with validation (`NoteTitle`, `NoteContent`)
- ✅ Use cases for business operations
- ✅ Domain-specific errors
- ✅ Repository pattern implementation
- ✅ Controllers and routers
- ✅ Dependency injection configuration

See the [Domain Example](./documentation/domain-example.md) documentation for detailed information.

## 🎓 Key Principles

- **Separation of Concerns** - Clear boundaries between layers
- **Dependency Inversion** - Depend on abstractions, not concretions
- **Single Responsibility** - Each class has one reason to change
- **Immutability** - Value objects and entities maintain immutability
- **Type Safety** - Leverage TypeScript for compile-time safety
- **Functional Programming** - Use Effect for composable, safe operations

---

> 💡 **Tip**: Start with the [Project Structure](./documentation/project-structure.md) documentation to understand the codebase organization, then explore the [Hexagonal Architecture](./documentation/hexagonal-architecture.md) and [Domain-Driven Design](./documentation/domain-driven-design.md) guides.
