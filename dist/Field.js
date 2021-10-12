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
import Widget from "./Widget";
var Field = /** @class */ (function (_super) {
    __extends(Field, _super);
    function Field(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Field identifier
         *
         * Corresponds to the field's name attribute from xml
         */
        _this._id = "";
        /**
         * Label
         */
        _this._label = "";
        /**
         * No label
         *
         * This field hasn't got to show the label
         *
         */
        _this._nolabel = false;
        /**
         *
         * Required field
         *
         */
        _this._required = false;
        /**
         * Activated (default is true)
         */
        _this._activated = true;
        // Activated by default
        _this._activated = true;
        if (props) {
            if (props.name) {
                _this._id = props.name;
            }
            if (props.activated) {
                _this._activated = props.activated;
            }
            if (props.string) {
                _this._label = props.string;
            }
            if (props.help) {
                _this._tooltip = props.help;
            }
            if (props.nolabel &&
                (props.nolabel === "1" ||
                    (typeof props.nolabel === "boolean" && props.nolabel === true))) {
                _this._nolabel = true;
            }
            if (props.required &&
                (props.required === "1" ||
                    props.required === true ||
                    props.required === "True")) {
                _this._required = true;
            }
            if (props.sum) {
                _this._sum = props.sum;
            }
        }
        return _this;
    }
    Object.defineProperty(Field.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "nolabel", {
        get: function () {
            return this._nolabel;
        },
        set: function (value) {
            this._nolabel = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "required", {
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "tooltip", {
        get: function () {
            return this._tooltip;
        },
        set: function (value) {
            this._tooltip = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "activated", {
        get: function () {
            return this._activated;
        },
        set: function (value) {
            this._activated = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "sum", {
        get: function () {
            return this._sum;
        },
        set: function (value) {
            this._sum = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns this instance in case this id matches param id.
     * @param {string} id id (name) to find
     */
    Field.prototype.findById = function (id) {
        var r = null;
        if (this._id === id) {
            r = this;
        }
        return r;
    };
    return Field;
}(Widget));
export default Field;
//# sourceMappingURL=Field.js.map