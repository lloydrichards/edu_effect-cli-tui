/**
 * Simple Dialog Box Component
 *
 * Demonstrates a centered dialog with title, message, and action buttons.
 */

import { Box, center1, hcat, punctuateH, punctuateV, vcat } from "../Box";

const dialogTitle = Box.text("Confirmation");

// Using Box.para for better message formatting and potential wrapping
const dialogMessage = Box.para(
  center1,
  50,
  "Are you sure you want to continue with this action? This will make permanent changes to your system."
);

const dialogButtons = punctuateH(center1, Box.text("   "), [
  Box.text("[Yes]"),
  Box.text("[No]"),
]);

export const dialog = punctuateV(center1, Box.text(""), [
  dialogTitle,
  dialogMessage,
  dialogButtons,
]);

// Alternative dialog with longer content
export const confirmationDialog = punctuateV(center1, Box.text(""), [
  Box.text("Warning"),
  Box.para(
    center1,
    60,
    "This operation will permanently delete all selected files and cannot be undone. Please make sure you have backed up any important data before proceeding."
  ),
  hcat(center1, [
    Box.text("[Continue]"),
    Box.text("   "),
    Box.text("[Cancel]"),
  ]),
]);
