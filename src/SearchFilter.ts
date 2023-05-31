import WidgetFactory from "./WidgetFactory";
import Container from "./Container";
import Widget from "./Widget";
import Form from "./Form";

export const SearchFieldTypes: any = {
  text: "text",
  many2one: "many2one",
  char: "char",
  boolean: "boolean",
  selection: "selection",
  float: "float",
  float_time: "float_time",
  progressbar: "progressbar",
  integer: "integer",
  date: "date",
  datetime: "datetime",
};

class SearchFilter {
  /**
   * Object containing the specific fields for primary and secondary search fields
   */
  _searchFields: any;
  get searchFields() {
    return this._searchFields;
  }

  /**
   * Object containing all the fields specification of the whole form
   */
  _fields: any;
  get fields() {
    return this._fields;
  }

  _simpleSearchContainer: Container;
  get simpleSearchContainer(): Container {
    return this._simpleSearchContainer;
  }

  _advancedSearchContainer: Container;
  get advancedSearchContainer(): Container {
    return this._advancedSearchContainer;
  }

  /**
   * String containing the XML for the related form
   */
  _formXml: string;
  get formXml() {
    return this._formXml;
  }

  constructor(
    searchFields: Object,
    fields: Object,
    formXml: string,
    columns: number = 8
  ) {
    this._searchFields = searchFields;
    this._fields = fields;
    this._formXml = formXml;
    this._simpleSearchContainer = new Container(columns);
    this._advancedSearchContainer = new Container(columns);
  }

  parse() {
    const widgetFactory = new WidgetFactory();
    const form = new Form(this.fields);
    form.parse(this.formXml);

    const simpleSearchWidgets = this.parseFields(
      this.searchFields.primary,
      widgetFactory,
      form
    );
    simpleSearchWidgets.forEach((widget) => {
      this.simpleSearchContainer.addWidget(widget, { addLabel: false });
      this.advancedSearchContainer.addWidget(widget, { addLabel: false });
    });

    const advancedSearchWidgets = this.parseFields(
      this.searchFields.secondary,
      widgetFactory,
      form
    );
    advancedSearchWidgets.forEach((widget) => {
      this.advancedSearchContainer.addWidget(widget, { addLabel: false });
    });
  }

  parseFields(
    searchFields: string[],
    widgetFactory: WidgetFactory,
    form: Form
  ) {
    return searchFields.map((searchField) => {
      const fieldAttributes = {
        ...this.fields[searchField],
        name: searchField,
        colspan: 2,
      };
      const { type } = fieldAttributes;
      let widgetType = form.findById(searchField)?.type ?? type;
      if (SearchFieldTypes[widgetType] === undefined) {
        widgetType = type;
      }
      return widgetFactory.createWidget(widgetType!, fieldAttributes);
    });
  }

  /**
   * Calls container's findById method to find the widgets matching with param id
   * @param {string} id id to find
   */
  findById(id: string): Widget | null {
    return this.advancedSearchContainer.findById(id);
  }
}

export default SearchFilter;
