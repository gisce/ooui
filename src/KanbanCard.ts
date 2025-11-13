import WidgetFactory from "./WidgetFactory";
import Container from "./Container";
import Kanban from "./Kanban";
import { evaluateButtonStates } from "./helpers/stateParser";
import { evaluateAttributes } from "./helpers/attributeParser";
import Button from "./Button";

export type KanbanCardParseOptions = {
  readOnly?: boolean;
};

class KanbanCard {
  _kanbanDef: Kanban;
  get kanbanDef(): Kanban {
    return this._kanbanDef;
  }

  constructor(kanbanDef: Kanban) {
    this._kanbanDef = kanbanDef;
  }

  parse(record: any, options?: KanbanCardParseOptions): Container {
    const readOnly = options?.readOnly ?? false;
    const container = new Container(1, 12, readOnly);
    const widgetFactory = new WidgetFactory();
    let keyIdx = 0;

    this._kanbanDef.card_fields.forEach((field: any) => {
      keyIdx++;

      const evaluatedAttrs = evaluateAttributes({
        tagAttributes: field.raw_props || {},
        values: record,
        fields: this._kanbanDef.fields,
        widgetType: field.type || "field",
      });

      // Extract properties from the existing field widget
      const widgetProps = {
        ...(field.raw_props || {}),
        ...evaluatedAttrs,
        key: `field_${keyIdx}`,
      };

      if (readOnly) {
        widgetProps.readonly = true;
      }

      // Determine widget type from the field
      const widgetType = field.type || "field";
      const widget = widgetFactory.createWidget(widgetType, widgetProps);
      container.addWidget(widget, { addLabel: !field.nolabel });
    });

    // Add buttons to container
    this._kanbanDef.buttons.forEach((button: any) => {
      keyIdx++;

      const evaluatedStates = button.states
        ? evaluateButtonStates({
            states: button.states,
            values: record,
          })
        : {};

      const buttonProps = {
        ...(button.raw_props || {}),
        ...evaluatedStates,
        key: `button_${keyIdx}`,
      };

      if (readOnly) {
        buttonProps.readonly = true;
      }

      const buttonWidget = new Button(buttonProps);
      container.addWidget(buttonWidget, { addLabel: false });
    });

    return container;
  }
}

export default KanbanCard;
