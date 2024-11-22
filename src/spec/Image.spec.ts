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
});
