/**
 * Progress Bar Component
 *
 * Demonstrates progress indicators with visual bars and percentage display.
 */

import { Box, hcat, top, vcat } from "../Box";

export const createProgressBar = (
  completed: number,
  total: number,
  width = 20
) => {
  const filledChars = Math.floor((completed / total) * width);
  const emptyChars = width - filledChars;
  const progressBar = "█".repeat(filledChars) + "░".repeat(emptyChars);
  const percentage = Math.round((completed / total) * 100);

  return hcat(top, [Box.text(`[${progressBar}]`), Box.text(` ${percentage}%`)]);
};

// Example progress bars
export const progressBars = vcat(top, [
  createProgressBar(7, 10),
  createProgressBar(3, 10),
  createProgressBar(10, 10),
]);
