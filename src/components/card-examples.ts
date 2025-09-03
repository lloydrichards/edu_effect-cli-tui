/**
 * Card Component Usage Examples
 *
 * This file demonstrates various ways to use the card component.
 */

import { Box, left, punctuateV } from "../Box";
import { createAutoSizedCard, createCard, createFixedWidthCard } from "./card";
import { createTable } from "./table";

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
    left,
    25,
    "This card demonstrates how to display longer text content with automatic wrapping within the card boundaries."
  )
);

// Example 4: Table-like content in a card
export const servicesCard = createAutoSizedCard(
  "Running Services",
  createTable(
    ["PID", "Name", "CPU%", "Memory", "Status"],
    [
      ["1234", "node", "12.5", "245MB", "Running"],
      ["5678", "postgres", "5.2", "512MB", "Running"],
      ["9012", "redis", "0.8", "64MB", "Running"],
      ["3456", "nginx", "2.1", "32MB", "Running"],
    ],
    [6, 12, 6, 8, 8]
  )
);

// Example 6: Fixed width cards with different content lengths
export const fixedWidthExample = punctuateV(left, Box.text(" "), [
  createFixedWidthCard("Short", Box.text("Brief content"), 30),
  Box.text(""),
  createFixedWidthCard(
    "Long",
    Box.para(
      left,
      25,
      "This is much longer content that will be wrapped to fit within the fixed width boundaries of the card."
    ),
    30
  ),
]);
