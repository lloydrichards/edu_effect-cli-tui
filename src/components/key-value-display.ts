/**
 * Key-Value Display Component
 *
 * Demonstrates structured key-value pair display for system information.
 */

import { Box, hcat, left, top, vcat } from "../Box";

export const createKeyValuePair = (key: string, value: string) => {
  return hcat(top, [Box.text(key.padEnd(15)), Box.text(": "), Box.text(value)]);
};

export const systemInfo = vcat(left, [
  Box.text("System Information"),
  Box.text("=".repeat(30)),
  createKeyValuePair("OS", "macOS 14.0"),
  createKeyValuePair("Architecture", "arm64"),
  createKeyValuePair("Memory", "16 GB"),
  createKeyValuePair("Disk Space", "512 GB SSD"),
]);
