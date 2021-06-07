declare const evaluateStates: ({ fieldName, values, fields, }: {
    fieldName: string;
    values: any;
    fields: any;
}) => any;
declare const evaluateButtonStates: ({ states, values, }: {
    states: string;
    values: any;
}) => {
    invisible?: undefined;
} | {
    invisible: boolean;
};
export { evaluateStates, evaluateButtonStates };
