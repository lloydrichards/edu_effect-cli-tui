/**
 * Simple Dialog Box Component
 *
 * Demonstrates a centered dialog with title, message, and action buttons.
 */

import * as Box from "../Box";

const dialogTitle = Box.text("Confirmation");

// Using Box.para for better message formatting and potential wrapping
const dialogMessage = Box.para(
  "Are you sure you want to continue with this action? This will make permanent changes to your system.",
  Box.center1,
  50
);

const dialogButtons = Box.punctuateH(
  [Box.text("[Yes]"), Box.text("[No]")],
  Box.center1,
  Box.text("   ")
);

export const dialog = Box.punctuateV(
  [dialogTitle, dialogMessage, dialogButtons],
  Box.center1,
  Box.text("")
);

// Alternative dialog with longer content
export const confirmationDialog = Box.punctuateV(
  [
    Box.text("Warning"),
    Box.para(
      "This operation will permanently delete all selected files and cannot be undone. Please make sure you have backed up any important data before proceeding.",
      Box.center1,
      60
    ),
    Box.hcat(
      [Box.text("[Continue]"), Box.text("   "), Box.text("[Cancel]")],
      Box.center1
    ),
  ],
  Box.center1,
  Box.text("")
);
