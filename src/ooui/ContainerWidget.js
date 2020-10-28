import Widget from "./Widget";
import Container from "./Container";

class ContainerWidget extends Widget {
  constructor(type, columns) {
    super(type);
    this.container = new Container(columns);
  }
}

export default ContainerWidget;