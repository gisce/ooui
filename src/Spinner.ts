import ContainerWidget from "./ContainerWidget";

class Spinner extends ContainerWidget {
  _loading = false;
  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  constructor(props?: any) {
    super(props);
    if (props) {
      if (props.loading) {
        this._loading = props.loading;
      }
    }
  }
}

export default Spinner;
