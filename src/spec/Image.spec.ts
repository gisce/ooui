import { describe, it, expect } from "vitest";
import Image from "../Image";

describe("Image", () => {
  it("should have showControls property to true as default", () => {
    const props = {};
    const image = new Image(props);
    expect(image.showControls).toBe(true);
  });
  it("should have showControls property to false", () => {
    const props = {
      widget_props: {
        showControls: false,
      },
    };
    const image = new Image(props);
    expect(image.showControls).toBe(false);
  });
  it("should parse width property", () => {
    const props = { width: "100" };
    const image = new Image(props);
    expect(image.width).toBe(100);
  });
  it("should parse height property", () => {
    const props = { height: "50" };
    const image = new Image(props);
    expect(image.height).toBe(50);
  });
  it("should parse both width and height properties", () => {
    const props = { width: "200", height: "150" };
    const image = new Image(props);
    expect(image.width).toBe(200);
    expect(image.height).toBe(150);
  });
  it("should handle undefined width and height", () => {
    const props = {};
    const image = new Image(props);
    expect(image.width).toBeUndefined();
    expect(image.height).toBeUndefined();
  });
  it("should handle invalid width and height", () => {
    const props = { width: "invalid", height: "invalid" };
    const image = new Image(props);
    expect(image.width).toBeUndefined();
    expect(image.height).toBeUndefined();
  });
});
