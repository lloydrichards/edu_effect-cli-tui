import { align, alignHoriz, Box, center1, hcat, left, top, vcat } from "../Box";

// Dashboard Layout with Multiple Panels
const createPanel = (
  title: string,
  content: Box,
  width: number,
  height: number
) => {
  const titleBox = alignHoriz(center1, width, Box.text(`[ ${title} ]`));
  const border = Box.text("─".repeat(width));
  const paddedContent = align(center1, top, height - 3, width, content);

  return vcat(center1, [titleBox, border, paddedContent]);
};
const cpuUsage = vcat(left, [
  Box.text("CPU Usage: 65%"),
  Box.text("████████░░ 80%"),
  Box.text("Load Avg: 1.2"),
  Box.text("Cores: 8"),
]);
const memoryUsage = vcat(left, [
  Box.text("Memory: 12.3/16GB"),
  Box.text("██████████ 77%"),
  Box.text("Swap: 0.5/4GB"),
  Box.text("Buffers: 1.2GB"),
]);
const networkStats = vcat(left, [
  Box.text("Inbound: 125KB/s"),
  Box.text("Outbound: 67KB/s"),
  Box.text("Connections: 45"),
  Box.text("Errors: 0"),
]);
const leftDashboard = vcat(left, [
  createPanel("System", cpuUsage, 25, 8),
  Box.text(""),
  createPanel("Memory", memoryUsage, 25, 8),
]);
const rightDashboard = vcat(left, [
  createPanel("Network", networkStats, 25, 8),
  Box.text(""),
  createPanel(
    "Disk",
    Box.text("Usage: 234/512GB\n████████░░ 45%\nFree: 278GB\nIOPs: 1250"),
    25,
    8
  ),
]);

export const dashboard = hcat(top, [
  leftDashboard,
  Box.text("  "),
  rightDashboard,
]);
