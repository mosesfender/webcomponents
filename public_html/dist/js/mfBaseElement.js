var mf;
(function (mf) {
    mf.ATTRIBUTE_ANCESTOR = 'data-ancestor';
    mf.MAIN_ANCESTOR = 'mfElement';
    mf.ANCESTOR_OBJ = '__obj';
    var TBaseElement = (function () {
        function TBaseElement(options) {
            this._tag = 'div';
            this._innerInit(options);
            Objects.extend(this, options);
            if (this.element instanceof HTMLElement) {
                if (!this.element.hasAttribute((mf.ATTRIBUTE_ANCESTOR))) {
                    this.element.setAttribute((mf.ATTRIBUTE_ANCESTOR), mf.MAIN_ANCESTOR);
                }
                this._element[mf.ANCESTOR_OBJ] = this;
            }
        }
        TBaseElement.prototype._innerInit = function (options) {
        };
        ;
        TBaseElement.prototype.fire = function (atype, adata) {
            if (this.element) {
                this._element.fire(atype, adata);
            }
        };
        TBaseElement.prototype.on = function (atype, func, capture) {
            if (this.element) {
                return this.element.eventListener(atype, func, capture);
            }
        };
        Object.defineProperty(TBaseElement.prototype, "parent", {
            get: function () {
                if (!this._parent) {
                    if (this._element) {
                        this._parent = this._element.parentElement;
                    }
                }
                return this._parent;
            },
            set: function (el) {
                this._parent = el;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseElement.prototype, "element", {
            get: function () {
                if (!this._element) {
                    this._element = Html.createElementEx(this.tag, this.parent || null, { 'data-ancestor': mf.MAIN_ANCESTOR });
                }
                return this._element;
            },
            set: function (el) {
                this._element = el;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseElement.prototype, "tag", {
            get: function () {
                return this._tag;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseElement.prototype, "contextMenu", {
            get: function () {
                return this._contextMenu;
            },
            set: function (val) {
                if (isArray(val)) {
                    this._contextMenu = new mf.TContextMenu({
                        items: val
                    });
                }
                if (val instanceof mf.TContextMenu) {
                    this._contextMenu = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        return TBaseElement;
    }());
    mf.TBaseElement = TBaseElement;
    HTMLElement.prototype['_getObj'] = function () {
        if (this.hasOwnProperty(mf.ANCESTOR_OBJ)) {
            return this[mf.ANCESTOR_OBJ];
        }
    };
})(mf || (mf = {}));
