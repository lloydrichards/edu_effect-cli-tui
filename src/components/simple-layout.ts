/**
 * Simple Layout - Side by Side Display
 *
 * Demonstrates basic horizontal layout with two panels side by side.
 */

import * as Box from "../Box";

// Using Box.para for better content formatting
const leftPanel = Box.para(
  Box.left,
  20,
  "Left Panel Content: This section contains important information that is properly wrapped and formatted for better readability."
);

const rightPanel = Box.para(
  Box.left,
  20,
  "Right Panel Data: Statistics and metrics are displayed here with automatic text wrapping for optimal presentation."
);

export const sideBySide = Box.punctuateH(Box.top, Box.text("  |  "), [
  leftPanel,
  rightPanel,
]);

// Enhanced layout with different alignments
export const enhancedLayout = Box.punctuateH(Box.top, Box.text("   "), [
  Box.para(
    Box.left,
    25,
    "Left column with left-aligned text that flows naturally within the specified width constraints."
  ),

  Box.para(
    Box.left,
    25,
    "Right column containing additional data and information formatted in a clean and readable manner."
  ),
]);
