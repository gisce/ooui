import moment from "moment";
import { Graph } from "..";
import { getValueForOperator } from "./graphProcessor";

export function processTimerangeData({
  values,
  timerange,
}: {
  values: any[];
  timerange: string;
}) {
  const combinedValues = combineValuesForTimerange({
    values,
    timerange,
  });

  return combinedValues;
}

export function fillGapsInTimerangeData({
  values,
  timerange,
}: {
  values: any[];
  timerange: string;
}) {}

export function combineValuesForTimerange({
  values,
  timerange,
}: {
  values: any[];
  timerange: string;
}) {
  const adjustedValues = adjustXValuesForTimeRage({
    values,
    timerange,
  });
  const uniqueValues: { [key: string]: any } = {};
  let finalValues: any[] = [];

  // group by x, type and stacked
  adjustedValues.forEach((value) => {
    const x = value.x;
    const type = value.type;
    const stacked = value.stacked;
    const uniqueKey = `${x}-${type}-${stacked}`;
    if (!uniqueValues[uniqueKey]) {
      uniqueValues[uniqueKey] = { operator: value.operator, values: [] };
    }
    uniqueValues[uniqueKey].values.push(value);
  });

  Object.keys(uniqueValues).forEach((key) => {
    const objectForKey = uniqueValues[key];

    const finalValue = getValueForOperator({
      values: objectForKey.values.map((entry: any) => entry.value),
      operator: objectForKey.operator,
    });

    finalValues.push({
      ...objectForKey.values[0],
      value: finalValue,
    });
  });

  return finalValues;
}

export function adjustXValuesForTimeRage({
  values,
  timerange,
}: {
  values: any[];
  timerange: string;
}) {
  return values.map((value) => {
    return {
      ...value,
      x: convertDateToTimeRangeAdjusted({
        date: value.x,
        timerange: timerange,
      }),
    };
  });
}

export function convertDateToTimeRangeAdjusted({
  date,
  timerange,
}: {
  date: string;
  timerange: string;
}) {
  let format = getDateFormat(date);
  const momentDate = moment(date, format);
  switch (timerange) {
    case "hour": {
      format = "YYYY-MM-DD HH:00";
      break;
    }
    case "day": {
      format = "YYYY-MM-DD";
      break;
    }
    case "week": {
      format = "YYYY-WW";
      break;
    }
    case "month": {
      format = "YYYY-MM";
      break;
    }
    case "year": {
      format = "YYYY";
      break;
    }
  }
  return momentDate.format(format);
}

export function getDateFormat(date: string) {
  return date.indexOf(":") ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD";
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
    const format = getDateFormat(dates[i]);
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
