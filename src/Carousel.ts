import ContainerWidget from "./ContainerWidget";

class Carousel extends ContainerWidget {
  _autoPlay = false;

  get autoPlay(): boolean {
    return this._autoPlay;
  }

  set autoPlay(value: boolean) {
    this._autoPlay = value;
  }

  constructor(props?: any) {
    super(props);
    if (props) {
      if (props.auto_play) {
        this._autoPlay = props.auto_play;
      }
    }
  }
}

export default Carousel;
