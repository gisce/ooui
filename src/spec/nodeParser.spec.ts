import { describe, it, expect } from "vitest";
import { parseBoolAttribute } from "../helpers/nodeParser";

describe("parseBoolAttribute", () => {
  it("returns true for numeric 1", () => {
    expect(parseBoolAttribute(1)).toBe(true);
  });

  it('returns true for string "1"', () => {
    expect(parseBoolAttribute("1")).toBe(true);
  });

  it("returns true for boolean true", () => {
    expect(parseBoolAttribute(true)).toBe(true);
  });

  it('returns true for string "True"', () => {
    expect(parseBoolAttribute("True")).toBe(true);
  });

  it('returns true for string "true"', () => {
    expect(parseBoolAttribute("true")).toBe(true);
  });

  it("returns false for numeric 0", () => {
    expect(parseBoolAttribute(0)).toBe(false);
  });

  it('returns false for string "0"', () => {
    expect(parseBoolAttribute("0")).toBe(false);
  });

  it("returns false for boolean false", () => {
    expect(parseBoolAttribute(false)).toBe(false);
  });

  it('returns false for string "False"', () => {
    expect(parseBoolAttribute("False")).toBe(false);
  });

  it("returns false for null", () => {
    expect(parseBoolAttribute(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(parseBoolAttribute(undefined)).toBe(false);
  });

  it("returns false for non-boolean strings", () => {
    expect(parseBoolAttribute("yes")).toBe(false);
    expect(parseBoolAttribute("no")).toBe(false);
  });
});
