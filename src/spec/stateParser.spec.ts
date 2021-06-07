import { evaluateStates, evaluateButtonStates } from "../helpers/stateParser";

describe("An States Parser", () => {
  describe("in evaluateStates method", () => {
    it("should properly parse a simple state - readonly to be false", () => {
      const fields = {
        data_final: {
          readonly: true,
          states: {
            draft: [["readonly", false]],
          },
          string: "Data final",
          type: "date",
          views: {},
        },
      };

      const values = {
        state: "draft",
      };

      const evaluatedStateAttrs = evaluateStates({
        fieldName: "data_final",
        values,
        fields,
      });

      expect(evaluatedStateAttrs.readonly).toBeFalsy();
    });
    it("should properly parse a simple state - readonly to be true", () => {
      const fields = {
        data_final: {
          readonly: false,
          states: {
            draft: [["readonly", true]],
          },
          string: "Data final",
          type: "date",
          views: {},
        },
      };

      const values = {
        state: "draft",
      };

      const evaluatedStateAttrs = evaluateStates({
        fieldName: "data_final",
        values,
        fields,
      });

      expect(evaluatedStateAttrs.readonly).toBeTruthy();
    });
    it("should properly parse a simple state - readonly to be unprocessed/undefined", () => {
      const fields = {
        data_final: {
          readonly: true,
          states: {
            draft: [["readonly", false]],
          },
          string: "Data final",
          type: "date",
          views: {},
        },
      };

      const values = {
        state: "other_state",
      };

      const evaluatedStateAttrs = evaluateStates({
        fieldName: "data_final",
        values,
        fields,
      });

      expect(evaluatedStateAttrs.readonly).toBeUndefined();
    });
    it("should properly parse a multiple state field - close", () => {
      const fields = {
        date_due: {
          help:
            "If you use payment terms, the due date will be computed automatically at the generation of accounting entries. If you keep the payment term and the due date empty, it means direct payment. The payment term may compute several due dates, for example 50% now, 50% in one month.",
          states: {
            close: [["readonly", true]],
            open: [["readonly", true]],
          },
          string: "Due Date",
          type: "date",
          views: {},
        },
      };

      const values = {
        state: "close",
      };

      const evaluatedStateAttrs = evaluateStates({
        fieldName: "date_due",
        values,
        fields,
      });

      expect(evaluatedStateAttrs.readonly).toBeTruthy();
    });
    it("should properly parse a multiple state field - no match", () => {
      const fields = {
        date_due: {
          help:
            "If you use payment terms, the due date will be computed automatically at the generation of accounting entries. If you keep the payment term and the due date empty, it means direct payment. The payment term may compute several due dates, for example 50% now, 50% in one month.",
          states: {
            close: [["readonly", true]],
            open: [["readonly", true]],
          },
          string: "Due Date",
          type: "date",
          views: {},
        },
      };

      const values = {
        state: "no_state",
      };

      const evaluatedStateAttrs = evaluateStates({
        fieldName: "date_due",
        values,
        fields,
      });

      expect(evaluatedStateAttrs.readonly).toBeUndefined();
    });
  });
  describe("in evaluateButtonStates method", () => {
    it("should properly parse an invisible button for state", () => {
      const values = {
        state: "draft",
      };

      const evaluatedStateAttrs = evaluateButtonStates({
        states: "draft,pending",
        values,
      });

      expect(evaluatedStateAttrs.invisible).toBeUndefined();
    });
    it("should properly parse an invisible button for unmatched state", () => {
      const values = {
        state: "other",
      };

      const evaluatedStateAttrs = evaluateButtonStates({
        states: "draft,pending",
        values,
      });

      expect(evaluatedStateAttrs.invisible).toBeTruthy();
    });
  });
});
