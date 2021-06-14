var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var evaluateCondition = function (_a) {
    var entry = _a.entry, values = _a.values, fields = _a.fields;
    var fieldName = entry[0], operator = entry[1], expectedValue = entry[2];
    if (values[fieldName] === undefined || fields[fieldName] === undefined) {
        return false;
    }
    var filteredExpectedValue = expectedValue;
    if (fields[fieldName].type === "boolean" &&
        (expectedValue === 0 || expectedValue === 1)) {
        filteredExpectedValue = expectedValue === 0 ? false : true;
    }
    switch (operator.toLowerCase()) {
        case "=":
        case "==":
            return values[fieldName] === filteredExpectedValue;
        case "<>":
        case "!=":
            return values[fieldName] !== filteredExpectedValue;
        case ">":
            return values[fieldName] > filteredExpectedValue;
        case ">=":
            return values[fieldName] >= filteredExpectedValue;
        case "<":
            return values[fieldName] < filteredExpectedValue;
        case "<=":
            return values[fieldName] <= filteredExpectedValue;
        case "in":
            return filteredExpectedValue.includes(values[fieldName]);
        case "not in":
            return !filteredExpectedValue.includes(values[fieldName]);
        default:
            return false;
    }
};
var parseAttributes = function (_a) {
    var attrs = _a.attrs, values = _a.values, fields = _a.fields;
    var leftP = attrs.replace(/\(/g, "[");
    var rightP = leftP.replace(/\)/g, "]");
    var clearQuotes = rightP.replace(/\'/g, '"');
    var replaceTrue = clearQuotes.replace(/True/g, "true");
    var replaceFalse = replaceTrue.replace(/False/g, "false");
    var parsedObject = JSON.parse(replaceFalse);
    var newAttributes = {};
    for (var _i = 0, _b = Object.keys(parsedObject); _i < _b.length; _i++) {
        var attrField = _b[_i];
        var entries = parsedObject[attrField];
        var evaluatedEntries = entries.map(function (entry) {
            return evaluateCondition({ entry: entry, values: values, fields: fields });
        });
        newAttributes[attrField] = evaluatedEntries.every(function (i) { return i === true; });
    }
    return newAttributes;
};
var evaluateAttributes = function (_a) {
    var tagAttributes = _a.tagAttributes, values = _a.values, fields = _a.fields;
    var newTagAttributes = tagAttributes.attrs
        ? parseAttributes({
            attrs: tagAttributes.attrs,
            values: values,
            fields: fields,
        })
        : {};
    return __assign(__assign(__assign({}, tagAttributes), newTagAttributes), { attrs: undefined });
};
export { evaluateAttributes };
//# sourceMappingURL=attributeParser.js.map