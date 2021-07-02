var parseOnChange = function (onChangeString) {
    var splitted = onChangeString
        .replace(/\s/g, "")
        .replace(/'/g, "")
        .replace(")", "")
        .split("(");
    var method = splitted[0];
    var argsGross = splitted[1];
    var argsSplitted = argsGross.split(",");
    return {
        method: method,
        args: argsSplitted
    };
};
export { parseOnChange };
//# sourceMappingURL=onChangeParser.js.map