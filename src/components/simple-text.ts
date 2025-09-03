/**
 * Simple Text Display - Basic Text Rendering
 *
 * Demonstrates basic text display functionality for single and multi-line text.
 */

import { Box, center1, left } from "../Box";

export const simpleText = Box.text("Hello, Terminal User Interface!");

export const multilineText = Box.para(
  left,
  18,
  `Welcome to the CLI This is line 2 And this is line 3`
);

export const centeredPara = Box.para(
  center1,
  30,
  "This paragraph will be center-aligned within 30 columns. Each line will be centered according to the alignment specification."
);
