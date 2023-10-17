import ButtonGroup from "../ButtonGroup";
import WidgetFactory from "../WidgetFactory";
import Button from "../Button";
import { it, expect, describe, beforeAll } from 'vitest';

describe("A ButtonsGroup widget", () => {
  it("should have an id corresponding to button name", () => {
    const widgetFactory = new WidgetFactory();
    const props = {
      name: "defaultButtonGroup",
    };

    const widget = widgetFactory.createWidget("buttonGroup", props);
    expect(widget.id).toBe("defaultButtonGroup");
  });

  describe("Getting child buttons", () => {

    let buttonGroup: ButtonGroup;

    beforeAll(() => {
      const btn1 = new Button({name: "btn1", type: "object", icon: "gtk-execute", string: "Button 1"});
      const btn2 = new Button({name: "btn2", type: "object", icon: "gtk-execute", string: "Button 2"});
      const btn3 = new Button({name: "btn3", type: "object", icon: "gtk-execute", string: "Button 3"});
      buttonGroup = new ButtonGroup({name: "btnGroup", default: "btn1"});
      buttonGroup.container.rows[0].push(...[btn1, btn2, btn3]);
    })

    it("should have child buttons", () => {
      expect(buttonGroup.buttons).toHaveLength(3);
    });

    it("should have this default button", () => {
      expect(buttonGroup.defaultButton?.id).toBe("btn1");
    });

    it("should have this secondary buttons", () => {
      expect(buttonGroup.secondaryButtons).toHaveLength(2);
      expect(buttonGroup.secondaryButtons[0].id).toBe("btn2");
      expect(buttonGroup.secondaryButtons[1].id).toBe("btn3");
    });

  });
  describe("Working with invisible buttons", () => {
    it("Only should return visible buttons", () => {
      const btn1 = new Button({name: "btn1", type: "object", icon: "gtk-execute", string: "Button 1"});
      const btn2 = new Button({name: "btn2", type: "object", icon: "gtk-execute", string: "Button 2", invisible: true});
      const btn3 = new Button({name: "btn3", type: "object", icon: "gtk-execute", string: "Button 3"});
      const buttonGroup = new ButtonGroup({name: "btnGroup", default: "btn1"});
      buttonGroup.container.rows[0].push(...[btn1, btn2, btn3]);
      expect(buttonGroup.buttons).toHaveLength(2);
    });
    it("Only should return visible secondary buttons", () => {
      const btn1 = new Button({name: "btn1", type: "object", icon: "gtk-execute", string: "Button 1"});
      const btn2 = new Button({name: "btn2", type: "object", icon: "gtk-execute", string: "Button 2", invisible: true});
      const btn3 = new Button({name: "btn3", type: "object", icon: "gtk-execute", string: "Button 3"});
      const buttonGroup = new ButtonGroup({name: "btnGroup", default: "btn1"});
      buttonGroup.container.rows[0].push(...[btn1, btn2, btn3]);
      expect(buttonGroup.secondaryButtons).toHaveLength(1);
    });
    it("Should return the first secondary button if default button is invisible", () => {
      const btn1 = new Button({name: "btn1", type: "object", icon: "gtk-execute", string: "Button 1", invisible: true});
      const btn2 = new Button({name: "btn2", type: "object", icon: "gtk-execute", string: "Button 2"});
      const btn3 = new Button({name: "btn3", type: "object", icon: "gtk-execute", string: "Button 3"});
      const buttonGroup = new ButtonGroup({name: "btnGroup", default: "btn1"});
      buttonGroup.container.rows[0].push(...[btn1, btn2, btn3]);
      expect(buttonGroup.buttons).toHaveLength(2);
      expect(buttonGroup.defaultButton).toBe(btn2);
      expect(buttonGroup.secondaryButtons).toHaveLength(1);
    })
  })
});
