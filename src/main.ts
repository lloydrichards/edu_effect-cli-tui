import { Command, Prompt } from "@effect/cli";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { Doc } from "@effect/printer";
import { Ansi } from "@effect/printer-ansi";
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

const doc = Doc.hsep([
  Doc.text("red"),
  Doc.align(
    Doc.vsep([
      Doc.hsep([
        Doc.text("blue+u"),
        Doc.text("bold").pipe(Doc.annotate(Ansi.bold)),
        Doc.text("blue+u"),
      ]).pipe(Doc.annotate(Ansi.combine(Ansi.blue, Ansi.underlined))),
      Doc.text("red"),
    ])
  ),
]).pipe(Doc.annotate(Ansi.red));

const FavoritesCommand = Command.prompt(
  "favorites",
  prompt,
  Effect.fn(function* (results) {
    yield* Effect.log("🎉 Thanks for your input! Here are your results:");

    yield* Effect.log(JSON.stringify(results, null, 2));

    yield* Effect.log(Doc.render(doc, { style: "pretty" }));

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

cli(process.argv).pipe(Effect.provide(MainLayer), BunRuntime.runMain());
