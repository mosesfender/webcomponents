var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var mf;
(function (mf) {
    var MessageType;
    (function (MessageType) {
        MessageType["MESS_DANGER"] = "danger";
        MessageType["MESS_WARNING"] = "warning";
        MessageType["MESS_INFO"] = "info";
        MessageType["MESS_SUCCESS"] = "success";
        MessageType["MESS_DEFAULT"] = "default";
    })(MessageType = mf.MessageType || (mf.MessageType = {}));
    mf.LogMessageTag = 'p';
    var TBaseLogger = (function (_super) {
        __extends(TBaseLogger, _super);
        function TBaseLogger(options) {
            var _this = _super.call(this, options) || this;
            _this._innerInit(options);
            Objects.extend(_this, options);
            _this.element.classList.add('mf-logger');
            return _this;
        }
        TBaseLogger.prototype._innerInit = function (options) {
            this._log = Html.createElementEx('div', this.element, { 'class': 'log' });
        };
        ;
        TBaseLogger.prototype.log = function (messageType, message) {
            var _that = this;
            var _m = [];
            if (typeof message == 'string') {
                _m.push(message);
            }
            else {
                _m = message;
            }
            [].map.call(_m, function (str) {
                Html.createElementEx(mf.LogMessageTag, _that._log, { 'class': messageType }, str);
            });
            this.element.scrollTop = this.element.scrollHeight - this.element.clientHeight;
        };
        Object.defineProperty(TBaseLogger.prototype, "danger", {
            set: function (val) {
                this.log(mf.MessageType.MESS_DANGER, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseLogger.prototype, "warning", {
            set: function (val) {
                this.log(mf.MessageType.MESS_WARNING, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseLogger.prototype, "success", {
            set: function (val) {
                this.log(mf.MessageType.MESS_SUCCESS, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseLogger.prototype, "info", {
            set: function (val) {
                this.log(mf.MessageType.MESS_INFO, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseLogger.prototype, "message", {
            set: function (val) {
                this.log(mf.MessageType.MESS_DEFAULT, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseLogger.prototype, "tag", {
            get: function () {
                return this._tag;
            },
            enumerable: true,
            configurable: true
        });
        return TBaseLogger;
    }(mf.TBaseElement));
    mf.TBaseLogger = TBaseLogger;
})(mf || (mf = {}));
