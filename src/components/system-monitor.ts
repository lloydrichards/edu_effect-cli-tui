/**
 * System Monitor - Complex TUI Application Demo
 *
 * Demonstrates a system monitoring interface with real-time data
 * visualization, charts, and system alerts.
 */

import { Box, hcat, vcat, top, left, center1 } from "../Box";

const createChart = (
  title: string,
  values: number[],
  maxVal: number,
  height = 8
) => {
  const chartLines: string[] = [];

  for (let row = height - 1; row >= 0; row--) {
    const threshold = (row / (height - 1)) * maxVal;
    let line = "";
    for (const value of values) {
      line += value > threshold ? "█" : " ";
    }
    chartLines.push(`│${line}│`);
  }

  const bottom = `└${"─".repeat(values.length)}┘`;

  return vcat(left, [
    Box.text(title),
    ...chartLines.map((line) => Box.text(line)),
    Box.text(bottom),
  ]);
};

const cpuChart = createChart(
  "CPU Usage %",
  [45, 52, 38, 65, 72, 58, 63, 70, 55, 48, 42, 39],
  100
);

const memoryChart = createChart(
  "Memory Usage %",
  [60, 62, 58, 70, 75, 68, 72, 74, 69, 65, 63, 61],
  100
);

const networkChart = createChart(
  "Network KB/s",
  [120, 85, 200, 340, 180, 95, 150, 220, 160, 110, 90, 75],
  400
);

const systemProcesses = vcat(left, [
  Box.text("Top Processes"),
  Box.text("─".repeat(30)),
  Box.text("PID    Name         CPU%  MEM%"),
  Box.text("1234   chrome       15.2  8.4"),
  Box.text("5678   node         8.7   4.2"),
  Box.text("9012   postgres     3.1   12.8"),
  Box.text("3456   vscode       6.4   6.1"),
  Box.text("7890   safari       4.8   5.3"),
  Box.text(""),
  Box.text("System Load: 1.85"),
  Box.text("Uptime: 5d 14h 23m"),
  Box.text("Users: 3 logged in"),
]);

const systemAlerts = vcat(left, [
  Box.text("System Alerts"),
  Box.text("─".repeat(25)),
  Box.text("🔴 High CPU usage on core 4"),
  Box.text("🟡 Disk space low (/var 85%)"),
  Box.text("🟢 All services running"),
  Box.text("🟢 Network connectivity OK"),
  Box.text("🟡 1 security update available"),
  Box.text(""),
  Box.text("Last Check: 14:32:45"),
  Box.text("Next Check: 14:37:45"),
]);

export const systemMonitor = vcat(left, [
  hcat(center1, [
    Box.text("System Monitor Dashboard"),
    Box.text(" - "),
    Box.text("macOS 14.0"),
    Box.text(" - "),
    Box.text("14:35:22"),
  ]),
  Box.text("═".repeat(120)),
  hcat(top, [
    vcat(left, [cpuChart, Box.text(""), memoryChart]),
    Box.text("  "),
    vcat(left, [networkChart, Box.text(""), systemProcesses]),
    Box.text("  "),
    systemAlerts,
  ]),
]);
