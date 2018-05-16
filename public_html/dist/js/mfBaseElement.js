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
                if (typeof el == 'string') {
                    this._element = document.querySelector(el);
                }
                else {
                    this._element = el;
                }
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
        Object.defineProperty(TBaseElement.prototype, "cssClass", {
            get: function () {
                return this._cssClass;
            },
            set: function (val) {
                if (isArray(val)) {
                    this._cssClass = val.join(' ');
                }
                else {
                    this._cssClass = val.toString();
                }
                this.element.classList.addMany(this._cssClass);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseElement.prototype, "monitor", {
            get: function () {
                if (typeof this._monitor == 'string') {
                    if (window.hasOwnProperty(this._monitor)) {
                        this._monitor = window[this._monitor];
                    }
                }
                return this._monitor;
            },
            set: function (val) {
                this._monitor = val;
            },
            enumerable: true,
            configurable: true
        });
        TBaseElement.prototype._logMessage = function (messageType, message) {
            if (this.monitor instanceof mf.TBaseLogger) {
                this.monitor.log(messageType, message);
            }
        };
        Object.defineProperty(TBaseElement.prototype, "danger", {
            set: function (val) {
                this._logMessage(mf.MessageType.MESS_DANGER, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseElement.prototype, "warning", {
            set: function (val) {
                this._logMessage(mf.MessageType.MESS_WARNING, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseElement.prototype, "success", {
            set: function (val) {
                this._logMessage(mf.MessageType.MESS_SUCCESS, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseElement.prototype, "info", {
            set: function (val) {
                this._logMessage(mf.MessageType.MESS_INFO, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseElement.prototype, "message", {
            set: function (val) {
                this._logMessage(mf.MessageType.MESS_DEFAULT, val);
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
