/**
 * File Manager Interface - Complex TUI Application Demo
 *
 * Demonstrates a complete file manager interface with sidebar,
 * file listings, and status bar.
 */

import * as Box from "../Box";

const createFileEntry = (
  icon: string,
  name: string,
  size: string,
  date: string,
  isSelected = false
) => {
  const prefix = isSelected ? "► " : "  ";
  const nameBox = Box.alignHoriz(
    Box.left,
    25,
    Box.text(`${prefix}${icon} ${name}`)
  );
  const sizeBox = Box.alignHoriz(Box.right, 10, Box.text(size));
  const dateBox = Box.alignHoriz(Box.left, 15, Box.text(date));

  return Box.hcat(Box.top, [nameBox, sizeBox, dateBox]);
};

const fileManagerHeader = Box.hcat(Box.top, [
  Box.alignHoriz(Box.left, 25, Box.text("Name")),
  Box.alignHoriz(Box.right, 10, Box.text("Size")),
  Box.alignHoriz(Box.left, 15, Box.text("Modified")),
]);

const fileList = Box.vcat(Box.left, [
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

const fileManagerSidebar = Box.vcat(Box.left, [
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

const fileManagerStatus = Box.hcat(Box.top, [
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

export const fileManager = Box.vcat(Box.left, [
  Box.text("/Users/john/Documents"),
  Box.text("═".repeat(80)),
  Box.hcat(Box.top, [fileManagerSidebar, Box.text("  │  "), fileList]),
  Box.text("─".repeat(80)),
  fileManagerStatus,
]);
