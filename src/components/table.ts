import { alignHoriz, center1, Box, punctuateH, top, left, vcat } from "../Box";

// Data Table with Headers and Alignment
const createTable = (
  headers: string[],
  rows: string[][],
  colWidths: number[]
) => {
  // Create header row
  const headerBoxes = headers.map((header, i) =>
    alignHoriz(center1, colWidths[i] || 15, Box.text(header))
  );
  const headerRow = punctuateH(top, Box.text(" | "), headerBoxes);

  // Create separator
  const separator = Box.text("-".repeat(headerRow.cols));

  // Create data rows
  const dataRows = rows.map((row) => {
    const cellBoxes = row.map((cell, i) =>
      alignHoriz(left, colWidths[i] || 15, Box.text(cell))
    );
    return punctuateH(top, Box.text(" | "), cellBoxes);
  });

  return vcat(left, [headerRow, separator, ...dataRows]);
};

export const processTable = createTable(
  ["PID", "Name", "CPU%", "Memory", "Status"],
  [
    ["1234", "node", "12.5", "245MB", "Running"],
    ["5678", "postgres", "5.2", "512MB", "Running"],
    ["9012", "redis", "0.8", "64MB", "Running"],
    ["3456", "nginx", "2.1", "32MB", "Running"],
  ],
  [6, 12, 6, 8, 8]
);
