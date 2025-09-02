/**
 * Simple Layout - Side by Side Display
 *
 * Demonstrates basic horizontal layout with two panels side by side.
 */

import { Box, hcat, top } from "../Box";

const leftPanel = Box.text(`Left Panel
Content here
More info`);

const rightPanel = Box.text(`Right Panel
Data display
Statistics`);

export const sideBySide = hcat(top, [leftPanel, Box.text("  |  "), rightPanel]);
