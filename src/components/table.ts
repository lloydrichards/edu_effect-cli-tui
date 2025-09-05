import { Array, Effect, Layer, pipe } from "effect";
import * as Box from "../Box";

const DEFAULT_COL_WIDTH = 15;

class BoarderStyleService extends Effect.Service<BoarderStyleService>()(
  "BoarderStyleService",
  {
    sync: () => ({
      top: {
        left: "╔",
        center: "═",
        right: "╗",
        colSeparator: "╦",
      },
      middle: {
        left: "╠",
        center: "═",
        right: "╣",
        colSeparator: "╬",
      },
      bottom: {
        left: "╚",
        center: "═",
        right: "╝",
        colSeparator: "╩",
      },
      data: {
        left: "║",
        center: " ",
        right: "║",
        colSeparator: "║",
      },
    }),
    accessors: true,
  }
) {}
class TableConfigService extends Effect.Service<TableConfigService>()(
  "TableConfigService",
  {
    sync: () => ({
      defaultColumnWidth: DEFAULT_COL_WIDTH,
      cellPadding: " ",
    }),
    accessors: true,
  }
) {}

const Separator = Effect.fn(function* (colWidths: readonly number[]) {
  const style = yield* BoarderStyleService.middle;
  return pipe(
    colWidths,
    Array.map((width) => Box.text(style.center.repeat(width + 2))),
    Box.punctuateH(Box.left, Box.text(style.colSeparator)),
    (content) =>
      Box.hcat([Box.text(style.left), content, Box.text(style.right)], Box.top)
  );
});

const TopBorder = Effect.fn(function* (colWidths: readonly number[]) {
  const style = yield* BoarderStyleService.top;
  return pipe(
    colWidths,
    Array.map((width) => Box.text(style.center.repeat(width + 2))),
    Box.punctuateH(Box.left, Box.text(style.colSeparator)),
    (content) =>
      Box.hcat([Box.text(style.left), content, Box.text(style.right)], Box.top)
  );
});

const BottomBorder = Effect.fn(function* (colWidths: readonly number[]) {
  const style = yield* BoarderStyleService.bottom;
  return pipe(
    colWidths,
    Array.map((width) => Box.text(style.center.repeat(width + 2))),
    Box.punctuateH(Box.left, Box.text(style.colSeparator)),
    (content) =>
      Box.hcat([Box.text(style.left), content, Box.text(style.right)], Box.top)
  );
});

const HeaderCell = (data: string, width: number) =>
  Box.text(data).pipe(
    Box.alignHoriz(Box.center1, width),
    Box.moveRight(1),
    Box.moveLeft(1)
  );

const DataCell = (data: string, width: number) =>
  Box.text(data).pipe(
    Box.alignHoriz(Box.left, width),
    Box.moveRight(1),
    Box.moveLeft(1)
  );

const TableRow = Effect.fn(function* (cells: readonly Box.Box[]) {
  const style = yield* BoarderStyleService.data;
  return pipe(
    cells,
    Box.punctuateH(Box.left, Box.text(style.colSeparator)),
    (content) =>
      Box.hcat([Box.text(style.left), content, Box.text(style.right)], Box.top)
  );
});

const HeaderRow = Effect.fn(function* (
  headers: readonly string[],
  colWidths: readonly number[]
) {
  const headerCells = headers.map((header, i) =>
    HeaderCell(header, colWidths[i] ?? DEFAULT_COL_WIDTH)
  );

  return yield* TableRow(headerCells);
});

const DataRows = Effect.fn(function* (
  rows: readonly (readonly string[])[],
  colWidths: readonly number[]
) {
  return yield* Effect.all(
    rows.map((row) =>
      Effect.gen(function* () {
        const dataCells = row.map((cell, i) =>
          DataCell(cell, colWidths[i] ?? DEFAULT_COL_WIDTH)
        );

        return yield* TableRow(dataCells);
      })
    )
  );
});

const TableAssembly = (
  headerRow: Box.Box,
  separator: Box.Box,
  dataRows: readonly Box.Box[]
): Box.Box => pipe([headerRow, separator, ...dataRows], Box.vcat(Box.left));

export const TableServiceLayer = Layer.merge(
  TableConfigService.Default,
  BoarderStyleService.Default
);

export const createSimpleTable = Effect.fn(function* (
  headers: readonly string[],
  rows: readonly (readonly string[])[],
  colWidths: readonly number[]
) {
  const headerRow = yield* HeaderRow(headers, colWidths);
  const separator = yield* Separator(colWidths);
  const dataRows = yield* DataRows(rows, colWidths);

  return TableAssembly(headerRow, separator, dataRows);
});

