import { Command, Prompt } from "@effect/cli";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { Effect, Layer } from "effect";
import { OpenTUIService } from "./opentui-service";

const colorPrompt = Prompt.select({
  message: "Pick your favorite color",
  choices: [
    {
      title: "Red",
      value: "#ff0000",
      description: "This option has a description",
    },
    { title: "Green", value: "#00ff00", description: "So does this one" },
    { title: "Blue", value: "#0000ff", disabled: true },
  ],
});

const prompt = Prompt.all([colorPrompt]);

const FavoritesCommand = Command.prompt(
  "favorites",
  prompt,
  Effect.fn(function* (results) {
    const opentuiService = yield* OpenTUIService;

    // Display results in a beautiful terminal box
    yield* opentuiService.renderBox(`Survey Results:\n${results[0]}`, {
      title: "📊 Your Survey Results",
    });
    yield* Effect.log("✅ Survey results displayed in the terminal box above!");
    yield* Effect.log("💡 You can press Ctrl+C to exit anytime!");

    // Keep results visible for a moment, but make it interruptible
    yield* Effect.interruptible(Effect.sleep("5 seconds"));
  })
);

const cli = Command.run(FavoritesCommand, {
  name: "Prompt Examples",
  version: "0.0.1",
});

const MainLayer = Layer.mergeAll(BunContext.layer, OpenTUIService.Default);

// Add global interrupt handler
process.on("SIGINT", () => {
  console.log("\n🛑 Received Ctrl+C - exiting cleanly...");
  process.exit(0);
});

cli(process.argv).pipe(
  Effect.provide(MainLayer),
  Effect.scoped,
  BunRuntime.runMain({
    disablePrettyLogger: true,
    disableErrorReporting: true,
  })
);
