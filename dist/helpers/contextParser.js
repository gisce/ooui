import { getValueForField } from "./fieldParser";
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
                    fieldName: fieldName === "active_id" ? "id" : fieldName,
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