import * as Box from "../Box";

export const codeEditorExample = () => {
  // Code Editor with Line Numbers
  const createLineNumbers = (start: number, count: number) => {
    const lines: Box.Box[] = [];
    for (let i = 0; i < count; i++) {
      lines.push(Box.text(`${(start + i).toString().padStart(3)} │`));
    }
    return Box.vcat(Box.left, lines);
  };

  const codeContent = Box.vcat(Box.left, [
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
  ]);

  const editor = Box.hcat(Box.top, [
    createLineNumbers(1, 10),
    Box.text(" "),
    codeContent,
  ]);

  return Box.vcat(Box.left, [
    Box.text("src/User.ts"),
    Box.text("─".repeat(40)),
    editor,
  ]);
};
