import ContainerWidget from "./ContainerWidget";
import Group from "./Group";
import { parseBoolAttribute } from "./helpers/nodeParser";

class Carousel extends ContainerWidget {
  _autoPlay = true;

  get autoPlay(): boolean {
    return this._autoPlay;
  }

  set autoPlay(value: boolean) {
    this._autoPlay = value;
  }

  get items(): Group[] {
    return this._container.rows.flat().filter((g) => !g.invisible) as Group[];
  }

  constructor(props?: any) {
    super(props);
    if (props) {
      if ("auto_play" in props) {
        this._autoPlay = parseBoolAttribute(props.auto_play);
      }
    }
  }
}

export default Carousel;
