/**
 * Simple Text Display - Basic Text Rendering
 *
 * Demonstrates basic text display functionality for single and multi-line text.
 */

import * as Box from "../Box";

export const simpleText = Box.text("Hello, Terminal User Interface!");

export const multilineText = Box.para(
  "Welcome to the CLI This is line 2 And this is line 3",
  Box.left,
  18
);

export const centeredPara = Box.para(
  "This paragraph will be center-aligned within 30 columns. Each line will be centered according to the alignment specification.",
  Box.center1,
  30
);
