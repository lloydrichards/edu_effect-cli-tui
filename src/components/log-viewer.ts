import { hcat, top, Box, vcat, left } from "../Box";

// Log Viewer with Timestamps
const createLogEntry = (timestamp: string, level: string, message: string) => {
  const levelColors = {
    INFO: "  INFO ",
    WARN: "  WARN ",
    ERROR: " ERROR ",
    DEBUG: " DEBUG",
  };

  return hcat(top, [
    Box.text(`[${timestamp}]`),
    Box.text(" "),
    Box.text(levelColors[level as keyof typeof levelColors] || "  LOG  "),
    Box.text(" "),
    Box.text(message),
  ]);
};

export const logViewer = vcat(left, [
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
    "High memory usage detected (85%)"
  ),
  createLogEntry(
    "2024-03-15 14:25:01",
    "ERROR",
    "Failed to connect to external API"
  ),
  createLogEntry("2024-03-15 14:25:05", "INFO", "Retrying API connection..."),
  createLogEntry("2024-03-15 14:25:08", "INFO", "API connection restored"),
  Box.text("─".repeat(80)),
  Box.text("Press [q] to quit, [↑/↓] to scroll"),
]);
