/**
 * Text Columns Component
 *
 * Demonstrates the Box.columns functionality for flowing text into multiple columns.
 */

import * as Box from "../Box";

// Example of flowing text into columns
const longText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
`;

// Create columns with different widths and heights
export const twoColumns = Box.punctuateH(
  Box.columns(longText, Box.left, 35, 15),
  Box.top,
  Box.text("   ")
);

export const threeColumns = Box.punctuateH(
  Box.columns(longText, Box.center1, 25, 12),
  Box.top,
  Box.text("  ")
);

// Newspaper-style layout with multiple articles
const article1 =
  "Breaking News: Scientists have discovered a new method for efficient text layout in terminal applications. This breakthrough will revolutionize how we display information in command-line interfaces.";

const article2 =
  "Technology Update: The latest version of our terminal UI library now includes advanced text flowing capabilities, making it easier than ever to create professional-looking layouts.";

const article3 =
  "Development Tips: When working with text columns, consider the reading flow and ensure adequate spacing between columns for optimal readability.";

export const newspaperLayout = Box.vcat(
  [
    Box.text("Terminal UI News"),
    Box.text("═".repeat(80)),
    Box.text(""),
    Box.punctuateH(
      [
        Box.vcat(
          [
            Box.text("HEADLINE STORY"),
            Box.text("─".repeat(25)),
            Box.para(article1, Box.left, 25),
          ],
          Box.left
        ),
        Box.vcat(
          [
            Box.text("TECH UPDATE"),
            Box.text("─".repeat(25)),
            Box.para(article2, Box.left, 25),
          ],
          Box.left
        ),
        Box.vcat(
          [
            Box.text("DEV TIPS"),
            Box.text("─".repeat(25)),
            Box.para(article3, Box.left, 25),
          ],
          Box.left
        ),
      ],
      Box.top,
      Box.text("  ")
    ),
  ],
  Box.left
);

// Documentation layout example
const documentationText = `
This component demonstrates the powerful text flowing capabilities of the Box library. The columns function allows you to automatically flow text into multiple columns with specified width and height constraints.

Key features include automatic word wrapping, proper spacing between words, and intelligent line breaking. The text flows naturally from one column to the next when the height limit is reached.

You can specify different alignments for each column, controlling how text is positioned within each column. This is particularly useful for creating professional documentation layouts, newspaper-style presentations, and multi-column reports.

The implementation handles edge cases such as very long words, empty lines, and maintains proper text formatting throughout the flowing process.
`;

export const documentationLayout = Box.vcat(
  [
    Box.text("Documentation Layout Example"),
    Box.text("━".repeat(60)),
    Box.text(""),
    Box.punctuateH(
      Box.columns(documentationText, Box.left, 28, 20),
      Box.top,
      Box.text("    ")
    ),
  ],
  Box.left
);
