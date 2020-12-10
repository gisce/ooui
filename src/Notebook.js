import ContainerWidget from "./ContainerWidget";

class Notebook extends ContainerWidget {

  static _defaultColspan = 3;
  static get defaultColspan() {
    return Notebook._defaultColspan;
  }
  static set defaultColspan(value) {
    Notebook._defaultColspan = value;
  }

  constructor(props) {
    super(props);
    this.colspan = Notebook._defaultColspan;

    if (props) {
      if (props.colspan) {
        this.colspan = props.colspan;
      }
    }
  }
}

export default Notebook;
