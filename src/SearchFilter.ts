import WidgetFactory from "./WidgetFactory";
import Container from "./Container";
import Widget from "./Widget";

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

  constructor(searchFields: Object, fields: Object, columns: number = 8) {
    this._searchFields = searchFields;
    this._fields = fields;
    this._simpleSearchContainer = new Container(columns);
    this._advancedSearchContainer = new Container(columns);
  }

  parse() {
    const widgetFactory = new WidgetFactory();

    const simpleSearchWidgets = this.parseFields(
      this.searchFields.primary,
      widgetFactory
    );
    simpleSearchWidgets.forEach((widget) => {
      this.simpleSearchContainer.addWidget(widget);
      this.advancedSearchContainer.addWidget(widget);
    });

    const advancedSearchWidgets = this.parseFields(
      this.searchFields.secondary,
      widgetFactory
    );
    advancedSearchWidgets.forEach((widget) => {
      this.advancedSearchContainer.addWidget(widget);
    });
  }

  parseFields(searchFields: string[], widgetFactory: WidgetFactory) {
    return searchFields.map((searchField) => {
      const fieldAttributes = {
        ...this.fields[searchField],
        name: searchField,
      };
      const { type } = fieldAttributes;
      return widgetFactory.createWidget(type, fieldAttributes);
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
