import * as Box from "../Box";

// Dashboard Layout with Multiple Panels
const createPanel = (
  title: string,
  content: Box.Box,
  width: number,
  height: number
) => {
  const titleBox = Box.text(`[ ${title} ]`).pipe(
    Box.alignHoriz(Box.center1, width)
  );
  const border = Box.text("─".repeat(width));
  const paddedContent = content.pipe(
    Box.align(Box.center1, Box.top, height - 3, width)
  );

  return titleBox.pipe(Box.vAppend(border), Box.vAppend(paddedContent));
};

// Using Box.para for cleaner multi-line content
const cpuUsage = Box.para(
  "CPU Usage: 65%\n████████░░ 80%\nLoad Avg: 1.2\nCores: 8",
  Box.left,
  23
);

const memoryUsage = Box.para(
  "Memory: 12.3/16GB\n██████████ 77%\nSwap: 0.5/4GB\nBuffers: 1.2GB",
  Box.left,
  23
);

const networkStats = Box.para(
  "Inbound: 125KB/s\nOutbound: 67KB/s\nConnections: 45\nErrors: 0",
  Box.left,
  23
);

const diskStats = Box.para(
  "Usage: 234/512GB\n████████░░ 45%\nFree: 278GB\nIOPs: 1250",
  Box.left,
  23
);

const leftDashboard = createPanel("System", cpuUsage, 25, 8).pipe(
  Box.vAppend(Box.text("")),
  Box.vAppend(createPanel("Memory", memoryUsage, 25, 8))
);

const rightDashboard = createPanel("Network", networkStats, 25, 8).pipe(
  Box.vAppend(Box.text("")),
  Box.vAppend(createPanel("Disk", diskStats, 25, 8))
);

export const dashboard = leftDashboard.pipe(
  Box.hAppend(Box.text("  ")),
  Box.hAppend(rightDashboard)
);
