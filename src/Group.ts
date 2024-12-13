import Spinner from "./Spinner";

class Group extends Spinner {
  _icon: string | null = null;
  get icon(): string | null {
    return this._icon;
  }

  set icon(value: string | null) {
    this._icon = value;
  }

  _height: number | undefined;
  get height(): number | undefined {
    return this._height;
  }

  set height(value: number | undefined) {
    this._height = value;
  }

  constructor(props: any) {
    super(props);
    if (props) {
      if (props.icon) {
        this._icon = props.icon;
      }
      if (props.height) {
        try {
          this._height = parseInt(props.height);
        } catch (e) {
          console.log("Error parsing height");
          this._height = undefined;
        }
      }
    }
  }
}

export default Group;
