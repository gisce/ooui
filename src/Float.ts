import Field from "./Field";

/**
 * Float input
 */
class Float extends Field {

  constructor(props: any) {
    super(props);

    if (props.string) {
      if (!props.colspan) {
        this.colspan = 2;
      }
    }
  }
}

export default Float;
