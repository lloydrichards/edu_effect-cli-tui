import { Box, type CliRenderer, createCliRenderer, Text } from "@opentui/core";
import { Effect } from "effect";

// Define the OpenTUI service using the modern Effect.Service pattern
export class OpenTUIService extends Effect.Service<OpenTUIService>()(
  "OpenTUIService",
  {
    effect: Effect.gen(function* () {
      // Create a lazy renderer that's only initialized when needed
      const createRenderer = Effect.acquireRelease(
        Effect.tryPromise({
          try: () =>
            createCliRenderer({
              exitOnCtrlC: true,
            }),
          catch: (error) =>
            new Error(`Failed to create OpenTUI renderer: ${error}`),
        }),
        (render) => Effect.sync(() => render.stop())
      );

      const use = Effect.fn("OpenTUI.use")(
        <A>(f: (render: CliRenderer) => A): Effect.Effect<A, Error> =>
          Effect.scoped(
            Effect.gen(function* () {
              const renderer = yield* createRenderer;
              return yield* Effect.try({
                try: () => f(renderer),
                catch: (cause) => new Error(`OpenTUI use failed: ${cause}`),
              });
            })
          )
      );

      // Provide service methods that create renderer on demand
      const renderBox = (
        content: string,
        options: {
          title?: string;
          width?: number;
          height?: number;
          padding?: number;
        } = {}
      ): Effect.Effect<void, Error> =>
        use((render) => {
          const box = Box(
            {
              title: options.title,
              padding: 2,
              borderStyle: "single",
              alignItems: "center",
              justifyContent: "center",
            },
            Text({ content })
          );

          render.root.add(box);
        });

      return {
        use,
        renderBox,
      } as const;
    }),
  }
) {}
