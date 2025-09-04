/**
 * Card Component - Reusable bordered container with title
 *
 * Creates a bordered box with a title displayed at the top of the border.
 * The content can be any Box type, making it flexible for various use cases.
 */

import * as Box from "../Box";

/**
 * Creates a card component with a border and title
 * @param title - The title to display at the top of the border
 * @param content - The content box to display inside the card
 * @param width - The total width of the card (including border)
 * @param height - The total height of the card (including border and title)
 * @returns A Box representing the complete card with border and title
 */
export const createCard = (
  title: string,
  content: Box.Box,
  width: number,
  height: number
): Box.Box => {
  const cardWidth = Math.max(width, title.length + 6);
  const cardHeight = Math.max(height, 3);

  const contentHeight = Math.max(cardHeight - 2, 1);
  const contentWidth = Math.max(cardWidth - 4, 1);

  return Box.vcat(
    [
      createTopBorderWithTitle(title, cardWidth),
      createBorderedContent(Box.text(" "), cardWidth),
      createBorderedContent(
        Box.align(content, Box.left, Box.top, contentHeight, contentWidth),
        cardWidth
      ),
      createBorderedContent(Box.text(" "), cardWidth),
      Box.text(`┗${"━".repeat(cardWidth - 2)}┛`),
    ],
    Box.left
  );
};

/**
 * Helper function to create a top border with integrated title
 */
const createTopBorderWithTitle = (
  title: string,
  totalWidth: number
): Box.Box => {
  const titleWithBrackets = ` ${title} `;

  const leftBorderLength = 2;

  const leftBorder = "━".repeat(Math.max(0, leftBorderLength));
  const rightBorder = "━".repeat(
    Math.max(0, totalWidth - titleWithBrackets.length - 2 - leftBorderLength)
  );

  return Box.text(`┏${leftBorder}${titleWithBrackets}${rightBorder}┓`);
};

/**
 * Helper function to create content with side borders for each row
 */
const createBorderedContent = (
  content: Box.Box,
  totalWidth: number
): Box.Box => {
  const innerWidth = totalWidth - 4; // Account for borders and padding (┃ + space + content + space + ┃)

  // First, fit the content within the available space
  const fittedContent = Box.align(
    content,
    Box.left,
    Box.top,
    content.rows,
    innerWidth
  );

  // Create vertical border columns that span the full height
  const leftBorderCol = Box.vcat(
    Array.from({ length: content.rows }, () => Box.text("┃")),
    Box.left
  );
  const rightBorderCol = Box.vcat(
    Array.from({ length: content.rows }, () => Box.text("┃")),
    Box.left
  );
  const leftPaddingCol = Box.vcat(
    Array.from({ length: content.rows }, () => Box.text(" ")),
    Box.left
  );
  const rightPaddingCol = Box.vcat(
    Array.from({ length: content.rows }, () => Box.text(" ")),
    Box.left
  );

  // Combine horizontally: border + padding + content + padding + border
  return {
    rows: content.rows,
    cols: totalWidth,
    content: {
      _tag: "Row",
      boxes: [
        leftBorderCol,
        leftPaddingCol,
        fittedContent,
        rightPaddingCol,
        rightBorderCol,
      ],
    },
  };
};

/**
 * Creates a simple card with automatic sizing based on content
 * @param title - The title to display at the top of the border
 * @param content - The content box to display inside the card
 * @param padding - Optional padding around the content (default: 2)
 * @returns A Box representing the complete card with border and title
 */
export const createAutoSizedCard = (
  title: string,
  content: Box.Box,
  padding = 2
): Box.Box => {
  // Calculate dimensions based on content and title
  const minWidth = Math.max(content.cols + padding * 2 + 2, title.length + 4); // +2 for side borders, +4 for title brackets
  const height = content.rows + 2; // +2 for top border (with title) and bottom border

  return createCard(title, content, minWidth, height);
};

/**
 * Creates a card with a fixed aspect ratio
 * @param title - The title to display at the top of the border
 * @param content - The content box to display inside the card
 * @param width - The width of the card
 * @returns A Box representing the complete card with border and title
 */
export const createFixedWidthCard = (
  title: string,
  content: Box.Box,
  width: number
): Box.Box => {
  const height = content.rows + 2; // Auto-calculate height based on content (top border with title + bottom border)
  return createCard(title, content, width, height);
};
