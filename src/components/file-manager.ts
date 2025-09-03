/**
 * File Manager Interface - Complex TUI Application Demo
 *
 * Demonstrates a complete file manager interface with sidebar,
 * file listings, and status bar.
 */

import { alignHoriz, Box, hcat, left, right, top, vcat } from "../Box";

const createFileEntry = (
  icon: string,
  name: string,
  size: string,
  date: string,
  isSelected = false
) => {
  const prefix = isSelected ? "► " : "  ";
  const nameBox = alignHoriz(left, 25, Box.text(`${prefix}${icon} ${name}`));
  const sizeBox = alignHoriz(right, 10, Box.text(size));
  const dateBox = alignHoriz(left, 15, Box.text(date));

  return hcat(top, [nameBox, sizeBox, dateBox]);
};

const fileManagerHeader = hcat(top, [
  alignHoriz(left, 25, Box.text("Name")),
  alignHoriz(right, 10, Box.text("Size")),
  alignHoriz(left, 15, Box.text("Modified")),
]);

const fileList = vcat(left, [
  fileManagerHeader,
  Box.text("─".repeat(50)),
  createFileEntry("📁", "..", "", "", false),
  createFileEntry("📁", "Documents", "", "2024-03-15", false),
  createFileEntry("📁", "Downloads", "", "2024-03-14", false),
  createFileEntry("📄", "README.md", "2.4KB", "2024-03-15", true),
  createFileEntry("🖼️", "image.png", "1.2MB", "2024-03-13", false),
  createFileEntry("📊", "data.xlsx", "456KB", "2024-03-12", false),
  createFileEntry("🎵", "song.mp3", "3.8MB", "2024-03-11", false),
  createFileEntry("📹", "video.mp4", "125MB", "2024-03-10", false),
]);

const fileManagerSidebar = vcat(left, [
  Box.text("Quick Access"),
  Box.text("─".repeat(15)),
  Box.text("🏠 Home"),
  Box.text("📄 Documents"),
  Box.text("🖼️  Pictures"),
  Box.text("🎵 Music"),
  Box.text("📹 Videos"),
  Box.text("📱 Applications"),
  Box.text(""),
  Box.text("Storage"),
  Box.text("─".repeat(15)),
  Box.text("💾 SSD: 234/512GB"),
  Box.text("████████░░ 46%"),
  Box.text(""),
  Box.text("🗂️  Files: 12,543"),
  Box.text("📁 Folders: 1,867"),
]);

const fileManagerStatus = hcat(top, [
  Box.text("F1 Help"),
  Box.text(" | "),
  Box.text("F2 Rename"),
  Box.text(" | "),
  Box.text("F3 View"),
  Box.text(" | "),
  Box.text("F4 Edit"),
  Box.text(" | "),
  Box.text("F5 Copy"),
  Box.text(" | "),
  Box.text("Del Delete"),
]);

export const fileManager = vcat(left, [
  Box.text("/Users/john/Documents"),
  Box.text("═".repeat(80)),
  hcat(top, [fileManagerSidebar, Box.text("  │  "), fileList]),
  Box.text("─".repeat(80)),
  fileManagerStatus,
]);
