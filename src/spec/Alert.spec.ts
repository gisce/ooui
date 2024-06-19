import { it, expect, describe, beforeEach } from "vitest";
import WidgetFactory from "../WidgetFactory";

describe("A Alert", () => {
  let widgetFactory: WidgetFactory;

  beforeEach(() => {
    widgetFactory = new WidgetFactory();
  });

  it("should set alertType when provided in props", () => {
    const widget = widgetFactory.createWidget("alert", { alert_type: "error" });
    expect(widget.alertType).toBe("error");
  });

  it("should default to 'info' alertType when not provided in props", () => {
    const widget = widgetFactory.createWidget("alert", {});
    expect(widget.alertType).toBe("info");
  });

  it("should set title when provided in props", () => {
    const widget = widgetFactory.createWidget("alert", { title: "Test Title" });
    expect(widget.title).toBe("Test Title");
  });

  it("should default to empty string for title when not provided in props", () => {
    const widget = widgetFactory.createWidget("alert", {});
    expect(widget.title).toBe("");
  });

  it("should set text when provided in props", () => {
    const widget = widgetFactory.createWidget("alert", { text: "Test Text" });
    expect(widget.text).toBe("Test Text");
  });

  it("should default to empty string for text when not provided in props", () => {
    const widget = widgetFactory.createWidget("alert", {});
    expect(widget.text).toBe("");
  });

  it("should set icon when provided in props", () => {
    const widget = widgetFactory.createWidget("alert", { icon: "Test Icon" });
    expect(widget.icon).toBe("Test Icon");
  });

  it("should default to null for icon when not provided in props", () => {
    const widget = widgetFactory.createWidget("alert", {});
    expect(widget.icon).toBeNull();
  });
});
