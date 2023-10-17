import moment from "moment";
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

  // Fill the gaps
  const filledValues = fillGapsInTimerangeData({
    values: combinedValues,
    timerange,
  });

  return filledValues;
}

export function fillGapsInTimerangeData({
  values,
  timerange,
}: {
  values: any[];
  timerange: string;
}) {
  let finalValues: any[] = [];
  const uniqueValues: Record<string, any> = getUniqueValuesGroupedBy({
    values,
    groupBy: "type-stacked",
  });
  const units = `${timerange}s` as any;

  Object.keys(uniqueValues).forEach((key) => {
    const valuesForKey = uniqueValues[key];

    for (let i = 0; i < valuesForKey.length; i++) {
      const value = valuesForKey[i];

      finalValues.push(value);

      // If it's the last item
      if (i === valuesForKey.length - 1) {
        return;
      }

      const date = value.x;
      const nextDate = valuesForKey[i + 1].x;

      if (!checkDatesConsecutive([date, nextDate], units)) {
        const missingDates = getMissingConsecutiveDates({
          dates: [date, nextDate],
          timerange,
        });
        finalValues = finalValues.concat(
          missingDates.map((stringDate) => {
            return {
              x: stringDate,
              value: 0,
              type: value.type,
              stacked: value.stacked,
            };
          }),
        );
      }
    }
  });

  const sortedData = finalValues.sort((a, b) => {
    if (a.x < b.x) {
      return -1;
    }
    if (a.x > b.x) {
      return 1;
    }
    return 0;
  });
  return sortedData;
}

export function getMissingConsecutiveDates({
  dates,
  timerange,
}: {
  dates: string[];
  timerange: string;
}) {
  const missingDates: string[] = [];
  const units = `${timerange}s` as any;
  if (dates.length === 1) {
    return dates;
  }

  const sortedDates = dates.sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });

  for (let i = 0; i < sortedDates.length - 1; i++) {
    const date1 = sortedDates[i];
    const date2 = sortedDates[i + 1];

    if (!checkDatesConsecutive([date1, date2], units)) {
      const iDate = moment(date1, getFormatForUnits(units)).add(1, units);
      const fDate = moment(date2, getFormatForUnits(units));

      while (iDate.isBefore(fDate)) {
        missingDates.push(iDate.format(getFormatForUnits(units)));
        iDate.add(1, units);
      }
    }
  }

  return missingDates;
}

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
  const finalValues: any[] = [];
  // group by x, type and stacked
  const uniqueValues: Record<string, any> = getUniqueValuesGroupedBy({
    values: adjustedValues,
    groupBy: "all",
  });

  Object.keys(uniqueValues).forEach((key) => {
    const valuesForKey = uniqueValues[key];
    const operator =
      valuesForKey[0].operator === "count" ? "+" : valuesForKey[0].operator;

    const finalValue = getValueForOperator({
      values: valuesForKey.map((entry: any) => entry.value),
      operator,
    });

    finalValues.push({
      ...valuesForKey[0],
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
        timerange,
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
  unit: "hours" | "days" | "weeks" | "months" | "years",
) {
  let consecutive = false;
  const format = getFormatForUnits(unit);

  if (dates.length === 0) {
    return false;
  }

  if (dates.length === 1) {
    return true;
  }

  for (let i = 0; i < dates.length - 1; i++) {
    const date1 = moment(dates[i], format);
    const date2 = moment(dates[i + 1], format);
    const diff = date2.diff(date1, unit);

    if (Math.abs(diff) === 1) {
      consecutive = true;
    } else {
      consecutive = false;
    }
  }
  return consecutive;
}

export function getUniqueValuesGroupedBy({
  values,
  groupBy,
}: {
  values: any[];
  groupBy: "all" | "type-stacked";
}) {
  const uniqueValues: Record<string, any> = {};
  values.forEach((value) => {
    const x = value.x;
    const type = value.type;
    const stacked = value.stacked;
    const uniqueKey =
      groupBy === "all" ? `${x}-${type}-${stacked}` : `${type}-${stacked}`;
    if (!uniqueValues[uniqueKey]) {
      uniqueValues[uniqueKey] = [];
    }
    uniqueValues[uniqueKey].push(value);
  });
  return uniqueValues;
}

export function getFormatForUnits(units: string) {
  switch (units) {
    default:
    case "hours": {
      return "YYYY-MM-DD HH:mm";
    }
    case "days": {
      return "YYYY-MM-DD";
    }
    case "weeks": {
      return "YYYY-WW";
    }
    case "months": {
      return "YYYY-MM";
    }
    case "years": {
      return "YYYY";
    }
  }
}
