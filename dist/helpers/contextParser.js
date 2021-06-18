export var parseContext = function (_a) {
    var context = _a.context, values = _a.values;
    if (!context)
        return undefined;
    if (context.trim().length === 0) {
        return undefined;
    }
    // TODO: maybe this can be accomplished more performant and elegant with regex
    var strNoWhitespaces = context.replace(/\s/g, "");
    var strNoClauLeft = strNoWhitespaces.replace(/\{/g, "");
    var strNoClauRight = strNoClauLeft.replace(/\}/g, "");
    var entryValues = strNoClauRight.split(",");
    var valuesSplitted = entryValues.map(function (entry) {
        return entry.split(":");
    });
    var parsedContext = {};
    valuesSplitted.forEach(function (entry) {
        if (entry[1].indexOf("'") === -1) {
            parsedContext[entry[0].replace(/'/g, "")] = values[entry[1]] || undefined;
        }
        else {
            parsedContext[entry[0].replace(/'/g, "")] = entry[1].replace(/'/g, "");
        }
    });
    return parsedContext;
};
//# sourceMappingURL=contextParser.js.map