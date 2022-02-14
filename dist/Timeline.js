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
import One2many from "./One2many";
var Timeline = /** @class */ (function (_super) {
    __extends(Timeline, _super);
    function Timeline(props) {
        var _this = _super.call(this, props) || this;
        _this._titleField = "";
        _this._summaryField = "";
        if (props === null || props === void 0 ? void 0 : props.widget_props) {
            try {
                var parsedWidgetProps = JSON.parse(props.widget_props.replace(/'/g, '"'));
                _this._titleField = parsedWidgetProps.titleField;
                _this._summaryField = parsedWidgetProps.summaryField;
            }
            catch (err) {
                throw new Error("Timeline - error parsing widget_props: " + JSON.stringify(err));
            }
        }
        return _this;
    }
    Object.defineProperty(Timeline.prototype, "titleField", {
        get: function () {
            return this._titleField;
        },
        set: function (value) {
            this._titleField = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "summaryField", {
        get: function () {
            return this._summaryField;
        },
        set: function (value) {
            this._summaryField = value;
        },
        enumerable: false,
        configurable: true
    });
    return Timeline;
}(One2many));
export default Timeline;
//# sourceMappingURL=Timeline.js.map