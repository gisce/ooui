import ContainerWidget from "./ContainerWidget";

class Notebook extends ContainerWidget {

  static defaultColspan = 3;

  constructor(props) {
    super("notebook", props);
  }
}

export default Notebook;
