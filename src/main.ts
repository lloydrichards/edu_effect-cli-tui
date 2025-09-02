import { Command, Prompt } from "@effect/cli";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { Effect, Layer } from "effect";
import { OpenTUIService } from "./opentui-service";

// Simple
import { simpleText, multilineText } from "./components/simple-text";
import { sideBySide } from "./components/simple-layout";
import { statusBar } from "./components/status-bar";
import { menu } from "./components/simple-menu";
import { dialog } from "./components/simple-dialog";
import { progressBars } from "./components/progress-bar";
import { systemInfo } from "./components/key-value-display";

// Intermediate
import { codeEditorExample } from "./components/code-editor";
import { dashboard } from "./components/dashboard";
import { logViewer } from "./components/log-viewer";
import { processTable } from "./components/table";

// Complex
import { fileManager } from "./components/file-manager";
import { devDashboard } from "./components/dev-dashboard";
import { systemMonitor } from "./components/system-monitor";

import { Box, render } from "./Box";

const simpleDemo = [
  render(simpleText),
  render(multilineText),
  render(sideBySide),
  render(statusBar),
  render(menu),
  render(dialog),
  render(progressBars),
  render(systemInfo),
];

const intermediateDemo = [
  render(codeEditorExample()),
  render(processTable),
  render(logViewer),
  render(dashboard),
];

const complexDemo = [
  render(fileManager),
  render(devDashboard),
  render(systemMonitor),
];
const complexityPrompt = Prompt.select({
  message: "Pick the complexity level",
  choices: [
    {
      title: "Simple",
      value: "simple",
      description: "Suitable for beginners",
    },
    {
      title: "Intermediate",
      value: "intermediate",
      description: "A bit more challenging",
    },
    {
      title: "Complex",
      value: "complex",
      description: "For advanced users",
    },
  ],
});

const prompt = Prompt.all([complexityPrompt]);

const FavoritesCommand = Command.prompt(
  "favorites",
  prompt,
  Effect.fn(function* (results) {
    // Add a small delay to ensure prompt is finished
    yield* Effect.sleep("200 millis");

    // Using process.stdout.write to bypass CLI prompt buffering issues
    yield* Effect.sync(() => {
      process.stdout.write(
        "\n🎉 Thanks for your input! Here are your results:\n\n"
      );
    });

    switch (results[0]) {
      case "simple":
        for (const output of simpleDemo) {
          yield* Effect.sync(() => {
            process.stdout.write(
              `${output}\n\n${render(Box.text("=".repeat(50)))}\n\n`
            );
          });
        }
        break;
      case "intermediate":
        for (const output of intermediateDemo) {
          yield* Effect.sync(() => {
            process.stdout.write(
              `${output}\n\n${render(Box.text("=".repeat(50)))}\n\n`
            );
          });
        }
        break;
      case "complex":
        for (const output of complexDemo) {
          yield* Effect.sync(() => {
            process.stdout.write(
              `${output}\n\n${render(Box.text("=".repeat(50)))}\n\n`
            );
          });
        }
        break;
    }

    yield* Effect.sync(() => {
      process.stdout.write(
        "\n\n✅ Survey results displayed in the terminal box above!\n"
      );
      process.stdout.write("💡 You can press Ctrl+C to exit anytime!\n\n");
    });

    // Keep results visible for a moment, but make it interruptible
    yield* Effect.interruptible(Effect.sleep("5 seconds"));
  })
);

const cli = Command.run(FavoritesCommand, {
  name: "Prompt Examples",
  version: "0.0.1",
});

const MainLayer = Layer.mergeAll(BunContext.layer, OpenTUIService.Default);

cli(process.argv).pipe(Effect.provide(MainLayer), BunRuntime.runMain());