export const createTable = Effect.fn(function* (
  headers: readonly string[],
  rows: readonly (readonly string[])[],
  colWidths: readonly number[]
) {
  const topBorder = yield* TopBorder(colWidths);
  const headerRow = yield* HeaderRow(headers, colWidths);
  const separator = yield* Separator(colWidths);
  const dataRows = yield* DataRows(rows, colWidths);
  const bottomBorder = yield* BottomBorder(colWidths);

  return pipe(
    [topBorder, headerRow, separator, ...dataRows, bottomBorder],
    Box.vcat(Box.left)
  );
});

export const createFullBorderedTable = Effect.fn(function* (
  headers: readonly string[],
  rows: readonly (readonly string[])[],
  colWidths: readonly number[]
) {
  const topBorder = yield* TopBorder(colWidths);
  const headerRow = yield* HeaderRow(headers, colWidths);
  const separator = yield* Separator(colWidths);
  const dataRows = yield* DataRows(rows, colWidths);
  const bottomBorder = yield* BottomBorder(colWidths);

  return pipe(
    [topBorder, headerRow, separator, ...dataRows, bottomBorder],
    Box.vcat(Box.left)
  );
});

export const processTable = createTable(
  ["PID", "Name", "CPU%", "Memory", "Status"],
  [
    ["1234", "node", "12.5", "245MB", "Running"],
    ["5678", "postgres", "5.2", "512MB", "Running"],
    ["9012", "redis", "0.8", "64MB", "Running"],
    ["3456", "nginx", "2.1", "32MB", "Running"],
  ],
  [6, 12, 6, 8, 8]
).pipe(Effect.provide(TableServiceLayer));

// Create a custom border style layer with shadow effect using interesting unicode characters
const ShadowBorderStyleLayer = Layer.succeed(
  BoarderStyleService,
  new BoarderStyleService({
    top: {
      left: "┌",
      center: "─",
      right: "▗",
      colSeparator: "┬",
    },
    middle: {
      left: "├",
      center: "─",
      right: "▐",
      colSeparator: "┼",
    },
    bottom: {
      left: "└",
      center: "▄",
      right: "▟",
      colSeparator: "▄",
    },
    data: {
      left: "│",
      center: " ",
      right: "▐",
      colSeparator: "│",
    },
  })
);

// Alternative ornate border style with decorative elements
const OrnateBorderStyleLayer = Layer.succeed(
  BoarderStyleService,
  new BoarderStyleService({
    top: {
      left: "╭",
      center: "─",
      right: "╮",
      colSeparator: "┬",
    },
    middle: {
      left: "├",
      center: "─",
      right: "┤",
      colSeparator: "┼",
    },
    bottom: {
      left: "╰",
      center: "─",
      right: "╯",
      colSeparator: "┴",
    },
    data: {
      left: "│",
      center: " ",
      right: "│",
      colSeparator: "│",
    },
  })
);

// Retro ASCII style border (keeping original for reference)
const CustomBorderStyleLayer = Layer.succeed(
  BoarderStyleService,
  new BoarderStyleService({
    top: {
      left: "+",
      center: "-",
      right: "+",
      colSeparator: "+",
    },
    middle: {
      left: "+",
      center: "-",
      right: "+",
      colSeparator: "+",
    },
    bottom: {
      left: "+",
      center: "-",
      right: "+",
      colSeparator: "+",
    },
    data: {
      left: "|",
      center: " ",
      right: "|",
      colSeparator: "|",
    },
  })
);

export const processFullBorderedTable = createFullBorderedTable(
  ["ID", "Task", "Progress"],
  [
    ["001", "Data Processing", "85%"],
    ["002", "Report Generation", "45%"],
    ["003", "Backup Process", "100%"],
  ],
  [10, 20, 10]
).pipe(Effect.provide(Layer.merge(TableServiceLayer, CustomBorderStyleLayer)));

// Example using shadow border style
export const processShadowTable = createFullBorderedTable(
  ["User", "Email", "Role", "Status"],
  [
    ["Alice", "alice@example.com", "Admin", "Active"],
    ["Bob", "bob@example.com", "User", "Active"],
    ["Carol", "carol@example.com", "Editor", "Inactive"],
  ],
  [8, 18, 8, 10]
).pipe(Effect.provide(Layer.merge(TableServiceLayer, ShadowBorderStyleLayer)));

// Example using ornate border style
export const processOrnateTable = createFullBorderedTable(
  ["Product", "Price", "Stock"],
  [
    ["Laptop", "$999.99", "25"],
    ["Mouse", "$29.99", "150"],
    ["Keyboard", "$79.99", "89"],
  ],
  [12, 10, 8]
).pipe(Effect.provide(Layer.merge(TableServiceLayer, OrnateBorderStyleLayer)));
