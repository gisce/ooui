var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Selection from "./Selection";
/**
 * Reference field for key-value Many2One behaviour
 */
var Reference = /** @class */ (function (_super) {
    __extends(Reference, _super);
    function Reference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Reference;
}(Selection));
export default Reference;
//# sourceMappingURL=Reference.js.map