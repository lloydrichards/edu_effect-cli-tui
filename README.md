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

```sh

src/User.ts
────────────────────────────────────────
  1 │ export class User {
  2 │   constructor(
  3 │     public name: string,
  4 │     public email: string
  5 │   ) {}
  6 │   greet(): string {
  7 │     return "Hello, " + this.name + "!";
  8 │   }
  9 │ }
 10 │

```

```sh

  PID  |     Name     |  CPU%  |  Memory  |  Status
----------------------------------------------------
1234   | node         | 12.5   | 245MB    | Running
5678   | postgres     | 5.2    | 512MB    | Running
9012   | redis        | 0.8    | 64MB     | Running
3456   | nginx        | 2.1    | 32MB     | Running

```

```sh

Application Logs
────────────────────────────────────────────────────────────────────────────────
[2024-03-15 14:23:01]   INFO  Application started successfully
[2024-03-15 14:23:15]   INFO  Database connection established
[2024-03-15 14:24:32]   WARN  High memory usage detected (85%)
[2024-03-15 14:25:01]  ERROR  Failed to connect to external API
[2024-03-15 14:25:05]   INFO  Retrying API connection...
[2024-03-15 14:25:08]   INFO  API connection restored
────────────────────────────────────────────────────────────────────────────────
Press [q] to quit, [↑/↓] to scroll

```

```sh

        [ System ]                [ Network ]
─────────────────────────  ─────────────────────────
      CPU Usage: 65%            Inbound: 125KB/s
      ████████░░ 80%            Outbound: 67KB/s
      Load Avg: 1.2             Connections: 45
      Cores: 8                  Errors: 0

        [ Memory ]                  [ Disk ]
─────────────────────────  ─────────────────────────
    Memory: 12.3/16GB           Usage: 234/512GB
    ██████████ 77%              ████████░░ 45%
    Swap: 0.5/4GB               Free: 278GB
    Buffers: 1.2GB              IOPs: 1250

```

```sh

/Users/john/Documents
════════════════════════════════════════════════════════════════════════════════
Quick Access        │  Name                           SizeModified
───────────────        ──────────────────────────────────────────────────
🏠 Home                  📁 ..
📄 Documents             📁 Documents           2024-03-15
🖼️  Pictures            📁 Downloads           2024-03-14
🎵 Music               ► 📄 README.md                2.4KB2024-03-15
📹 Videos                🖼️ image.png               1.2MB2024-03-13
📱 Applications          📊 data.xlsx                456KB2024-03-12
Storage                  🎵 song.mp3                 3.8MB2024-03-11
───────────────          📹 video.mp4                125MB2024-03-10
💾 SSD: 234/512GB
████████░░ 46%
🗂️  Files: 12,543
📁 Folders: 1,867


────────────────────────────────────────────────────────────────────────────────
F1 Help | F2 Rename | F3 View | F4 Edit | F5 Copy | Del Delete

```

```sh

Development Dashboard - MyProject
════════════════════════════════════════════════════════════════════════════════════════════════════
src/main.ts                               │  Git Status
────────────────────────────────────────     ────────────────────
// TypeScript                                Branch: main
──────────────────────────────               Status: Clean
import { Effect } from 'effect';             Recent commits:
import { Box, render } from './Box';         • feat: add Box demos
const app = Effect.sync(() => {              • fix: render spacing
  const greeting = Box.text('Hello!');       • docs: update README
  console.log(render(greeting));             ↑2 ↓0 ahead/behind
});                                          Project Stats
Effect.runSync(app);                         ────────────────────
Terminal                                     Files: 42
────────────────────────────────────────     Lines: 2,847
$ bun run build                              Functions: 156
✓ TypeScript compilation successful          Tests: 89
✓ Bundle created: dist/main.js               Coverage: 94%
$ bun test                                   Dependencies:
✓ All tests passed (15/15)                   • effect: ^3.17.10
$ _                                          • @effect/cli: ^0.69.2
                                             • typescript: ^5.9.2

```

```sh

System Monitor Dashboard - macOS 14.0 - 14:35:22
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
CPU Usage %     Network KB/s                    System Alerts
│            │  │            │                  ─────────────────────────
│            │  │            │                  🔴 High CPU usage on core 4
│    █       │  │   █        │                  🟡 Disk space low (/var 85%)
│   █████    │  │   █        │                  🟢 All services running
│██ ███████  │  │  ███  █    │                  🟢 Network connectivity OK
│████████████│  │█ ███ ███   │                  🟡 1 security update available
│████████████│  │████████████│                  Last Check: 14:32:45
│████████████│  │████████████│                  Next Check: 14:37:45
└────────────┘  └────────────┘
Memory Usage %  Top Processes
│            │  ──────────────────────────────
│            │  PID    Name         CPU%  MEM%
│    █ ██    │  1234   chrome       15.2  8.4
│████████████│  5678   node         8.7   4.2
│████████████│  9012   postgres     3.1   12.8
│████████████│  3456   vscode       6.4   6.1
│████████████│  7890   safari       4.8   5.3
│████████████│  System Load: 1.85
└────────────┘  Uptime: 5d 14h 23m
                Users: 3 logged in
```

```sh
Terminal UI News
════════════════════════════════════════════════════════════════════════════════
HEADLINE STORY             TECH UPDATE                DEV TIPS
─────────────────────────  ─────────────────────────  ─────────────────────────
Breaking News:             Technology Update: The     Development Tips: When
Scientists have            latest version of our      working with text
discovered a new method    terminal UI library now    columns, consider the
for efficient text layout  includes advanced text     reading flow and ensure
in terminal applications.  flowing capabilities,      adequate spacing between
This breakthrough will     making it easier than      columns for optimal
revolutionize how we       ever to create             readability.
display information in     professional-looking
command-line interfaces.   layouts.
```

## 📚 Learning Resources

- [Effect-TS Documentation](https://www.effect.website/)
- [Haskell Box Library](https://hackage.haskell.org/package/boxes)
- [Terminal UI Design Patterns](https://en.wikipedia.org/wiki/Text-based_user_interface)
