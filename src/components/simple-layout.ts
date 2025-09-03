/**
 * Simple Layout - Side by Side Display
 *
 * Demonstrates basic horizontal layout with two panels side by side.
 */

import { Box, left, punctuateH, top } from "../Box";

// Using Box.para for better content formatting
const leftPanel = Box.para(
  left,
  20,
  "Left Panel Content: This section contains important information that is properly wrapped and formatted for better readability."
);

const rightPanel = Box.para(
  left,
  20,
  "Right Panel Data: Statistics and metrics are displayed here with automatic text wrapping for optimal presentation."
);

export const sideBySide = punctuateH(top, Box.text("  |  "), [
  leftPanel,
  rightPanel,
]);

// Enhanced layout with different alignments
export const enhancedLayout = punctuateH(top, Box.text("   "), [
  Box.para(
    left,
    25,
    "Left column with left-aligned text that flows naturally within the specified width constraints."
  ),

  Box.para(
    left,
    25,
    "Right column containing additional data and information formatted in a clean and readable manner."
  ),
]);
