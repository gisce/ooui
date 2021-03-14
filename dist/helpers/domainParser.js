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
var isNumeric = function (str) {
    if (typeof str !== "string")
        return false; // we only process strings!
    return !isNaN(str) && !isNaN(parseFloat(str));
};
var parseDomain = function (domainValue) {
    if (!domainValue || typeof domainValue !== "string") {
        return [];
    }
    var parsedDomain = [];
    var regex = /\(([^\)]+)\)/g;
    var tupples = [];
    var matches;
    while ((matches = regex.exec(domainValue))) {
        tupples.push(matches[1]);
    }
    tupples.forEach(function (tupple) {
        var splitted = tupple.replace(/\s/g, "").split(",");
        var field = splitted[0].replace(/'/g, "");
        var operator = splitted[1].replace(/'/g, "");
        var value = splitted[2];
        if (value.indexOf("'") === -1 && isNumeric(value)) {
            // Do nothing
        }
        else if (value.indexOf("'") === -1 &&
            !(value === "True" || value === "False")) {
            // If the value references to an actual field, add curly braces around it
            value = "{" + value + "}";
        }
        else {
            value = value.replace(/'/g, "");
        }
        parsedDomain.push([field, operator, value]);
    });
    return parsedDomain;
};
var getParamsForDomain = function (_a) {
    var values = _a.values, domain = _a.domain;
    var valuesToSearchIn = __assign(__assign({}, values), { active_id: values.id });
    return domain.map(function (entry) {
        var field = entry[0], operator = entry[1], value = entry[2];
        var resolvedValue = value;
        if (typeof value === "string" && value.indexOf("{") !== -1) {
            var key = value.replace("{", "").replace("}", "");
            if (valuesToSearchIn[key])
                resolvedValue = valuesToSearchIn[key];
        }
        return [field, operator, resolvedValue];
    });
};
export { parseDomain, getParamsForDomain };
//# sourceMappingURL=domainParser.js.map