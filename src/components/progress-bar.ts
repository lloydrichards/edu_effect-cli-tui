/**
 * Progress Bar Component
 *
 * Demonstrates progress indicators with visual bars and percentage display.
 */

import * as Box from "../Box";

export const createProgressBar = (
  completed: number,
  total: number,
  width = 20
) => {
  const filledChars = Math.floor((completed / total) * width);
  const emptyChars = width - filledChars;
  const progressBar = "█".repeat(filledChars) + "░".repeat(emptyChars);
  const percentage = Math.round((completed / total) * 100);

  return Box.hcat(Box.top, [
    Box.text(`[${progressBar}]`),
    Box.text(` ${percentage}%`),
  ]);
};

// Example progress bars
export const progressBars = Box.vcat(Box.top, [
  createProgressBar(7, 10),
  createProgressBar(3, 10),
  createProgressBar(10, 10),
]);
