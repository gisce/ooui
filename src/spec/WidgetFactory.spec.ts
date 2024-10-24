import { it, expect, describe } from "vitest";
import WidgetFactory from "../WidgetFactory";
import {
  Char,
  Button,
  NewLine,
  Tags,
  MultiCheckbox,
  Radio,
  Switch,
  Steps,
  CodeEditor,
  ButtonGroup,
  Time,
  HTMLPreview,
  Comments,
} from "..";

describe("A WidgetFactory", () => {
  it("should be able to build a Char widget", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "char1",
    };
    const widget = widgetFactory.createWidget("char", props);
    expect(widget).toBeInstanceOf(Char);
  });

  it("should be able to build a Button widget", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "button1",
    };
    const widget = widgetFactory.createWidget("button", props);
    expect(widget).toBeInstanceOf(Button);
  });

  it("should be able to build a Newline widget", () => {
    const widgetFactory = new WidgetFactory();
    const props = {};
    const widget = widgetFactory.createWidget("newline", props);
    expect(widget).toBeInstanceOf(NewLine);
  });

  it("should be able to retrieve widget type", () => {
    const widgetFactory = new WidgetFactory();
    const props = {};
    const widget = widgetFactory.createWidget("newline", props);
    expect(widget).toBeInstanceOf(NewLine);
    expect(widget.type).toBe("newline");
  });

  it("should be able to retrieve Tags type", () => {
    const widgetFactory = new WidgetFactory();
    const props = {};
    const widget = widgetFactory.createWidget("tags", props);
    expect(widget).toBeInstanceOf(Tags);
    expect(widget.type).toBe("tags");
  });

  it("should be able to retrieve MultiCheckbox type", () => {
    const widgetFactory = new WidgetFactory();
    const props = {};
    const widget = widgetFactory.createWidget("multicheckbox", props);
    expect(widget).toBeInstanceOf(MultiCheckbox);
    expect(widget.type).toBe("multicheckbox");
  });

  it("should be able to retrieve Radio type", () => {
    const widgetFactory = new WidgetFactory();
    const props = {};
    const widget = widgetFactory.createWidget("radio", props);
    expect(widget).toBeInstanceOf(Radio);
    expect(widget.type).toBe("radio");
  });

  it("should be able to retrieve Switch type", () => {
    const widgetFactory = new WidgetFactory();
    const props = {};
    const widget = widgetFactory.createWidget("switch", props);
    expect(widget).toBeInstanceOf(Switch);
    expect(widget.type).toBe("switch");
  });

  it("should be able to retrieve Steps type", () => {
    const widgetFactory = new WidgetFactory();
    const props = {};
    const widget = widgetFactory.createWidget("steps", props);
    expect(widget).toBeInstanceOf(Steps);
    expect(widget.type).toBe("steps");
  });

  it("should be able to retrieve CodeEditor type", () => {
    const widgetFactory = new WidgetFactory();
    const props = {};
    const widget = widgetFactory.createWidget("codeeditor", props);
    expect(widget).toBeInstanceOf(CodeEditor);
    expect(widget.type).toBe("codeeditor");
  });

  it("should be able to retrieve ButtonGroup type", () => {
    const widgetFactory = new WidgetFactory();
    const props = {};
    const widget = widgetFactory.createWidget("buttonGroup", props);
    expect(widget).toBeInstanceOf(ButtonGroup);
    expect(widget.type).toBe("buttonGroup");
  });

  it("should be able to retrieve time type", () => {
    const widgetFactory = new WidgetFactory();
    const props = {};
    const widget = widgetFactory.createWidget("time", props);
    expect(widget).toBeInstanceOf(Time);
    expect(widget.type).toBe("time");
  });
  it("should be able to HtmlPreview time type", () => {
    const widgetFactory = new WidgetFactory();
    const props = {};
    const widget = widgetFactory.createWidget("html_preview", props);
    expect(widget).toBeInstanceOf(HTMLPreview);
    expect(widget.type).toBe("html_preview");
  });
  it("should be albe to Comments type", () => {
    const widgetFactory = new WidgetFactory();
    const props = {};
    const widget = widgetFactory.createWidget("comments_timeline", props);
    expect(widget).toBeInstanceOf(Comments);
    expect(widget.type).toBe("comments_timeline");
  });
});
