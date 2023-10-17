import Selection from "./Selection";

type directionType = "horizontal" | "vertical";

/**
 * Selection field for key-value lists
 */
class Radio extends Selection {
  /**
   * Define the direction
   */
  _direction: directionType = "horizontal";
  get direction(): directionType {
    return this._direction;
  }

  set direction(value: directionType) {
    this._direction = value;
  }

  constructor(props: any) {
    super(props);

    if (props) {
      if (this.parsedWidgetProps.hasOwnProperty("direction")) {
        this._direction = this.parsedWidgetProps.direction;
      }
    }
  }
}

export default Radio;
