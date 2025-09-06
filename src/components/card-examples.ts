/**
 * Card Component Usage Examples
 *
 * This file demonstrates various ways to use the card component.
 */

import { Effect } from "effect";
import * as Box from "../Box";
import { createAutoSizedCard, createCard, createFixedWidthCard } from "./card";
import { createSimpleTable, TableServiceLayer } from "./table";

// Example 1: Simple text card
export const simpleCard = createCard(
  "Welcome",
  Box.text("Hello, World!"),
  30,
  6
);

// Example 2: Multi-line content card
export const descriptionCard = createAutoSizedCard(
  "Description",
  Box.para(
    "This card demonstrates how to display longer text content with automatic wrapping within the card boundaries.",
    Box.left,
    25
  )
);

// Example 4: Table-like content in a card
export const servicesCard = createAutoSizedCard(
  "Running Services",
  Effect.runSync(
    createSimpleTable(
      ["PID", "Name", "CPU%", "Memory", "Status"],
      [
        ["1234", "node", "12.5", "245MB", "Running"],
        ["5678", "postgres", "5.2", "512MB", "Running"],
        ["9012", "redis", "0.8", "64MB", "Running"],
        ["3456", "nginx", "2.1", "32MB", "Running"],
      ],
      [6, 12, 6, 8, 8]
    ).pipe(Effect.provide(TableServiceLayer))
  )
);

// Example 6: Fixed width cards with different content lengths
export const fixedWidthExample = Box.punctuateV(
  [
    createFixedWidthCard("Short", Box.text("Brief content"), 30),
    Box.text(""),
    createFixedWidthCard(
      "Long",
      Box.para(
        "This is much longer content that will be wrapped to fit within the fixed width boundaries of the card.",
        Box.left,
        25
      ),
      30
    ),
  ],
  Box.left,
  Box.text(" ")
);
