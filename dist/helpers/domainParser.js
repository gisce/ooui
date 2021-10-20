import { getValueForField } from "./fieldParser";
var stringHasNumber = function (str) {
    if (typeof str !== "string")
        return false; // we only process strings!
    return !isNaN(str) && !isNaN(parseFloat(str));
};
var parseDomain = function (_a) {
    var domainValue = _a.domainValue, values = _a.values, fields = _a.fields;
    var domain;
    if (typeof domainValue === "string") {
        domain = domainValue;
    }
    else {
        return domainValue;
    }
    var outputDomain = "";
    var firstParse = domain
        .slice(1, -1)
        .replace(/, /g, ",")
        .replace(/\) /g, ")")
        .replace(/\"/g, "'")
        .replace(/True/g, "true")
        .replace(/False/g, "false");
    var splittedEntries = firstParse.split(",").filter(function (entry) { return entry !== ""; });
    var entries = [];
    var arrayStart = false;
    var arrayEntries = [];
    for (var i = 0; i <= splittedEntries.length - 1; i += 1) {
        var entry = splittedEntries[i];
        if (entry.indexOf("[]") !== -1) {
            entries.push(entry);
        }
        else if (entry.startsWith("[")) {
            arrayStart = true;
            arrayEntries = [];
            arrayEntries.push(entry);
        }
        else if (entry.indexOf("]") !== -1) {
            arrayStart = false;
            arrayEntries.push(entry);
            entries.push(arrayEntries.join(","));
        }
        else if (arrayStart) {
            arrayEntries.push(entry);
        }
        else {
            entries.push(entry);
        }
    }
    entries.forEach(function (element, idx) {
        if (element.indexOf("(") !== -1) {
            outputDomain += element + ",";
            return;
        }
        if (element.indexOf("(") === -1 && element.indexOf(")") === -1) {
            outputDomain += element + ",";
            return;
        }
        if (element.indexOf(")") !== -1) {
            var value = element.replace(/\)/g, "").replace(/\'/g, "");
            if (value === "true" ||
                value === "false" ||
                stringHasNumber(value) ||
                element.indexOf("'") !== -1 ||
                element.indexOf("[") !== -1) {
                outputDomain += element;
            }
            else {
                var foundValue = getValueForField({
                    values: values,
                    fieldName: value,
                    fields: fields,
                });
                if (!isNaN(foundValue)) {
                    outputDomain += foundValue + ")";
                }
                else {
                    outputDomain += "'" + foundValue + "')";
                }
            }
            if (idx < entries.length - 1) {
                outputDomain += ",";
            }
            return;
        }
    });
    var output = "[" + outputDomain
        .replace(/\(/g, "[")
        .replace(/\)/g, "]")
        .replace(/\'/g, '"') + "]";
    var outputParsed = JSON.parse(output);
    return outputParsed;
};
var transformDomainForChildWidget = function (_a) {
    var domain = _a.domain, widgetFieldName = _a.widgetFieldName;
    var transformedDomain = [];
    domain.forEach(function (domainEntry) {
        if (!Array.isArray(domainEntry)) {
            return;
        }
        var fieldName = domainEntry[0], operator = domainEntry[1], value = domainEntry[2];
        var rootFieldName;
        var targetFieldName;
        if (fieldName.indexOf(".") !== -1) {
            rootFieldName = fieldName.substr(0, fieldName.indexOf("."));
            targetFieldName = fieldName.substr(fieldName.indexOf(".") + 1, fieldName.length - 1);
        }
        else {
            rootFieldName = fieldName;
            targetFieldName = "id";
        }
        if (rootFieldName === widgetFieldName) {
            transformedDomain.push([targetFieldName, operator, value]);
        }
    });
    return transformedDomain;
};
export { parseDomain, transformDomainForChildWidget };
//# sourceMappingURL=domainParser.js.map