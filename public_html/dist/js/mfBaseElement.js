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
    var TDatasetClasses;
    (function (TDatasetClasses) {
        TDatasetClasses["TDataset"] = "TDataset";
        TDatasetClasses["TAjaxDataset"] = "TAjaxDataset";
        TDatasetClasses["TGooleMapDataset"] = "TGoogleMapDataset";
    })(TDatasetClasses = mf.TDatasetClasses || (mf.TDatasetClasses = {}));
    ;
    var TFieldTypes;
    (function (TFieldTypes) {
        TFieldTypes[TFieldTypes["NUMBER"] = 0] = "NUMBER";
        TFieldTypes[TFieldTypes["STRING"] = 1] = "STRING";
    })(TFieldTypes = mf.TFieldTypes || (mf.TFieldTypes = {}));
    ;
    var TDataset = (function () {
        function TDataset(owner) {
            this._data = [];
            this.flagBof = false;
            this.flagEof = false;
            this.cursor = 0;
            this.defFields = [];
            this.owner = owner;
        }
        TDataset.prototype.loadData = function (data) {
            console.log(this);
            this.data = data;
            this.owner.loaded.call(this.owner);
        };
        TDataset.prototype.defineFields = function () {
            this.defFields = [];
            if (this._data.length > 0) {
                for (var p in this._data[0]) {
                    var ftype = TFieldTypes.STRING;
                    if (isInteger(this.data[0][p])) {
                        ftype = TFieldTypes.NUMBER;
                    }
                    this.defFields.push({
                        fieldName: p,
                        fieldType: ftype
                    });
                }
            }
        };
        TDataset.prototype.issetField = function (fieldName) {
            for (var i = 0; i < this.defFields.length; i++) {
                if (fieldName == this.defFields[i].fieldName) {
                    return this.defFields[i];
                }
            }
            return false;
        };
        TDataset.prototype.first = function () {
            return this.setIndex(0);
        };
        TDataset.prototype.prev = function () {
            return this.setIndex(this.cursor - 1);
        };
        TDataset.prototype.next = function () {
            return this.setIndex(this.cursor + 1);
        };
        TDataset.prototype.last = function () {
            return this.setIndex(this._data.length - 1);
        };
        TDataset.prototype.current = function () {
            try {
                return this.setIndex(this.cursor);
            }
            catch (err) {
                this.cursor = 0;
                return this.setIndex(this.cursor);
            }
        };
        TDataset.prototype.goTo = function (a, value) {
            if (typeof a == 'string') {
                return this.goTo(this.findIndex(a, value));
            }
            else if (typeof a == 'number') {
                return this.setIndex(a);
            }
        };
        TDataset.prototype.findIndex = function (field, value) {
            try {
                for (var i = 0; i < this._data.length; i++) {
                    if (value == this._data[i][field]) {
                        return i;
                    }
                }
            }
            catch (err) {
                console.error(err);
            }
            return 0;
        };
        TDataset.prototype.size = function () {
            return this._data.length;
        };
        TDataset.prototype.setIndex = function (idx) {
            try {
                this.flagBof = false;
                this.flagEof = false;
                if (idx < 0) {
                    idx = 0;
                    this.flagBof = true;
                }
                if (idx >= this._data.length) {
                    idx = this._data.length - 1;
                    this.flagEof = true;
                }
                this.cursor = idx;
                return this._data[this.cursor];
            }
            catch (err) {
                this.cursor = 0;
            }
        };
        TDataset.prototype.fieldByName = function (fieldName) {
            var ret = new TDataField();
            ret.name = fieldName;
            if (this.data[this.cursor].hasOwnProperty(fieldName)) {
                ret.value = this.data[this.cursor][fieldName];
            }
            else {
                ret.value = '';
            }
            return ret;
        };
        TDataset.prototype.column = function (fieldName) {
            var ret = [];
            [].map.call(this._data, function (row) {
                if (row[fieldName]) {
                    ret.push(row[fieldName]);
                }
            });
            return ret;
        };
        Object.defineProperty(TDataset.prototype, "Bof", {
            get: function () {
                return this.flagBof;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TDataset.prototype, "Eof", {
            get: function () {
                return this.flagEof;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TDataset.prototype, "index", {
            get: function () {
                return this.cursor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TDataset.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (data) {
                this._data = data;
                this.defineFields();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TDataset.prototype, "isActive", {
            get: function () {
                return this.size() > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TDataset.prototype, "selectValue", {
            set: function (val) {
                try {
                    this._selectValue = val;
                    this.findIndex(this._selectValue, this.owner.keyFieldName);
                }
                catch (err) {
                }
            },
            enumerable: true,
            configurable: true
        });
        return TDataset;
    }());
    mf.TDataset = TDataset;
    var TDataField = (function () {
        function TDataField() {
        }
        TDataField.prototype.asString = function () {
            return this.value.toString();
        };
        TDataField.prototype.asInteger = function () {
            return parseInt(this.value);
        };
        return TDataField;
    }());
    mf.TDataField = TDataField;
})(mf || (mf = {}));
var mf;
(function (mf) {
    var RequestMethods;
    (function (RequestMethods) {
        RequestMethods["GET"] = "GET";
        RequestMethods["POST"] = "POST";
    })(RequestMethods = mf.RequestMethods || (mf.RequestMethods = {}));
    ;
    var TAjaxDataset = (function (_super) {
        __extends(TAjaxDataset, _super);
        function TAjaxDataset(owner) {
            var _this = _super.call(this, owner) || this;
            _this.requestParams = {};
            _this.requestMethod = RequestMethods.GET;
            _this.owner = owner;
            return _this;
        }
        TAjaxDataset.prototype.loadData = function (params) {
            var _that = this;
            if (arguments.length) {
                if (isArray(params)) {
                    _super.prototype.loadData.call(this, params);
                    return true;
                }
                else {
                    this.requestParams = params;
                }
            }
            fetch(_that.baseUrl)
                .then(function (resp) {
            }).catch();
        };
        return TAjaxDataset;
    }(mf.TDataset));
    mf.TAjaxDataset = TAjaxDataset;
})(mf || (mf = {}));
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
        TBaseElement.prototype.destroy = function () {
            this._element.remove();
            return this;
        };
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
var mf;
(function (mf) {
    var TBaseDataElement = (function (_super) {
        __extends(TBaseDataElement, _super);
        function TBaseDataElement(options) {
            var _this = _super.call(this, options) || this;
            _this._dataset = new mf.TDataset(_this);
            return _this;
        }
        TBaseDataElement.prototype.loaded = function (aowner) { };
        Object.defineProperty(TBaseDataElement.prototype, "dataset", {
            get: function () {
                return this._dataset;
            },
            enumerable: true,
            configurable: true
        });
        return TBaseDataElement;
    }(mf.TBaseElement));
    mf.TBaseDataElement = TBaseDataElement;
})(mf || (mf = {}));
