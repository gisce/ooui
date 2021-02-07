import Field from "./Field";

/**
 * DateTime input
 */
class DateTime extends Field {
  constructor(props: any) {
    super(props);

    if (props.string) {
      if (!props.colspan) {
        this.colspan = 2;
      }
    }
  }
}

export default DateTime;
