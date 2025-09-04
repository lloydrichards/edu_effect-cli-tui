import * as Box from "../Box";

// Dashboard Layout with Multiple Panels
const createPanel = (
  title: string,
  content: Box.Box,
  width: number,
  height: number
) => {
  const titleBox = Box.alignHoriz(Box.center1, width, Box.text(`[ ${title} ]`));
  const border = Box.text("─".repeat(width));
  const paddedContent = Box.align(
    Box.center1,
    Box.top,
    height - 3,
    width,
    content
  );

  return Box.vcat(Box.center1, [titleBox, border, paddedContent]);
};

// Using Box.para for cleaner multi-line content
const cpuUsage = Box.para(
  Box.left,
  23,
  "CPU Usage: 65%\n████████░░ 80%\nLoad Avg: 1.2\nCores: 8"
);

const memoryUsage = Box.para(
  Box.left,
  23,
  "Memory: 12.3/16GB\n██████████ 77%\nSwap: 0.5/4GB\nBuffers: 1.2GB"
);

const networkStats = Box.para(
  Box.left,
  23,
  "Inbound: 125KB/s\nOutbound: 67KB/s\nConnections: 45\nErrors: 0"
);

const diskStats = Box.para(
  Box.left,
  23,
  "Usage: 234/512GB\n████████░░ 45%\nFree: 278GB\nIOPs: 1250"
);

const leftDashboard = Box.vcat(Box.left, [
  createPanel("System", cpuUsage, 25, 8),
  Box.text(""),
  createPanel("Memory", memoryUsage, 25, 8),
]);

const rightDashboard = Box.vcat(Box.left, [
  createPanel("Network", networkStats, 25, 8),
  Box.text(""),
  createPanel("Disk", diskStats, 25, 8),
]);

export const dashboard = Box.hcat(Box.top, [
  leftDashboard,
  Box.text("  "),
  rightDashboard,
]);
