/**
 * Key-Value Display Component
 *
 * Demonstrates structured key-value pair display for system information.
 */

import * as Box from "../Box";

export const createKeyValuePair = (key: string, value: string) => {
  return Box.hcat(
    [Box.text(key.padEnd(15)), Box.text(": "), Box.text(value)],
    Box.top
  );
};

// Enhanced version using Box.para for better value formatting
export const createKeyValuePairPara = (
  key: string,
  value: string,
  valueWidth = 30
) => {
  const keyBox = Box.alignHoriz(Box.text(key), Box.left, 15);
  const separator = Box.text(": ");
  const valueBox = Box.para(value, Box.left, valueWidth);

  return Box.hcat([keyBox, separator, valueBox], Box.top);
};

export const systemInfo = Box.vcat(
  [
    Box.text("System Information"),
    Box.text("=".repeat(30)),
    createKeyValuePair("OS", "macOS 14.0"),
    createKeyValuePair("Architecture", "arm64"),
    createKeyValuePair("Memory", "16 GB"),
    createKeyValuePair("Disk Space", "512 GB SSD"),
  ],
  Box.left
);

// Enhanced system info with longer descriptions using Box.para
export const detailedSystemInfo = Box.vcat(
  [
    Box.text("Detailed System Information"),
    Box.text("=".repeat(40)),
    createKeyValuePairPara(
      "OS",
      "macOS 14.0 Sonoma with latest security updates"
    ),
    createKeyValuePairPara(
      "Architecture",
      "ARM64 Apple Silicon M2 Pro processor"
    ),
    createKeyValuePairPara(
      "Memory",
      "16 GB LPDDR5 unified memory with high bandwidth"
    ),
    createKeyValuePairPara(
      "Storage",
      "512 GB SSD with encryption and fast access speeds"
    ),
    createKeyValuePairPara(
      "Network",
      "WiFi 6E and Gigabit Ethernet connectivity available"
    ),
  ],
  Box.left
);
