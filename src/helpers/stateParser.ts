const evaluateStates = ({
  fieldName,
  values,
  fields,
}: {
  fieldName: string;
  values: any;
  fields: any;
}) => {
  if (!fieldName) {
    return {};
  }

  const fieldStatesConfig = fields[fieldName]?.states;

  if (!fieldStatesConfig) {
    return {};
  }

  const newTagStateAttrs: any = {};
  const evaluatedStates: any = {};

  for (const stateCondition of Object.keys(fieldStatesConfig)) {
    if (values["state"] === stateCondition) {
      const configAttrValues = fieldStatesConfig[stateCondition];

      for (const entryConfig of configAttrValues) {
        const [attribute, value] = entryConfig;
        if (!evaluatedStates[attribute]) {
          evaluatedStates[attribute] = [];
        }
        evaluatedStates[attribute].push(value);
      }
    }
  }

  for (const evaluatedState of Object.keys(evaluatedStates)) {
    const values = evaluatedStates[evaluatedState];
    newTagStateAttrs[evaluatedState] = values.some((i: boolean) => i === true);
  }

  return newTagStateAttrs;
};

const evaluateButtonStates = ({
  states,
  values,
}: {
  states: string;
  values: any;
}) => {
  if (!values?.state) {
    return {};
  }
  const splittedStates = states.split(",");
  if (splittedStates.length === 0) {
    return {};
  }
  return !splittedStates.includes(values.state) ? { invisible: true } : {};
};

export { evaluateStates, evaluateButtonStates };
