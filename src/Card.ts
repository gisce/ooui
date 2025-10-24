import Spinner from "./Spinner";

class Card extends Spinner {
  _title: string | null = null;
  get title(): string | null {
    return this._title;
  }

  set title(value: string | null) {
    this._title = value;
  }

  _icon: string | null = null;
  get icon(): string | null {
    return this._icon;
  }

  set icon(value: string | null) {
    this._icon = value;
  }

  constructor(props: any) {
    super(props);
    if (props) {
      if (props.title) {
        this._title = props.title;
      }
      if (props.icon) {
        this._icon = props.icon;
      }
    }
  }
}

export default Card;
