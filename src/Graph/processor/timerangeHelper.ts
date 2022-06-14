import moment from "moment";
import { Graph } from "..";

export function processTimerangeData({
  values,
  ooui,
}: {
  values: any[];
  ooui: Graph;
}) {
  const timerange = ooui.timerange;
}

export function checkDatesConsecutive(
  dates: string[],
  unit: "hours" | "days" | "weeks" | "months" | "years"
) {
  let consecutive = false;

  if (dates.length === 0) {
    return false;
  }

  if (dates.length === 1) {
    return true;
  }

  for (let i = 0; i < dates.length - 1; i++) {
    const format = dates[i].indexOf(":") ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD";
    const date1 = moment(dates[i], format);
    const date2 = moment(dates[i + 1], format);
    if (date2.diff(date1, unit) === 1) {
      consecutive = true;
    } else {
      consecutive = false;
    }
  }
  return consecutive;
}
