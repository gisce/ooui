import { describe, it, expect } from "vitest";
import Field from "../Field";

describe("Field", () => {
  describe("with the autoRefresh property", () => {
    it("should work with integer", () => {
      const props = {
        autorefresh: 10,
      };
      const field = new Field(props);
      expect(field.autoRefresh).toBe(10);
    });
    it("should work with text", () => {
      const props = {
        autorefresh: "10",
      };
      const field = new Field(props);
      expect(field.autoRefresh).toBe(10);
    });
    describe("if autorefresh is not a valid number", () => {
      it("should return undefined", () => {
        const props = {
          autorefresh: "abc",
        };
        const field = new Field(props);
        expect(field.autoRefresh).toBe(undefined);
      });
    });
    it("should return true for readOnly if autoRefresh is set", () => {
      const props = {
        autorefresh: 10,
      };
      const field = new Field(props);
      expect(field.readOnly).toBe(true);
    });
  });
});
