import * as Box from "../Box";

export const codeEditorExample = () => {
  // Code Editor with Line Numbers
  const createLineNumbers = (start: number, count: number) => {
    const lines: Box.Box[] = [];
    for (let i = 0; i < count; i++) {
      lines.push(Box.text(`${(start + i).toString().padStart(3)} │`));
    }
    return Box.vcat(lines, Box.left);
  };

  const codeContent = Box.vcat(
    [
      Box.text("export class User {"),
      Box.text("  constructor("),
      Box.text("    public name: string,"),
      Box.text("    public email: string"),
      Box.text("  ) {}"),
      Box.text(""),
      Box.text("  greet(): string {"),
      Box.text('    return "Hello, " + this.name + "!";'),
      Box.text("  }"),
      Box.text("}"),
    ],
    Box.left
  );

  const editor = Box.hcat(
    [createLineNumbers(1, 10), Box.text(" "), codeContent],
    Box.top
  );

  return Box.vcat(
    [Box.text("src/User.ts"), Box.text("─".repeat(40)), editor],
    Box.left
  );
};
