// Write specs for the Comments component here with vitest
import { describe, it, expect } from "vitest";
import Comments from "../Comments";

describe("Comments", () => {
  it("sets height when provided in props", () => {
    const comments = new Comments({ height: "150" });
    expect(comments.height).toBe(150);
  });

  it("defaults height to undefined when not provided in props", () => {
    const comments = new Comments({});
    expect(comments.height).toBeUndefined();
  });

  it("sets height to undefined when provided height is not a number", () => {
    const comments = new Comments({ height: "invalid" });
    expect(comments.height).toBeUndefined();
  });

  it("updates height when set with a valid number", () => {
    const comments = new Comments({});
    comments.height = 200;
    expect(comments.height).toBe(200);
  });

  it("updates height to undefined when set with an invalid value", () => {
    const comments = new Comments({});
    comments.height = undefined;
    expect(comments.height).toBeUndefined();
  });
});
