import { describe, it, expect } from "vitest";
import Field from "../Field";

describe("Field", () => {
  describe("with the autoRefresh property", () => {
    it("should be false as default", () => {
      const props = {};
      const field = new Field(props);
      expect(field.autoRefresh).toBe(false);
    });
    it("should work with text", () => {
      const props = {
        autorefresh: "1",
      };
      const field = new Field(props);
      expect(field.autoRefresh).toBe(true);
    });
    describe("if autorefresh is not a valid boold", () => {
      it("should return false", () => {
        const props = {
          autorefresh: "abc",
        };
        const field = new Field(props);
        expect(field.autoRefresh).toBe(false);
      });
    });
    it("should return true for readOnly if autoRefresh is set", () => {
      const props = {
        autorefresh: true,
      };
      const field = new Field(props);
      expect(field.readOnly).toBe(true);
    });
  });
});
