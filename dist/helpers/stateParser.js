var evaluateStates = function (_a) {
    var _b;
    var fieldName = _a.fieldName, values = _a.values, fields = _a.fields;
    if (!fieldName) {
        return {};
    }
    var fieldStatesConfig = (_b = fields[fieldName]) === null || _b === void 0 ? void 0 : _b.states;
    if (!fieldStatesConfig) {
        return {};
    }
    var newTagStateAttrs = {};
    var evaluatedStates = {};
    for (var _i = 0, _c = Object.keys(fieldStatesConfig); _i < _c.length; _i++) {
        var stateCondition = _c[_i];
        if (values["state"] === stateCondition) {
            var configAttrValues = fieldStatesConfig[stateCondition];
            for (var _d = 0, configAttrValues_1 = configAttrValues; _d < configAttrValues_1.length; _d++) {
                var entryConfig = configAttrValues_1[_d];
                var attribute = entryConfig[0], value = entryConfig[1];
                if (!evaluatedStates[attribute]) {
                    evaluatedStates[attribute] = [];
                }
                evaluatedStates[attribute].push(value);
            }
        }
    }
    for (var _e = 0, _f = Object.keys(evaluatedStates); _e < _f.length; _e++) {
        var evaluatedState = _f[_e];
        var values_1 = evaluatedStates[evaluatedState];
        newTagStateAttrs[evaluatedState] = values_1.some(function (i) { return i === true; });
    }
    return newTagStateAttrs;
};
var evaluateButtonStates = function (_a) {
    var states = _a.states, values = _a.values;
    if (!(values === null || values === void 0 ? void 0 : values.state)) {
        return {};
    }
    var splittedStates = states.split(",");
    if (splittedStates.length === 0) {
        return {};
    }
    return !splittedStates.includes(values.state) ? { invisible: true } : {};
};
export { evaluateStates, evaluateButtonStates };
//# sourceMappingURL=stateParser.js.map