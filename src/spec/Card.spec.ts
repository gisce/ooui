import Card from "../Card";
import WidgetImpl from "./fixtures/WidgetImpl";
import WidgetFactory from "../WidgetFactory";
import { it, expect, describe } from "vitest";

describe("A Card", () => {
  it("should be constructed with 4 columns and a colspan of 4", () => {
    const card4 = new Card({ col: 4, colspan: 4 });
    expect(card4.colspan).toBe(4);
    expect(card4.container.columns).toBe(4);
  });
  it("should be constructed with 6 columns and a colspan of 2", () => {
    const card4 = new Card({ col: 6, colspan: 2 });
    expect(card4.colspan).toBe(2);
    expect(card4.container.columns).toBe(6);
  });
  it("should have 1 rows if 4 items", () => {
    const card4 = new Card({ col: 4, colspan: 4 });
    card4.container.addWidget(new WidgetImpl({ name: "1" }));
    card4.container.addWidget(new WidgetImpl({ name: "2" }));
    card4.container.addWidget(new WidgetImpl({ name: "3" }));
    card4.container.addWidget(new WidgetImpl({ name: "4" }));
    expect(card4.container.rows.length).toBe(1);
  });
  it("should have 2 rows if 5 items", () => {
    const card4 = new Card({ col: 4, colspan: 4 });
    card4.container.addWidget(new WidgetImpl({ name: "1" }));
    card4.container.addWidget(new WidgetImpl({ name: "2" }));
    card4.container.addWidget(new WidgetImpl({ name: "3" }));
    card4.container.addWidget(new WidgetImpl({ name: "4" }));
    card4.container.addWidget(new WidgetImpl({ name: "5" }));
    expect(card4.container.rows.length).toBe(2);
  });
  it("can have an icon property", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      title: "General",
      icon: "home",
    };
    const widget = widgetFactory.createWidget("card", props);
    expect(widget.icon).toEqual("home");
  });
  it("can have a title property", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      title: "Card Title",
      icon: "user",
    };
    const widget = widgetFactory.createWidget("card", props);
    expect(widget.title).toEqual("Card Title");
  });
  it("can have a height property", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      title: "Card Title",
      height: "200",
    };
    const widget = widgetFactory.createWidget("card", props);
    expect(widget.height).toEqual(200);
  });
  it("should handle invalid height values", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      title: "Card Title",
      height: "invalid",
    };
    const widget = widgetFactory.createWidget("card", props);
    expect(widget.height).toBeUndefined();
  });
  describe("working as a spinner", () => {
    it("should be loading false as default", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        title: "A card",
      };
      const widget = widgetFactory.createWidget("card", props);
      expect(widget.loading).toBe(false);
    });
    it("should be loading true if set", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        title: "A card",
        loading: true,
      };
      const widget = widgetFactory.createWidget("card", props);
      expect(widget.loading).toBe(true);
    });
  });
});
