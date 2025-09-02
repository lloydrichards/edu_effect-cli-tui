import { Command, Prompt } from "@effect/cli";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { Effect, Layer } from "effect";

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

const confirmPrompt = Prompt.confirm({
  message: "Can you please confirm?",
});

const datePrompt = Prompt.date({
  message: "What's your birth day?",
  dateMask: '"Year:" YYYY, "Month:" MM, "Day:" DD',
  validate: (date) =>
    date.getTime() > Date.now()
      ? Effect.fail("Your birth day can't be in the future")
      : Effect.succeed(date),
});

const numberPrompt = Prompt.float({
  message: `What is your favorite number?`,
  validate: (n) =>
    n > 0 ? Effect.succeed(n) : Effect.fail("must be greater than 0"),
});

const passwordPrompt = Prompt.password({
  message: "Enter your password: ",
  validate: (value) =>
    value.length === 0
      ? Effect.fail("Password cannot be empty")
      : Effect.succeed(value),
});

const togglePrompt = Prompt.toggle({
  message: "Yes or no?",
  active: "yes",
  inactive: "no",
});

const prompt = Prompt.all([
  colorPrompt,
  confirmPrompt,
  datePrompt,
  numberPrompt,
  passwordPrompt,
  togglePrompt,
]);

const FavoritesCommand = Command.prompt(
  "favorites",
  prompt,
  Effect.fn(function* (results) {
    yield* Effect.log("Your favorite color is", results[0]);
  })
);

const cli = Command.run(FavoritesCommand, {
  name: "Prompt Examples",
  version: "0.0.1",
});

const MainLayer = Layer.mergeAll(BunContext.layer);

cli(process.argv).pipe(
  Effect.provide(MainLayer),
  Effect.scoped,
  BunRuntime.runMain({
    disablePrettyLogger: true,
    disableErrorReporting: true,
  })
);
