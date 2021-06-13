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
var parseNodes = function (nodes, fields) {
    var parsedNodes = [];
    Array.prototype.forEach.call(nodes, function (child) {
        if (child.nodeType === child.ELEMENT_NODE) {
            var tag = child.nodeName;
            var tagAttributes_1 = {};
            Array.prototype.forEach.call(child.attributes, function (attr) {
                tagAttributes_1[attr.name] = attr.value;
            });
            if (tag === "field") {
                var name_1 = child.getAttribute("name");
                var attrWidget = child.getAttribute("widget");
                if (attrWidget) {
                    tag = attrWidget;
                }
                else if (name_1) {
                    if (!fields[name_1]) {
                        throw new Error("Field " + name_1 + " doesn't exist in fields defintion");
                    }
                    tag = fields[name_1].type;
                }
                // We do this in order to ignore the blank domain attribute in fields and to prioritize the attributes value 
                if (((Array.isArray(fields[name_1].domain) &&
                    fields[name_1].domain.length === 0) ||
                    fields[name_1].domain === false) &&
                    tagAttributes_1["domain"] &&
                    tagAttributes_1["domain"].length > 0) {
                    delete fields[name_1].domain;
                }
                tagAttributes_1 = __assign(__assign({}, fields[name_1]), tagAttributes_1);
            }
            parsedNodes.push({ tag: tag, tagAttributes: tagAttributes_1, child: child });
        }
    });
    return parsedNodes;
};
export { parseNodes };
//# sourceMappingURL=nodeParser.js.map