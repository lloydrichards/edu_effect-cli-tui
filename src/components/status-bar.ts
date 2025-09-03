/**
 * Status Bar Component
 *
 * Demonstrates a simple status bar with multiple information sections.
 */

import { alignHoriz, Box, center1, hcat, left, right, top, vcat } from "../Box";

export const createStatusBar = (
  status: string,
  progress: string,
  time: string
) => {
  return hcat(top, [
    Box.text(`Status: ${status}`),
    Box.text("  |  "),
    Box.text(`Progress: ${progress}`),
    Box.text("  |  "),
    Box.text(`Time: ${time}`),
  ]);
};

export const statusBar = createStatusBar("Running", "45%", "12:34");

// Enhanced status bar with better formatting using Box.para and alignment
export const createEnhancedStatusBar = (
  status: string,
  progress: string,
  time: string,
  width = 80
) => {
  const leftSection = alignHoriz(
    left,
    width / 3,
    Box.para(left, width / 3, `Status: ${status}`)
  );
  const centerSection = alignHoriz(
    center1,
    width / 3,
    Box.para(center1, width / 3, `Progress: ${progress}`)
  );
  const rightSection = alignHoriz(
    right,
    width / 3,
    Box.para(right, width / 3, `Time: ${time}`)
  );

  return hcat(top, [leftSection, centerSection, rightSection]);
};

export const enhancedStatusBar = createEnhancedStatusBar(
  "Application Running Successfully",
  "Database Sync 67% Complete",
  "14:35:22"
);

// Multi-line status bar for detailed information
export const createDetailedStatusBar = (
  systemStatus: string,
  networkStatus: string,
  userInfo: string,
  width = 80
) => {
  const statusLine = Box.para(
    left,
    width,
    `System: ${systemStatus} | Network: ${networkStatus} | User: ${userInfo}`
  );
  const separator = Box.text("─".repeat(width));

  return vcat(left, [statusLine, separator]);
};

export const detailedStatusBar = createDetailedStatusBar(
  "CPU 45% Memory 67%",
  "Connected 125Mbps",
  "admin@localhost"
);
