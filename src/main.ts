import { Command, Prompt } from "@effect/cli";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { Effect, Layer } from "effect";
import * as Box from "./Box";
// Card components
import {
  descriptionCard,
  fixedWidthExample,
  servicesCard,
  simpleCard,
} from "./components/card-examples";
// Intermediate
import { codeEditorExample } from "./components/code-editor";
import { dashboard } from "./components/dashboard";
import { devDashboard } from "./components/dev-dashboard";
// Complex
import { fileManager } from "./components/file-manager";
import { detailedSystemInfo, systemInfo } from "./components/key-value-display";
import { detailedLogViewer, logViewer } from "./components/log-viewer";
import { progressBars } from "./components/progress-bar";
import { confirmationDialog, dialog } from "./components/simple-dialog";
import { enhancedLayout, sideBySide } from "./components/simple-layout";
import { detailedMenu, menu } from "./components/simple-menu";
// Simple
import {
  centeredPara,
  multilineText,
  simpleText,
} from "./components/simple-text";
import {
  detailedStatusBar,
  enhancedStatusBar,
  statusBar,
} from "./components/status-bar";
import { systemMonitor } from "./components/system-monitor";
import { processTable } from "./components/table";
import {
  documentationLayout,
  newspaperLayout,
  threeColumns,
  twoColumns,
} from "./components/text-columns";
import { OpenTUIService } from "./opentui-service";

const simpleDemo = [
  simpleText,
  multilineText,
  centeredPara,
  sideBySide,
  enhancedLayout,
  statusBar,
  enhancedStatusBar,
  menu,
  dialog,
  confirmationDialog,
  progressBars,
  systemInfo,
  // Card examples
  simpleCard,
  descriptionCard,
  servicesCard,
  fixedWidthExample,
];

const intermediateDemo = [
  codeEditorExample(),
  processTable,
  logViewer,
  detailedLogViewer,
  dashboard,
  detailedSystemInfo,
  detailedStatusBar,
  detailedMenu,
];

const complexDemo = [
  fileManager,
  devDashboard,
  systemMonitor,
  twoColumns,
  threeColumns,
  newspaperLayout,
  documentationLayout,
];

const complexityPrompt = Prompt.select({
  message: "Pick the complexity level (now featuring Box.para enhancements!)",
  choices: [
    {
      title: "Simple",
      value: "simple",
      description: "Basic components with Box.para text wrapping",
    },
    {
      title: "Intermediate",
      value: "intermediate",
      description: "Enhanced layouts with detailed formatting",
    },
    {
      title: "Complex",
      value: "complex",
      description: "Advanced multi-column layouts and text flowing",
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

    switch (results[0]) {
      case "simple":
        for (const output of simpleDemo) {
          yield* Effect.sync(() => {
            process.stdout.write(
              Box.render(
                Box.punctuateV(
                  [Box.emptyBox(1, 1), output, Box.text("=".repeat(50))],
                  Box.top,
                  Box.text("  ")
                )
              )
            );
          });
        }
        break;
      case "intermediate":
        for (const output of intermediateDemo) {
          yield* Effect.sync(() => {
            process.stdout.write(
              Box.render(
                Box.punctuateV(
                  [Box.emptyBox(1, 1), output, Box.text("=".repeat(50))],
                  Box.top,
                  Box.text("  ")
                )
              )
            );
          });
        }
        break;
      case "complex":
        for (const output of complexDemo) {
          yield* Effect.sync(() => {
            process.stdout.write(
              Box.render(
                Box.punctuateV(
                  [Box.emptyBox(1, 1), output, Box.text("=".repeat(50))],
                  Box.top,
                  Box.text("  ")
                )
              )
            );
          });
        }
        break;
    }

    yield* Effect.sync(() => {
      process.stdout.write(
        "\n\n✅ Enhanced UI components with Box.para functionality displayed!\n"
      );
      process.stdout.write(
        "💡 Notice the improved text wrapping and formatting!\n"
      );
      process.stdout.write("� You can press Ctrl+C to exit anytime!\n\n");
    });

    // Keep results visible for a moment, but make it interruptible
    yield* Effect.interruptible(Effect.sleep("5 seconds"));
  })
);

const cli = Command.run(FavoritesCommand, {
  name: "Enhanced TUI with Box.para",
  version: "0.0.2",
});

const MainLayer = Layer.mergeAll(BunContext.layer, OpenTUIService.Default);

cli(process.argv).pipe(Effect.provide(MainLayer), BunRuntime.runMain());
