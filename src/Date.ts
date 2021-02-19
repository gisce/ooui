import Field from "./Field";

/**
 * Date input
 */
class Date extends Field {
  constructor(props?: any) {
    super(props);

    if (props?.string) {
      if (!props.colspan) {
        this.colspan = 2;
      }
    }
  }
}

export default Date;
