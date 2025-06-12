import WidgetFactory from "../WidgetFactory";
import { it, expect, describe } from "vitest";

describe("A Many2one", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "many2one1",
    };

    const widget = widgetFactory.createWidget("many2one", props);

    expect(widget.id).toBe("many2one1");
  });

  it("should properly set label", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "many2one1",
      string: "Country",
    };
    const widget = widgetFactory.createWidget("many2one", props);

    expect(widget.label).toBe("Country");
  });

  it("should properly set relation", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "many2one1",
      relation: "res.country",
    };
    const widget = widgetFactory.createWidget("many2one", props);

    expect(widget.relation).toBe("res.country");
  });
  describe("Hiding buttons", () => {
    it("should default showFolder to undefined", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "many2one1",
        relation: "res.country",
      };
      const widget = widgetFactory.createWidget("many2one", props);
      expect(widget.showFolder).toBeUndefined();
    });
    it("should have a property to hide the folder through widget props", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "many2one1",
        relation: "res.country",
        widget_props: "{'showFolder': false}",
      };
      const widget = widgetFactory.createWidget("many2one", props);
      expect(widget.showFolder).toBe(false);
    });
    it("should default showSearch to undefined", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "many2one1",
        relation: "res.country",
      };
      const widget = widgetFactory.createWidget("many2one", props);
      expect(widget.showSearch).toBeUndefined();
    });
    it("should have a property to hide the search button through widget props", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "many2one1",
        relation: "res.country",
        widget_props: "{'showSearch': false}",
      };
      const widget = widgetFactory.createWidget("many2one", props);
      expect(widget.showSearch).toBe(false);
    });
    it("should default showMenu to undefined", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "many2one1",
        relation: "res.country",
      };
      const widget = widgetFactory.createWidget("many2one", props);
      expect(widget.showMenu).toBeUndefined();
    });
    it("should have a property to hide the menu through widget props", () => {
      const widgetFactory = new WidgetFactory();
      const props = {
        name: "many2one1",
        relation: "res.country",
        widget_props: "{'showMenu': false}",
      };
      const widget = widgetFactory.createWidget("many2one", props);
      expect(widget.showMenu).toBe(false);
    });
  });
});
