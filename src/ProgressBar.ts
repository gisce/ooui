import Field from "./Field";

/**
 * FloatTime input
 */
class FloatTime extends Field {

  constructor(props: any) {
    super(props);

    if (props.string) {
      if (!props.colspan) {
        this.colspan = 2;
      }
    }
  }
}

export default FloatTime;
