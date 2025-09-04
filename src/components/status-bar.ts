/**
 * Status Bar Component
 *
 * Demonstrates a simple status bar with multiple information sections.
 */

import * as Box from "../Box";

export const createStatusBar = (
  status: string,
  progress: string,
  time: string
) => {
  return Box.hcat(
    [
      Box.text(`Status: ${status}`),
      Box.text("  |  "),
      Box.text(`Progress: ${progress}`),
      Box.text("  |  "),
      Box.text(`Time: ${time}`),
    ],
    Box.top
  );
};

export const statusBar = createStatusBar("Running", "45%", "12:34");

// Enhanced status bar with better formatting using Box.para and alignment
export const createEnhancedStatusBar = (
  status: string,
  progress: string,
  time: string,
  width = 80
) => {
  const leftSection = Box.alignHoriz(
    Box.para(`Status: ${status}`, Box.left, width / 3),
    Box.left,
    width / 3
  );
  const centerSection = Box.alignHoriz(
    Box.para(`Progress: ${progress}`, Box.center1, width / 3),
    Box.center1,
    width / 3
  );
  const rightSection = Box.alignHoriz(
    Box.para(`Time: ${time}`, Box.right, width / 3),
    Box.right,
    width / 3
  );

  return Box.hcat([leftSection, centerSection, rightSection], Box.top);
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
    `System: ${systemStatus} | Network: ${networkStatus} | User: ${userInfo}`,
    Box.left,
    width
  );
  const separator = Box.text("─".repeat(width));

  return Box.vcat([statusLine, separator], Box.left);
};

export const detailedStatusBar = createDetailedStatusBar(
  "CPU 45% Memory 67%",
  "Connected 125Mbps",
  "admin@localhost"
);
