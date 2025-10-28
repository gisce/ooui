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

  /**
   * Height of the card component
   */
  _height: number | undefined = undefined;

  get height(): number | undefined {
    return this._height;
  }

  set height(value: number | undefined) {
    this._height = value;
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
      if (props.height) {
        const parsedHeight = parseInt(props.height);
        this._height = isNaN(parsedHeight) ? undefined : parsedHeight;
      }
    }
  }
}

export default Card;
