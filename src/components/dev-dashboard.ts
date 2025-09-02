/**
 * Development Environment Dashboard - Complex TUI Application Demo
 *
 * Demonstrates a complete development environment with code editor,
 * terminal, git status, and project statistics.
 */

import { Box, hcat, vcat, top, left } from "../Box";

const createCodeBlock = (language: string, code: string) => {
  return vcat(left, [
    Box.text(`// ${language}`),
    Box.text("─".repeat(30)),
    Box.text(code),
    Box.text(""),
  ]);
};

const codeEditor = vcat(left, [
  Box.text("src/main.ts"),
  Box.text("─".repeat(40)),
  createCodeBlock(
    "TypeScript",
    `import { Effect } from 'effect';
import { Box, render } from './Box';

const app = Effect.sync(() => {
  const greeting = Box.text('Hello!');
  console.log(render(greeting));
});

Effect.runSync(app);`
  ),
]);

const terminal = vcat(left, [
  Box.text("Terminal"),
  Box.text("─".repeat(40)),
  Box.text("$ bun run build"),
  Box.text("✓ TypeScript compilation successful"),
  Box.text("✓ Bundle created: dist/main.js"),
  Box.text("$ bun test"),
  Box.text("✓ All tests passed (15/15)"),
  Box.text("$ _"),
]);

const gitStatus = vcat(left, [
  Box.text("Git Status"),
  Box.text("─".repeat(20)),
  Box.text("Branch: main"),
  Box.text("Status: Clean"),
  Box.text(""),
  Box.text("Recent commits:"),
  Box.text("• feat: add Box demos"),
  Box.text("• fix: render spacing"),
  Box.text("• docs: update README"),
  Box.text(""),
  Box.text("↑2 ↓0 ahead/behind"),
]);

const projectStats = vcat(left, [
  Box.text("Project Stats"),
  Box.text("─".repeat(20)),
  Box.text("Files: 42"),
  Box.text("Lines: 2,847"),
  Box.text("Functions: 156"),
  Box.text("Tests: 89"),
  Box.text("Coverage: 94%"),
  Box.text(""),
  Box.text("Dependencies:"),
  Box.text("• effect: ^3.17.10"),
  Box.text("• @effect/cli: ^0.69.2"),
  Box.text("• typescript: ^5.9.2"),
]);

export const devDashboard = vcat(left, [
  Box.text("Development Dashboard - MyProject"),
  Box.text("═".repeat(100)),
  hcat(top, [
    vcat(left, [codeEditor, Box.text(""), terminal]),
    Box.text("  │  "),
    vcat(left, [gitStatus, Box.text(""), projectStats]),
  ]),
]);
