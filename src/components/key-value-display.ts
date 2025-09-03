/**
 * Key-Value Display Component
 *
 * Demonstrates structured key-value pair display for system information.
 */

import { alignHoriz, Box, hcat, left, top, vcat } from "../Box";

export const createKeyValuePair = (key: string, value: string) => {
  return hcat(top, [Box.text(key.padEnd(15)), Box.text(": "), Box.text(value)]);
};

// Enhanced version using Box.para for better value formatting
export const createKeyValuePairPara = (
  key: string,
  value: string,
  valueWidth = 30
) => {
  const keyBox = alignHoriz(left, 15, Box.text(key));
  const separator = Box.text(": ");
  const valueBox = Box.para(left, valueWidth, value);

  return hcat(top, [keyBox, separator, valueBox]);
};

export const systemInfo = vcat(left, [
  Box.text("System Information"),
  Box.text("=".repeat(30)),
  createKeyValuePair("OS", "macOS 14.0"),
  createKeyValuePair("Architecture", "arm64"),
  createKeyValuePair("Memory", "16 GB"),
  createKeyValuePair("Disk Space", "512 GB SSD"),
]);

// Enhanced system info with longer descriptions using Box.para
export const detailedSystemInfo = vcat(left, [
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
]);
