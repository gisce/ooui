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
        domain = convertArrayDomainToString(domainValue);
        if (!domain) {
            return;
        }
    }
    var outputDomain = "[";
    var firstParse = domain
        .replace(/\s/g, "")
        .replace(/\"/g, "'")
        .replace(/\[/g, "")
        .replace(/\]/g, "");
    var entries = firstParse.split(",");
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
            if (value === "True" ||
                value === "False" ||
                stringHasNumber(value) ||
                element.indexOf("'") !== -1) {
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
    return outputDomain + "]";
};
function combineDomains(domains) {
    var joined = domains
        .filter(function (entry) { return entry !== undefined; })
        .join(",")
        .replace(/\[/g, "")
        .replace(/\]/g, "");
    return "[" + joined + "]";
}
function convertArrayDomainToString(domainValue) {
    if (!domainValue) {
        return undefined;
    }
    if (domainValue.length === 0) {
        return undefined;
    }
    var outputDomain = "[";
    domainValue.forEach(function (entry, idx) {
        outputDomain += "(";
        entry.forEach(function (element, idy) {
            if (typeof element !== "boolean" && !isNaN(element)) {
                outputDomain += "" + element;
            }
            else if (typeof element === "boolean") {
                outputDomain += "" + (element ? "True" : "False");
            }
            else {
                outputDomain += "'" + element + "'";
            }
            if (idy < entry.length - 1) {
                outputDomain += ",";
            }
        });
        outputDomain += ")";
        if (idx < domainValue.length - 1) {
            outputDomain += ",";
        }
    });
    return outputDomain + "]";
}
export { parseDomain, combineDomains, convertArrayDomainToString };
//# sourceMappingURL=domainParser.js.map