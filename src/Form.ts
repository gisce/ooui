import BaseViewParser, { BaseViewParseOptions } from "./BaseViewParser";
import { ParsedNode } from "./helpers/nodeParser";
import * as txml from "txml";

export type FormParseOptions = BaseViewParseOptions;

class Form extends BaseViewParser {
  /**
   * Widget type
   */
  _type: string = "form";

  /*
  _widgets = {
    *[Symbol.iterator]() {
      if (this._container && this._container.length) {
        this._container.forEach((item) => {

          // yield item
        });
      }
    }
  };
  get widgets() {
    return this._widgets;
  }
  */

  constructor(fields: Object, columns: number = 4) {
    super(fields, columns);
  }

  parse(xml: string, options?: FormParseOptions) {
    const { values = {}, readOnly = false } = options || {};
    const view = txml
      .parse(xml)
      .filter((el: ParsedNode) => el.tagName === "form")[0];

    this.parseViewAttributes(view);
    this._readOnly = readOnly;
    this.initializeContext(values);

    this.parseNode({
      fields: view.children,
      container: this._container,
      values,
    });

    this.extractContextAndAutorefresh();
  }
}

export default Form;
