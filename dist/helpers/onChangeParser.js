var parseOnChange = function (onChangeString, values) {
    var splitted = onChangeString
        .replace(/\s/g, "")
        .replace(/'/g, "")
        .replace(")", "")
        .split("(");
    var method = splitted[0];
    var argsGross = splitted[1];
    var argsSplitted = argsGross.split(",");
    var args = {};
    argsSplitted.forEach(function (arg) {
        if (arg === "context") {
            args.context = {};
        }
        else if (values[arg]) {
            args[arg] = values[arg];
        }
    });
    return {
        method: method,
        args: args,
    };
};
export { parseOnChange };
//# sourceMappingURL=onChangeParser.js.map