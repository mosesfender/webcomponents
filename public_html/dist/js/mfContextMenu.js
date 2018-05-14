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
    var ContextMenuCall;
    (function (ContextMenuCall) {
        ContextMenuCall[ContextMenuCall["METHOD"] = 1] = "METHOD";
        ContextMenuCall[ContextMenuCall["URL"] = 2] = "URL";
    })(ContextMenuCall = mf.ContextMenuCall || (mf.ContextMenuCall = {}));
    var TContextMenu = (function (_super) {
        __extends(TContextMenu, _super);
        function TContextMenu(options) {
            var _this = _super.call(this, options) || this;
            Objects.extend(_this, options);
            return _this;
        }
        TContextMenu.prototype._innerInit = function (options) {
            if (options.hasOwnProperty('element')) {
                this.element = options['element'];
                delete options['element'];
            }
            else {
                this.element = Html.createElementEx('div', document.body);
            }
            this.element.classList.add('mf-context_menu');
            if (options.hasOwnProperty('items')) {
                this._createItems(options['items']);
                delete options['items'];
            }
        };
        ;
        TContextMenu.prototype._createItems = function (items) {
        };
        Object.defineProperty(TContextMenu.prototype, "items", {
            get: function () {
                if (!this._items) {
                    this._items = [];
                }
                return this._items;
            },
            set: function (val) {
                this._items = val;
            },
            enumerable: true,
            configurable: true
        });
        return TContextMenu;
    }(mf.TBaseElement));
    mf.TContextMenu = TContextMenu;
    var TContextMenuItems = (function (_super) {
        __extends(TContextMenuItems, _super);
        function TContextMenuItems() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TContextMenuItems;
    }(mf.TBaseElement));
    mf.TContextMenuItems = TContextMenuItems;
    var TContextMenuItem = (function (_super) {
        __extends(TContextMenuItem, _super);
        function TContextMenuItem(options) {
            var _this = _super.call(this, options) || this;
            Objects.extend(_this, options);
            return _this;
        }
        TContextMenuItem.prototype._innerInit = function (options) {
            this.element = Html.createElementEx('li', options['parent'], { 'class': options['cssClass'] || '' });
            this._captionElement = Html.createElementEx('b', this.element);
        };
        Object.defineProperty(TContextMenuItem.prototype, "caption", {
            get: function () {
                return this._caption;
            },
            set: function (val) {
                this.caption = this._captionElement.innerHTML = val;
            },
            enumerable: true,
            configurable: true
        });
        return TContextMenuItem;
    }(mf.TBaseElement));
    mf.TContextMenuItem = TContextMenuItem;
})(mf || (mf = {}));
