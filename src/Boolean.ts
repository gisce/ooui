import Field from "./Field";

/**
 * Boolean input
 */
class Boolean extends Field {
  constructor(props?: any) {
    super(props);

    if (props?.string) {
      if (!props.colspan) {
        this.colspan = 2;
      }
    }
  }
}

export default Boolean;
