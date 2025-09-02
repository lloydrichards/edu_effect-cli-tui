# Effect CLI TUI

An experiment in creating flexible Terminal User Interfaces (TUIs) using a
ported Haskell Box layout system, built with Effect-TS.

This project demonstrates how to create TUIs using a functional approach to
layout management. The core is a TypeScript port of Haskell's
`Text.PrettyPrint.Boxes` library, providing declarative UI composition similar
to CSS flexbox but optimized for terminals.

**Key Features:**

- **Box System**: TypeScript port of Haskell's box layout library
- **Effect-TS Integration**: Functional programming patterns using the CLI
  package
- **Lots of Examples**: Had AI generate a variety of components

## 📁 Structure

```txt
.
├── original
│   └── box.hs                   # Original Haskell Box module
├── src
│   ├── components               # TUI Component Library (AI-generated)
│   ├── main.ts                  # CLI entry point with interactive demo
│   └── Box.ts                   # Ported Haskell Box module (TypeScript)
├── tests                        # Test suite
│
├── README.md                    # This file
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── biome.json                   # Code formatting and linting
```

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) runtime
- TypeScript knowledge (intermediate level recommended)

### Installation

```bash
# Install dependencies
bun install

# Run the interactive demo
bun start

# Run tests
bun test

# Watch mode
bun test --watch

# Lint and format
bun lint
bun format
```

## Vibed Components

> [!IMPORTANT]
>
> The majority of the components in this project were generated using AI
> assistance. Just for demonstration purposes.
>
> Tried to give the AI a decent set of primitives and asking for various complex
> UIs, then integrated into the main application structure. Was pleasantly
> surprised how effective this was, but I wouldn't trust using any of the
> examples in production without careful review.

## 📚 Learning Resources

- [Effect-TS Documentation](https://www.effect.website/)
- [Haskell Box Library](https://hackage.haskell.org/package/boxes)
- [Terminal UI Design Patterns](https://en.wikipedia.org/wiki/Text-based_user_interface)
