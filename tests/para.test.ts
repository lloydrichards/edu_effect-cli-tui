import { describe, expect, it } from "bun:test";
import { pipe } from "effect";
import { addWordP, flow, getLines, Line, Para, Word } from "../src/Box";

describe("Word", () => {
  it("should create a Word from a string", () => {
    const word = Word.fromString("hello");
    expect(word.wLen).toBe(5);
    expect(word.getWord).toBe("hello");
  });

  it("should handle empty string", () => {
    const word = Word.fromString("");
    expect(word.wLen).toBe(0);
    expect(word.getWord).toBe("");
  });
});

describe("Line", () => {
  describe("fromWords", () => {
    it("should create an empty line from empty word array", () => {
      const line = Line.fromWords([]);
      expect(line.lLen).toBe(0);
      expect(line.getWords).toEqual([]);
    });

    it("should create a line with a single word", () => {
      const word = Word.fromString("hello");
      const line = Line.fromWords([word]);
      expect(line.lLen).toBe(5);
      expect(line.getWords).toEqual([word]);
    });

    it("should create a line with multiple words", () => {
      const word1 = Word.fromString("the");
      const word2 = Word.fromString("quick");
      const word3 = Word.fromString("fox");
      const line = Line.fromWords([word1, word2, word3]);
      expect(line.lLen).toBe(13);
      expect(line.getWords).toEqual([word1, word2, word3]);
    });

    it("should handle words with zero length", () => {
      const word1 = Word.fromString("");
      const word2 = Word.fromString("test");
      const line = Line.fromWords([word1, word2]);
      expect(line.lLen).toBe(5);
      expect(line.getWords).toEqual([word1, word2]);
    });
  });
});

describe("Para", () => {
  it("should create an empty paragraph with specified width", () => {
    const para = Para.empty(10);
    expect(para.paraWidth).toBe(10);
    expect(para.paraContent.fullLines).toEqual([]);
    expect(para.paraContent.lastLine.lLen).toBe(0);
    expect(para.paraContent.lastLine.getWords).toEqual([]);
  });

  describe("getLines", () => {
    it("should process Para with non-empty last line", () => {
      const para: typeof Para.Type = {
        paraWidth: 20,
        paraContent: {
          fullLines: [
            Line.fromWords([
              Word.fromString("world"),
              Word.fromString("hello"),
            ]),
          ],
          lastLine: Line.fromWords([Word.fromString("test")]),
        },
      };
      expect(getLines(para)).toEqual(["hello world", "test"]);
    });

    it("should process Para with empty last line", () => {
      const para: typeof Para.Type = {
        paraWidth: 20,
        paraContent: {
          fullLines: [
            Line.fromWords([
              Word.fromString("world"),
              Word.fromString("hello"),
            ]),
            Line.fromWords([Word.fromString("test")]),
          ],
          lastLine: Line.fromWords([]),
        },
      };

      expect(getLines(para)).toEqual(["test", "hello world"]);
    });

    it("should handle completely empty Para", () => {
      const result = getLines(Para.empty(10));
      expect(result).toEqual([]);
    });

    it("should handle Para with only last line", () => {
      const para: typeof Para.Type = {
        paraWidth: 10,
        paraContent: {
          fullLines: [],
          lastLine: Line.fromWords([Word.fromString("single")]),
        },
      };
      expect(getLines(para)).toEqual(["single"]);
    });
  });

  describe("addWordP", () => {
    it("should add word to empty paragraph", () => {
      const result = pipe(Para.empty(10), addWordP(Word.fromString("hello")));
      expect(result.paraWidth).toBe(10);
      expect(result.paraContent.fullLines).toEqual([]);
      expect(result.paraContent.lastLine.lLen).toBe(6);
      expect(result.paraContent.lastLine.getWords).toEqual([
        Word.fromString("hello"),
      ]);
    });

    it("should add word to existing line when it fits", () => {
      const word1 = Word.fromString("hello");
      const word2 = Word.fromString("world");
      const step2 = pipe(Para.empty(15), addWordP(word1), addWordP(word2));
      expect(step2.paraContent.fullLines).toEqual([]);
      expect(step2.paraContent.lastLine.lLen).toBe(12);
      expect(step2.paraContent.lastLine.getWords).toEqual([word2, word1]);
    });

    it("should wrap to new line when word doesn't fit", () => {
      const step2 = pipe(
        Para.empty(8),
        addWordP(Word.fromString("hello")),
        addWordP(Word.fromString("world"))
      );

      // First line should be moved to fullLines
      expect(step2.paraContent.fullLines).toHaveLength(1);
      expect(step2.paraContent.fullLines[0]?.lLen).toBe(6); // "hello" + 1 = 6
      expect(step2.paraContent.fullLines[0]?.getWords).toHaveLength(1);

      // Second word should start new line (startLine just uses word.wLen)
      expect(step2.paraContent.lastLine.lLen).toBe(5); // just "world"
      expect(step2.paraContent.lastLine.getWords).toHaveLength(1);
    });

    it("should handle exact width fit", () => {
      const result = pipe(
        Para.empty(12),
        addWordP(Word.fromString("hello")),
        addWordP(Word.fromString("world"))
      );

      expect(result.paraContent.fullLines).toEqual([]);
      expect(result.paraContent.lastLine.lLen).toBe(12);
      expect(result.paraContent.lastLine.getWords).toHaveLength(2);
    });

    it("should wrap when adding would exceed width", () => {
      const result = pipe(
        Para.empty(11),
        addWordP(Word.fromString("hello")),
        addWordP(Word.fromString("world"))
      );
      expect(result.paraContent.fullLines).toHaveLength(1);
      expect(result.paraContent.lastLine.lLen).toBe(5);
    });

    it("should handle multiple line wraps", () => {
      const result = pipe(
        Para.empty(7),
        addWordP(Word.fromString("one")),
        addWordP(Word.fromString("two")),
        addWordP(Word.fromString("three")),
        addWordP(Word.fromString("four"))
      );
      expect(result.paraContent.fullLines.length).toBeGreaterThan(0);
      expect([
        ...result.paraContent.fullLines.flatMap((line) => line.getWords),
        ...result.paraContent.lastLine.getWords,
      ]).toHaveLength(4);
    });
  });
});

describe("flow", () => {
  it("should flow text into specified width", () => {
    const text = "The quick brown fox jumps over the lazy dog";
    const result = flow(10, text);

    for (const line of result) {
      expect(line.length).toBeLessThanOrEqual(10);
    }

    expect(result.join(" ").replace(/\s+/g, " ").trim()).toBe(text);
  });

  it("should handle empty text", () => {
    expect(flow(10, "")).toEqual([""]); // Empty text should return one empty line
  });

  it("should handle single word that fits", () => {
    expect(flow(10, "hello")).toEqual(["hello"]);
  });

  it("should handle single word that exceeds width", () => {
    expect(flow(5, "verylongword")).toEqual(["veryl"]);
  });

  it("should handle newlines in input text", () => {
    expect(flow(15, "first line\nsecond line").length).toBeGreaterThan(0);
  });
});
