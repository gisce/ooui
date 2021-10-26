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
export { transformDomainForChildWidget };
//# sourceMappingURL=domainParser.js.map