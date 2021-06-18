function getValueForField(_a) {
    var values = _a.values, fieldName = _a.fieldName, fields = _a.fields;
    if (!fields) {
        return undefined;
    }
    if (!fields[fieldName]) {
        return values[fieldName] || undefined;
    }
    var fieldType = fields[fieldName].type;
    if (fieldType === "many2one") {
        return values[fieldName][0] || null;
    }
    else if (fieldType === "one2many" || fieldType === "many2many") {
        return values[fieldName].map(function (item) { return item.id; });
    }
    else {
        return values[fieldName];
    }
}
export var parseContext = function (_a) {
    var context = _a.context, values = _a.values, fields = _a.fields;
    // TODO: remove try/catch when we know for sure that all the incoming contexts formats are expected
    try {
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
        var parsedContext_1 = {};
        valuesSplitted.forEach(function (entry) {
            var fieldName = entry[1];
            if (entry[1].indexOf("'") === -1) {
                var valueForField = getValueForField({
                    values: values,
                    fields: fields,
                    fieldName: fieldName,
                });
                parsedContext_1[entry[0].replace(/'/g, "")] = valueForField || undefined;
            }
            else {
                parsedContext_1[entry[0].replace(/'/g, "")] = entry[1].replace(/'/g, "");
            }
        });
        return parsedContext_1;
    }
    catch (e) {
        return undefined;
    }
};
//# sourceMappingURL=contextParser.js.map