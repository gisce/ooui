import Field from "./Field";

/**
 * Integer input
 */
class Integer extends Field {

  constructor(props: any) {
    super(props);

    if (props.string) {
      if (!props.colspan) {
        this.colspan = 2;
      }
    }
  }
}

export default Integer;
