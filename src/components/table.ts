import { alignHoriz, Box, center1, left, punctuateH, top, vcat } from "../Box";

// Data Table with Headers and Alignment
export const createTable = (
  headers: string[],
  rows: string[][],
  colWidths: number[]
) => {
  // Create header row
  const headerBoxes = headers.map((header, i) =>
    alignHoriz(center1, colWidths[i] || 15, Box.text(header))
  );
  const headerRow = punctuateH(top, Box.text(" │ "), headerBoxes);

  // Create separator with crosses at column intersections
  const createSeparator = (colWidths: number[]): Box => {
    let separatorText = "";
    for (let i = 0; i < colWidths.length; i++) {
      const width = colWidths[i] || 15;
      // Add dashes for the column width
      separatorText += "─".repeat(width);
      // Add cross character at intersections (except after the last column)
      if (i < colWidths.length - 1) {
        separatorText += "─┼─"; // matches the " | " pattern with cross
      }
    }
    return Box.text(separatorText);
  };

  const separator = createSeparator(colWidths);

  // Create data rows
  const dataRows = rows.map((row) => {
    const cellBoxes = row.map((cell, i) =>
      alignHoriz(left, colWidths[i] || 15, Box.text(cell))
    );
    return punctuateH(top, Box.text(" │ "), cellBoxes);
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
