/**
 * Simple Dialog Box Component
 *
 * Demonstrates a centered dialog with title, message, and action buttons.
 */

import { Box, hcat, vcat, center1 } from "../Box";

const dialogTitle = Box.text("Confirmation");
const dialogMessage = Box.text("Are you sure you want to continue?");
const dialogButtons = hcat(center1, [
  Box.text("[Yes]"),
  Box.text("   "),
  Box.text("[No]"),
]);

export const dialog = vcat(center1, [
  dialogTitle,
  Box.text(""),
  dialogMessage,
  Box.text(""),
  dialogButtons,
]);
