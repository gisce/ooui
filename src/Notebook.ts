import ContainerWidget from "./ContainerWidget";

class Notebook extends ContainerWidget {

  static _defaultColspan: number = 3;
  static get defaultColspan(): number {
    return Notebook._defaultColspan;
  }
  static set defaultColspan(value: number) {
    Notebook._defaultColspan = value;
  }

  constructor(props: any) {
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
