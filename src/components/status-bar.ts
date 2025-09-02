/**
 * Status Bar Component
 *
 * Demonstrates a simple status bar with multiple information sections.
 */

import { Box, hcat, top } from "../Box";

export const createStatusBar = (
  status: string,
  progress: string,
  time: string
) => {
  return hcat(top, [
    Box.text(`Status: ${status}`),
    Box.text("  |  "),
    Box.text(`Progress: ${progress}`),
    Box.text("  |  "),
    Box.text(`Time: ${time}`),
  ]);
};

export const statusBar = createStatusBar("Running", "45%", "12:34");
