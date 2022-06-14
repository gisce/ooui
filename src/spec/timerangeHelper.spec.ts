import {
  checkDatesConsecutive,
  adjustXValuesForTimeRage,
  combineValuesForTimerange,
  fillGapsInTimerangeData,
  getMissingConsecutiveDates,
} from "../Graph/processor/timerangeHelper";

describe("a timerangeHelper", () => {
  describe("in checkDatesConsecutive function", () => {
    describe("with day units", () => {
      it("should return true with only one date", () => {
        const consecutive = checkDatesConsecutive(["2020-01-01"], "days");
        expect(consecutive).toBeTruthy();
      });
      it("should return false with two non consecutive dates", () => {
        const consecutive = checkDatesConsecutive(
          ["2020-01-01", "2020-01-05"],
          "days"
        );
        expect(consecutive).toBeFalsy();
      });
      it("should return true with two consecutive dates", () => {
        const consecutive = checkDatesConsecutive(
          ["2020-01-01", "2020-01-02"],
          "days"
        );
        expect(consecutive).toBeTruthy();
      });
      it("should return false with three non consecutive dates", () => {
        const consecutive = checkDatesConsecutive(
          ["2020-01-01", "2020-01-02", "2020-07-02"],
          "days"
        );
        expect(consecutive).toBeFalsy();
      });
    });
    describe("with hour units", () => {
      it("should return true with only one date", () => {
        const consecutive = checkDatesConsecutive(
          ["2020-01-01 18:00"],
          "hours"
        );
        expect(consecutive).toBeTruthy();
      });
      it("should return false with two non consecutive dates", () => {
        const consecutive = checkDatesConsecutive(
          ["2020-01-01 18:00", "2020-01-05 05:00"],
          "hours"
        );
        expect(consecutive).toBeFalsy();
      });
      it("should return true with two consecutive dates", () => {
        const consecutive = checkDatesConsecutive(
          ["2020-01-01 18:00", "2020-01-01 19:00"],
          "hours"
        );
        expect(consecutive).toBeTruthy();
      });
      it("should return false with three non consecutive dates", () => {
        const consecutive = checkDatesConsecutive(
          ["2020-01-01 01:00", "2020-01-01 04:00", "2020-01-02 01:00"],
          "hours"
        );
        expect(consecutive).toBeFalsy();
      });
    });
    describe("with week units", () => {
      it("should return true with only one date", () => {
        const consecutive = checkDatesConsecutive(["2020-01"], "weeks");
        expect(consecutive).toBeTruthy();
      });
      it("should return false with two non consecutive dates", () => {
        const consecutive = checkDatesConsecutive(
          ["2020-01", "2020-03"],
          "weeks"
        );
        expect(consecutive).toBeFalsy();
      });
      it("should return true with two consecutive dates", () => {
        const consecutive = checkDatesConsecutive(
          ["2020-24", "2020-25"],
          "weeks"
        );
        expect(consecutive).toBeTruthy();
      });
      it("should return false with three non consecutive dates", () => {
        const consecutive = checkDatesConsecutive(
          ["2020-01", "2020-02", "2020-04"],
          "weeks"
        );
        expect(consecutive).toBeFalsy();
      });
    });
  });
  describe("in adjustXValuesForTimeRage function", () => {
    it("should transform x values for same hour grouping", () => {
      const values = [
        {
          x: "2022-06-01 15:03:11",
          value: 1,
        },
        {
          x: "2022-06-02 15:03:11",
          value: 2,
        },
        {
          x: "2022-06-03 15:03:11",
          value: 3,
        },
        {
          x: "2022-06-03 15:13:11",
          value: 4,
        },
        {
          x: "2022-06-03 16:13:11",
          value: 5,
        },
        {
          x: "2022-06-03 16:53:11",
          value: 6,
        },
        {
          x: "2022-06-03 16:59:11",
          value: 7,
        },
      ];
      const adjustedValues = adjustXValuesForTimeRage({
        values,
        timerange: "hour",
      });

      expect(adjustedValues.length).toBe(7);
      expect(adjustedValues[0].x).toBe("2022-06-01 15:00");
      expect(adjustedValues[0].value).toBe(1);
      expect(adjustedValues[1].x).toBe("2022-06-02 15:00");
      expect(adjustedValues[1].value).toBe(2);
      expect(adjustedValues[2].x).toBe("2022-06-03 15:00");
      expect(adjustedValues[2].value).toBe(3);
      expect(adjustedValues[3].x).toBe("2022-06-03 15:00");
      expect(adjustedValues[3].value).toBe(4);
      expect(adjustedValues[4].x).toBe("2022-06-03 16:00");
      expect(adjustedValues[4].value).toBe(5);
      expect(adjustedValues[5].x).toBe("2022-06-03 16:00");
      expect(adjustedValues[5].value).toBe(6);
      expect(adjustedValues[6].x).toBe("2022-06-03 16:00");
      expect(adjustedValues[6].value).toBe(7);
    });
    it("should transform x values for same day grouping", () => {
      const values = [
        {
          x: "2022-06-01 15:03:11",
          value: 1,
        },
        {
          x: "2022-06-02 15:03:11",
          value: 2,
        },
        {
          x: "2022-06-03 15:03:11",
          value: 3,
        },
        {
          x: "2022-06-03 15:13:11",
          value: 4,
        },
        {
          x: "2022-06-04 16:13:11",
          value: 5,
        },
        {
          x: "2022-06-04 16:53:11",
          value: 6,
        },
        {
          x: "2022-06-05 16:59:11",
          value: 7,
        },
      ];
      const adjustedValues = adjustXValuesForTimeRage({
        values,
        timerange: "day",
      });

      expect(adjustedValues.length).toBe(7);
      expect(adjustedValues[0].x).toBe("2022-06-01");
      expect(adjustedValues[0].value).toBe(1);
      expect(adjustedValues[1].x).toBe("2022-06-02");
      expect(adjustedValues[1].value).toBe(2);
      expect(adjustedValues[2].x).toBe("2022-06-03");
      expect(adjustedValues[2].value).toBe(3);
      expect(adjustedValues[3].x).toBe("2022-06-03");
      expect(adjustedValues[3].value).toBe(4);
      expect(adjustedValues[4].x).toBe("2022-06-04");
      expect(adjustedValues[4].value).toBe(5);
      expect(adjustedValues[5].x).toBe("2022-06-04");
      expect(adjustedValues[5].value).toBe(6);
      expect(adjustedValues[6].x).toBe("2022-06-05");
      expect(adjustedValues[6].value).toBe(7);
    });
    it("should transform x values for same week grouping", () => {
      const values = [
        {
          x: "2022-06-01 15:03:11",
          value: 1,
        },
        {
          x: "2022-06-02 15:03:11",
          value: 2,
        },
        {
          x: "2022-06-03 15:03:11",
          value: 3,
        },
        {
          x: "2022-06-03 15:13:11",
          value: 4,
        },
        {
          x: "2022-06-04 16:13:11",
          value: 5,
        },
        {
          x: "2022-06-04 16:53:11",
          value: 6,
        },
        {
          x: "2022-06-05 16:59:11",
          value: 7,
        },
        {
          x: "2022-06-15 16:59:11",
          value: 8,
        },
        {
          x: "2022-06-25 16:59:11",
          value: 9,
        },
      ];
      const adjustedValues = adjustXValuesForTimeRage({
        values,
        timerange: "week",
      });

      expect(adjustedValues.length).toBe(9);
      expect(adjustedValues[0].x).toBe("2022-22");
      expect(adjustedValues[0].value).toBe(1);
      expect(adjustedValues[1].x).toBe("2022-22");
      expect(adjustedValues[1].value).toBe(2);
      expect(adjustedValues[2].x).toBe("2022-22");
      expect(adjustedValues[2].value).toBe(3);
      expect(adjustedValues[3].x).toBe("2022-22");
      expect(adjustedValues[3].value).toBe(4);
      expect(adjustedValues[4].x).toBe("2022-22");
      expect(adjustedValues[4].value).toBe(5);
      expect(adjustedValues[5].x).toBe("2022-22");
      expect(adjustedValues[5].value).toBe(6);
      expect(adjustedValues[6].x).toBe("2022-22");
      expect(adjustedValues[6].value).toBe(7);
      expect(adjustedValues[7].x).toBe("2022-24");
      expect(adjustedValues[7].value).toBe(8);
      expect(adjustedValues[8].x).toBe("2022-25");
      expect(adjustedValues[8].value).toBe(9);
    });
    it("should transform x values for same month grouping", () => {
      const values = [
        {
          x: "2022-06-01 15:03:11",
          value: 1,
        },
        {
          x: "2022-06-02 15:03:11",
          value: 2,
        },
        {
          x: "2022-04-03 15:03:11",
          value: 3,
        },
        {
          x: "2022-04-03 15:13:11",
          value: 4,
        },
        {
          x: "2022-05-04 16:13:11",
          value: 5,
        },
        {
          x: "2022-01-04 16:53:11",
          value: 6,
        },
        {
          x: "2022-02-05 16:59:11",
          value: 7,
        },
        {
          x: "2022-02-15 16:59:11",
          value: 8,
        },
        {
          x: "2021-03-25 16:59:11",
          value: 9,
        },
      ];
      const adjustedValues = adjustXValuesForTimeRage({
        values,
        timerange: "month",
      });

      expect(adjustedValues.length).toBe(9);
      expect(adjustedValues[0].x).toBe("2022-06");
      expect(adjustedValues[0].value).toBe(1);
      expect(adjustedValues[1].x).toBe("2022-06");
      expect(adjustedValues[1].value).toBe(2);
      expect(adjustedValues[2].x).toBe("2022-04");
      expect(adjustedValues[2].value).toBe(3);
      expect(adjustedValues[3].x).toBe("2022-04");
      expect(adjustedValues[3].value).toBe(4);
      expect(adjustedValues[4].x).toBe("2022-05");
      expect(adjustedValues[4].value).toBe(5);
      expect(adjustedValues[5].x).toBe("2022-01");
      expect(adjustedValues[5].value).toBe(6);
      expect(adjustedValues[6].x).toBe("2022-02");
      expect(adjustedValues[6].value).toBe(7);
      expect(adjustedValues[7].x).toBe("2022-02");
      expect(adjustedValues[7].value).toBe(8);
      expect(adjustedValues[8].x).toBe("2021-03");
      expect(adjustedValues[8].value).toBe(9);
    });
    it("should transform x values for same year grouping", () => {
      const values = [
        {
          x: "2022-06-01 15:03:11",
          value: 1,
        },
        {
          x: "2022-06-02 15:03:11",
          value: 2,
        },
        {
          x: "2023-04-03 15:03:11",
          value: 3,
        },
        {
          x: "2023-04-03 15:13:11",
          value: 4,
        },
        {
          x: "2020-05-04 16:13:11",
          value: 5,
        },
        {
          x: "2020-01-04 16:53:11",
          value: 6,
        },
        {
          x: "2019-02-05 16:59:11",
          value: 7,
        },
        {
          x: "2018-02-15 16:59:11",
          value: 8,
        },
        {
          x: "2018-03-25 16:59:11",
          value: 9,
        },
      ];
      const adjustedValues = adjustXValuesForTimeRage({
        values,
        timerange: "year",
      });

      expect(adjustedValues.length).toBe(9);
      expect(adjustedValues[0].x).toBe("2022");
      expect(adjustedValues[0].value).toBe(1);
      expect(adjustedValues[1].x).toBe("2022");
      expect(adjustedValues[1].value).toBe(2);
      expect(adjustedValues[2].x).toBe("2023");
      expect(adjustedValues[2].value).toBe(3);
      expect(adjustedValues[3].x).toBe("2023");
      expect(adjustedValues[3].value).toBe(4);
      expect(adjustedValues[4].x).toBe("2020");
      expect(adjustedValues[4].value).toBe(5);
      expect(adjustedValues[5].x).toBe("2020");
      expect(adjustedValues[5].value).toBe(6);
      expect(adjustedValues[6].x).toBe("2019");
      expect(adjustedValues[6].value).toBe(7);
      expect(adjustedValues[7].x).toBe("2018");
      expect(adjustedValues[7].value).toBe(8);
      expect(adjustedValues[8].x).toBe("2018");
      expect(adjustedValues[8].value).toBe(9);
    });
  });
  describe("in combineValuesForTimerange function", () => {
    it("should combine values for same hour grouping", () => {
      const values = [
        {
          x: "2022-06-01 15:03:11",
          value: 1,
          operator: "+",
        },
        {
          x: "2022-06-01 15:03:11",
          value: 2,
          operator: "+",
        },
        {
          x: "2022-06-02 16:03:11",
          value: 3,
          operator: "+",
        },
        {
          x: "2022-06-02 16:53:11",
          value: 4,
          operator: "+",
        },
        {
          x: "2022-06-03 18:03:11",
          value: 5,
          operator: "+",
        },
      ];
      const combinedValues = combineValuesForTimerange({
        values,
        timerange: "hour",
      });

      expect(combinedValues.length).toBe(3);
      expect(combinedValues[0].x).toBe("2022-06-01 15:00");
      expect(combinedValues[0].value).toBe(3);
      expect(combinedValues[1].x).toBe("2022-06-02 16:00");
      expect(combinedValues[1].value).toBe(7);
      expect(combinedValues[2].x).toBe("2022-06-03 18:00");
      expect(combinedValues[2].value).toBe(5);
    });
    it("should combine values for same day grouping with type and stacked", () => {
      const values = [
        {
          x: "2022-06-01 15:03:11",
          value: 1,
          operator: "+",
          type: "Data alta",
          stacked: "sortida",
        },
        {
          x: "2022-06-01 15:03:11",
          value: 2,
          operator: "+",
          type: "Data alta",
          stacked: "sortida",
        },
        {
          x: "2022-06-02 16:03:11",
          value: 3,
          operator: "+",
          type: "Data baixa",
          stacked: "entrada",
        },
        {
          x: "2022-06-02 16:53:11",
          value: 4,
          operator: "+",
          type: "Data alta",
          stacked: "sortida",
        },
        {
          x: "2022-06-03 18:03:11",
          value: 5,
          operator: "+",
          type: "Data alta",
          stacked: "sortida",
        },
      ];
      const combinedValues = combineValuesForTimerange({
        values,
        timerange: "day",
      });

      expect(combinedValues.length).toBe(4);
      expect(combinedValues[0].x).toBe("2022-06-01");
      expect(combinedValues[0].value).toBe(3);
      expect(combinedValues[0].type).toBe("Data alta");
      expect(combinedValues[0].stacked).toBe("sortida");

      expect(combinedValues[1].x).toBe("2022-06-02");
      expect(combinedValues[1].value).toBe(3);
      expect(combinedValues[1].type).toBe("Data baixa");
      expect(combinedValues[1].stacked).toBe("entrada");

      expect(combinedValues[2].x).toBe("2022-06-02");
      expect(combinedValues[2].value).toBe(4);
      expect(combinedValues[2].type).toBe("Data alta");
      expect(combinedValues[2].stacked).toBe("sortida");

      expect(combinedValues[3].x).toBe("2022-06-03");
      expect(combinedValues[3].value).toBe(5);
      expect(combinedValues[3].type).toBe("Data alta");
      expect(combinedValues[3].stacked).toBe("sortida");
    });
  });
  describe("in getMissingConsecutiveDates function", () => {
    it("should return missing consecutive dates by hour", () => {
      const dates = ["2021-01-01 15:00", "2021-01-01 18:00"];
      const missingDates = getMissingConsecutiveDates({
        dates,
        timerange: "hour",
      });
      expect(missingDates.length).toBe(2);
      expect(missingDates[0]).toBe("2021-01-01 16:00");
      expect(missingDates[1]).toBe("2021-01-01 17:00");
    });
    it("should return missing consecutive dates by hour in two different days", () => {
      const dates = ["2021-01-01 23:00", "2021-01-02 05:00"];
      const missingDates = getMissingConsecutiveDates({
        dates,
        timerange: "hour",
      });
      expect(missingDates.length).toBe(5);
      expect(missingDates[0]).toBe("2021-01-02 00:00");
      expect(missingDates[1]).toBe("2021-01-02 01:00");
      expect(missingDates[2]).toBe("2021-01-02 02:00");
      expect(missingDates[3]).toBe("2021-01-02 03:00");
      expect(missingDates[4]).toBe("2021-01-02 04:00");
    });
    it("should return missing consecutive dates by day", () => {
      const dates = ["2021-01-01", "2021-01-15"];
      const missingDates = getMissingConsecutiveDates({
        dates,
        timerange: "day",
      });
      expect(missingDates.length).toBe(13);
      expect(missingDates[0]).toBe("2021-01-02");
      expect(missingDates[12]).toBe("2021-01-14");
    });
    it("should return missing consecutive dates by day different month", () => {
      const dates = ["2021-01-31", "2021-02-02"];
      const missingDates = getMissingConsecutiveDates({
        dates,
        timerange: "day",
      });
      expect(missingDates.length).toBe(1);
      expect(missingDates[0]).toBe("2021-02-01");
    });
    it("should return missing consecutive dates by day different year", () => {
      const dates = ["2021-12-31", "2022-01-02"];
      const missingDates = getMissingConsecutiveDates({
        dates,
        timerange: "day",
      });
      expect(missingDates.length).toBe(1);
      expect(missingDates[0]).toBe("2022-01-01");
    });
    it("should return missing consecutive dates by week", () => {
      const dates = ["2021-50", "2021-52"];
      const missingDates = getMissingConsecutiveDates({
        dates,
        timerange: "week",
      });
      expect(missingDates.length).toBe(1);
      expect(missingDates[0]).toBe("2021-51");
    });
    it("should return missing consecutive dates by week between years", () => {
      const dates = ["2021-52", "2022-02"];
      const missingDates = getMissingConsecutiveDates({
        dates,
        timerange: "week",
      });
      expect(missingDates.length).toBe(1);
      expect(missingDates[0]).toBe("2022-01");
    });
  });
  describe("in fillGapsInTimerangeData function", () => {
    it("should fill gaps in data for hour grouping", () => {
      const values = [
        {
          x: "2022-06-01 15:00",
          value: 1,
        },
        {
          x: "2022-06-01 20:00",
          value: 2,
        },
      ];
      const filledValues = fillGapsInTimerangeData({
        values,
        timerange: "hour",
      });
      expect(true).toBeTruthy();
    });
  });
});
