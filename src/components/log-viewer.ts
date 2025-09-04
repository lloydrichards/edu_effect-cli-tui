import * as Box from "../Box";

// Log Viewer with Timestamps
const createLogEntry = (timestamp: string, level: string, message: string) => {
  const levelColors = {
    INFO: "  INFO ",
    WARN: "  WARN ",
    ERROR: " ERROR ",
    DEBUG: " DEBUG",
  };

  return Box.punctuateH(Box.top, Box.text(" "), [
    Box.text(`[${timestamp}]`),
    Box.text(levelColors[level as keyof typeof levelColors] || "  LOG  "),
    Box.para(Box.left, 50, message),
  ]);
};

// Enhanced log entry for longer messages
const createLongLogEntry = (
  timestamp: string,
  level: string,
  message: string
) => {
  const timestampBox = Box.text(`[${timestamp}]`);
  const levelBox = Box.text(level.padEnd(6));

  return Box.vcat(Box.left, [
    Box.hcat(Box.top, [timestampBox, Box.text(" "), levelBox]),
    Box.para(Box.left, 70, message),
    Box.text(""),
  ]);
};

export const logViewer = Box.vcat(Box.left, [
  Box.text("Application Logs"),
  Box.text("─".repeat(80)),
  createLogEntry(
    "2024-03-15 14:23:01",
    "INFO",
    "Application started successfully"
  ),
  createLogEntry(
    "2024-03-15 14:23:15",
    "INFO",
    "Database connection established"
  ),
  createLogEntry(
    "2024-03-15 14:24:32",
    "WARN",
    "High memory usage detected (85%) - consider optimizing memory allocation patterns"
  ),
  createLogEntry(
    "2024-03-15 14:25:01",
    "ERROR",
    "Failed to connect to external API - timeout after 30 seconds"
  ),
  createLogEntry("2024-03-15 14:25:05", "INFO", "Retrying API connection..."),
  createLogEntry("2024-03-15 14:25:08", "INFO", "API connection restored"),
  Box.text("─".repeat(80)),
  Box.text("Press [q] to quit, [↑/↓] to scroll"),
]);

export const detailedLogViewer = Box.vcat(Box.left, [
  Box.text("Detailed Application Logs"),
  Box.text("═".repeat(80)),
  createLongLogEntry(
    "2024-03-15 14:23:01",
    "INFO",
    "Application initialization completed successfully. All modules loaded, configuration validated, and system checks passed."
  ),
  createLongLogEntry(
    "2024-03-15 14:24:32",
    "WARN",
    "Memory usage has exceeded 85% of available system memory. This may impact performance and could lead to system instability if not addressed."
  ),
  createLongLogEntry(
    "2024-03-15 14:25:01",
    "ERROR",
    "Critical error occurred while attempting to establish connection to external payment processing API. Connection timeout exceeded after 30 seconds of waiting. This will affect order processing capabilities."
  ),
]);
