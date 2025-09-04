/**
 * Simple Layout - Side by Side Display
 *
 * Demonstrates basic horizontal layout with two panels side by side.
 */

import * as Box from "../Box";

// Using Box.para for better content formatting
const leftPanel = Box.para(
  "Left Panel Content: This section contains important information that is properly wrapped and formatted for better readability.",
  Box.left,
  20
);

const rightPanel = Box.para(
  "Right Panel Data: Statistics and metrics are displayed here with automatic text wrapping for optimal presentation.",
  Box.left,
  20
);

export const sideBySide = Box.punctuateH(
  [leftPanel, rightPanel],
  Box.top,
  Box.text("  |  ")
);

// Enhanced layout with different alignments
export const enhancedLayout = Box.punctuateH(
  [
    Box.para(
      "Left column with left-aligned text that flows naturally within the specified width constraints.",
      Box.left,
      25
    ),

    Box.para(
      "Right column containing additional data and information formatted in a clean and readable manner.",
      Box.left,
      25
    ),
  ],
  Box.top,
  Box.text("   ")
);
