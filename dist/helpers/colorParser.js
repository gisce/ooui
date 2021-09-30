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
import py from "./py";
export var parseColors = function (colorExpression) {
    var replaceHtml = colorExpression
        .replace(/\&gt\;/g, ">")
        .replace(/\&lt\;/g, "<");
    var colorsExpressions = replaceHtml
        .split(";")
        .filter(function (item) { return item.length > 3; });
    var colors = [];
    colorsExpressions.forEach(function (colorExpression) {
        var _a = colorExpression.split(":"), color = _a[0], test = _a[1];
        colors.push({ color: color, test: test });
    });
    return colors;
};
export var getEvaluatedColor = function (_a) {
    var colorExpressions = _a.colorExpressions, values = _a.values;
    var evaluatedColors = colorExpressions
        .map(function (colorExpression) {
        var value = testExpression({
            testExpression: colorExpression.test,
            values: values,
        });
        if (value) {
            return colorExpression.color;
        }
    })
        .filter(function (color) { return color !== undefined; });
    if (evaluatedColors.length > 0) {
        return evaluatedColors[0];
    }
    else {
        return "default";
    }
};
export var testExpression = function (_a) {
    var testExpression = _a.testExpression, values = _a.values;
    var value = py.eval(testExpression, __assign(__assign({}, values), { current_date: new Date().toISOString().split("T")[0] }));
    return value;
};
//# sourceMappingURL=colorParser.js.map