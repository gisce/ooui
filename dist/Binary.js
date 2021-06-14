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
import Field from "./Field";
/**
 * Binary base64 field
 */
var Binary = /** @class */ (function (_super) {
    __extends(Binary, _super);
    function Binary(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Filename field name
         */
        _this._filenameField = "";
        if (props) {
            if (props.filename) {
                _this._filenameField = props.filename;
            }
        }
        return _this;
    }
    Object.defineProperty(Binary.prototype, "filenameField", {
        get: function () {
            return this._filenameField;
        },
        set: function (value) {
            this._filenameField = value;
        },
        enumerable: false,
        configurable: true
    });
    return Binary;
}(Field));
export default Binary;
//# sourceMappingURL=Binary.js.map