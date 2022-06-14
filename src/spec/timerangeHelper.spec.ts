import { checkDatesConsecutive } from "../Graph/processor/timerangeHelper";

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
  });
});
