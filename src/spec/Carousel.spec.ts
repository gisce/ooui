import WidgetFactory from "../WidgetFactory";
import Form from "../Form";
import Carousel from "../Carousel";
import { it, expect, describe } from "vitest";

describe("A Carousel", () => {
  it("should have an id corresponding to field name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "carousel",
    };

    const widget = widgetFactory.createWidget("carousel", props);
    expect(widget).toBeInstanceOf(Carousel);
  });
  it("should have autoPlay as true by default", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "carousel",
    };
    const widget = widgetFactory.createWidget("carousel", props);
    expect(widget.autoPlay).toBe(true);
  });
  it("should allow autoPlay to be set", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "carousel",
      auto_play: false,
    };
    const widget = widgetFactory.createWidget("carousel", props);
    expect(widget.autoPlay).toBe(false);
  });
  it("should have items with the first childs group items", () => {
    const xml = `
      <form>
        <carousel name="carousel">
            <group string="Group 1">
                <field name="field1" string="Field 1" />
            </group>
            <group string="Group 2">
                <field name="field2" string="Field 2" />
                <group string="Group 3">
                    <field name="field3" string="Field 3" />
                </group>
            </group>
        </carousel>
      </form>
    `;
    const fields = {
      field1: {
        string: "Field 1",
        type: "char",
        size: 10,
      },
      field2: {
        string: "Field 2",
        type: "char",
        size: 10,
      },
      field3: {
        string: "Field 3",
        type: "char",
        size: 10,
      },
    };

    const form = new Form(fields);
    form.parse(xml);
    const carousel = form.findById("carousel") as Carousel;
    expect(carousel).toBeInstanceOf(Carousel);
    expect(carousel.items.length).toBe(2);
    expect(carousel.items[0].label).toBe("Group 1");
    expect(carousel.items[1].label).toBe("Group 2");
  });
});
