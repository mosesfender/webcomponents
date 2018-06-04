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
    var TContextMenuMap = (function () {
        function TContextMenuMap(map) {
            this._items = map;
        }
        TContextMenuMap.prototype.getMenuByClass = function (className) {
            for (var i = 0; i < this._items.length; i++) {
                if (className === this._items[i].forClass) {
                    return this._items[i].menuName;
                }
            }
        };
        TContextMenuMap.prototype.getMenuByRole = function (roleName) {
            for (var i = 0; i < this._items.length; i++) {
                if (roleName === this._items[i].forRole) {
                    return this._items[i].menuName;
                }
            }
        };
        TContextMenuMap.prototype.getMenu = function (menuName) {
            for (var i = 0; i < this._items.length; i++) {
                if (menuName === this._items[i].menuName) {
                    return this._items[i];
                }
            }
        };
        return TContextMenuMap;
    }());
    mf.TContextMenuMap = TContextMenuMap;
})(mf || (mf = {}));
var mf;
(function (mf) {
    var TContextMenuList = (function () {
        function TContextMenuList(owner, options) {
            this.items = {};
            var _that = this;
            this.owner = owner;
            if (isArray(options)) {
                [].map.call(options, function (el) {
                    _that.addMenu.call(_that, el);
                });
            }
        }
        TContextMenuList.prototype.addMenu = function (menu) {
            if (menu instanceof mf.TContextMenu) {
                var _name = menu.name || this.count;
                this.items[_name] = menu;
                this.items[_name].owner = this.owner;
                this.items[_name].list = this;
            }
            else if (isArray(menu)) {
                this.addMenu.call(this, new mf.TContextMenu({ items: menu }));
            }
            else if (isObject(menu)) {
                var _name = menu.name || this.count;
                this.items[_name] = new mf.TContextMenu({ name: _name, items: menu.items });
                this.items[_name].owner = this.owner;
                this.items[_name].list = this;
            }
        };
        TContextMenuList.prototype.getMenu = function (name) {
            return this.items[name];
        };
        TContextMenuList.prototype.collapseAll = function () {
            for (var item in this.items) {
                this.items[item].collapse();
            }
        };
        Object.defineProperty(TContextMenuList.prototype, "count", {
            get: function () {
                var count = 0;
                for (var prop in this) {
                    if (this.hasOwnProperty(prop))
                        count = count + 1;
                }
                return count;
            },
            enumerable: true,
            configurable: true
        });
        return TContextMenuList;
    }());
    mf.TContextMenuList = TContextMenuList;
})(mf || (mf = {}));
var mf;
(function (mf) {
    var CONTEXTMENU_ITEM_TYPE;
    (function (CONTEXTMENU_ITEM_TYPE) {
        CONTEXTMENU_ITEM_TYPE[CONTEXTMENU_ITEM_TYPE["BUTTON"] = 1] = "BUTTON";
        CONTEXTMENU_ITEM_TYPE[CONTEXTMENU_ITEM_TYPE["SEPARATOR"] = 2] = "SEPARATOR";
    })(CONTEXTMENU_ITEM_TYPE = mf.CONTEXTMENU_ITEM_TYPE || (mf.CONTEXTMENU_ITEM_TYPE = {}));
    mf.DEF_CONTEXTMENUITEM_CSSCLASS = 'mf-context_menu_item';
    mf.DEF_CONTEXTMENUSEPARATOR_CSSCLASS = 'mf-context_menu_separator';
    var TContextMenuItem = (function (_super) {
        __extends(TContextMenuItem, _super);
        function TContextMenuItem(options) {
            var _this = _super.call(this, options) || this;
            _this.nodeType = 1;
            Objects.extend(_this, options);
            var _that = _this;
            if (_this.nodeType == mf.CONTEXTMENU_ITEM_TYPE.BUTTON) {
                _this._captionElement.parentElement.eventListener('click', function (ev) {
                    var _menuItemElement, _menuItemObj, _menuElement, _menuObj;
                    _menuItemElement = ev.target.closest(['[', mf.ATTRIBUTE_ANCESTOR, ']'].join(''));
                    if (_menuItemElement) {
                        _menuItemObj = _menuItemElement._getObj();
                        if (_menuItemObj) {
                            _menuElement = _menuItemElement.closest('[data-role=' + mf.DEF_CONTEXTMENU_ROLE + ']');
                            if (_menuElement) {
                                _menuObj = _menuElement._getObj();
                                if (_menuObj && _menuObj.expander) {
                                    try {
                                        _menuObj.expander[_menuItemObj.call].call(_menuObj.expander);
                                    }
                                    catch (err) {
                                        console.error(err, _menuObj.expander);
                                    }
                                }
                            }
                        }
                    }
                    _that.parent.parentElement._getObj().collapse();
                });
            }
            return _this;
        }
        TContextMenuItem.prototype._innerInit = function (options) {
            var _that = this;
            if (!options['nodeType']) {
                this.nodeType = mf.CONTEXTMENU_ITEM_TYPE.BUTTON;
            }
            else {
                this.nodeType = options['nodeType'];
            }
            this.element = Html.createElementEx('li', options['parent'], { 'class': options['cssClass'] || "" });
            if (this.nodeType == mf.CONTEXTMENU_ITEM_TYPE.SEPARATOR) {
                this._element.classList.add(mf.DEF_CONTEXTMENUSEPARATOR_CSSCLASS);
            }
            else {
                this._element.classList.add(mf.DEF_CONTEXTMENUITEM_CSSCLASS);
            }
            if (this.nodeType == mf.CONTEXTMENU_ITEM_TYPE.BUTTON) {
                this._captionElement = Html.createElementEx('b', this.element);
            }
        };
        Object.defineProperty(TContextMenuItem.prototype, "caption", {
            get: function () {
                return this._caption;
            },
            set: function (val) {
                this._caption = this._captionElement.innerHTML = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TContextMenuItem.prototype, "cssClass", {
            get: function () {
                return this._cssClass;
            },
            set: function (val) {
                if (isArray(val)) {
                    val.unshift(mf.DEF_CONTEXTMENUITEM_CSSCLASS);
                    this._cssClass = val.join(' ');
                }
                else {
                    val = mf.DEF_CONTEXTMENUITEM_CSSCLASS + ' ' + val;
                    this._cssClass = val.toString();
                }
                this.element.classList.addMany(this._cssClass);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TContextMenuItem.prototype, "ownMenu", {
            get: function () {
                return this.parent.parentElement._getObj();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TContextMenuItem.prototype, "items", {
            get: function () {
                return this.element.children[0]._getObj().items;
            },
            enumerable: true,
            configurable: true
        });
        return TContextMenuItem;
    }(mf.TBaseElement));
    mf.TContextMenuItem = TContextMenuItem;
})(mf || (mf = {}));
var mf;
(function (mf) {
    var TContextMenuItems = (function (_super) {
        __extends(TContextMenuItems, _super);
        function TContextMenuItems(options) {
            return _super.call(this, options) || this;
        }
        TContextMenuItems.create = function (parent) {
            return new mf.TContextMenuItems({
                parent: parent.element
            });
        };
        Object.defineProperty(TContextMenuItems.prototype, "items", {
            get: function () {
                var ret = [];
                var _items = this.element.querySelectorAll('li');
                if (_items) {
                    [].map.call(_items, function (el) {
                        ret.push(el._getObj());
                    });
                }
                return ret;
            },
            set: function (val) {
                var _that = this;
                [].map.call(val, function (el) {
                    el['parent'] = _that.element;
                    var _item = new mf.TContextMenuItem(el);
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TContextMenuItems.prototype, "tag", {
            get: function () {
                return 'ul';
            },
            enumerable: true,
            configurable: true
        });
        return TContextMenuItems;
    }(mf.TBaseElement));
    mf.TContextMenuItems = TContextMenuItems;
})(mf || (mf = {}));
var mf;
(function (mf) {
    var ContextMenuCall;
    (function (ContextMenuCall) {
        ContextMenuCall[ContextMenuCall["METHOD"] = 1] = "METHOD";
        ContextMenuCall[ContextMenuCall["URL"] = 2] = "URL";
    })(ContextMenuCall = mf.ContextMenuCall || (mf.ContextMenuCall = {}));
    mf.DEF_CONTEXTMENU_CSSCLASS = 'mf-context_menu';
    mf.DEF_CONTEXTMENU_ROLE = 'contextmenu';
    var TContextMenu = (function (_super) {
        __extends(TContextMenu, _super);
        function TContextMenu(options) {
            var _this = _super.call(this, options) || this;
            _this.expanded = false;
            _this.events = {};
            Objects.extend(_this, options);
            _this.element.classList.add(mf.DEF_CONTEXTMENU_CSSCLASS);
            _this.element.setAttribute('data-role', mf.DEF_CONTEXTMENU_ROLE);
            if (options.hasOwnProperty('items')) {
                var _items = mf.TContextMenuItems.create(_this);
                _items.items = options['items'];
                delete options['items'];
            }
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
        };
        TContextMenu.prototype.expand = function (ev) {
            this.owner.fire('contentMenuExpand');
            this.element.style.left = ev.pageX + 'px';
            this.element.style.top = ev.pageY + 'px';
            this.element.classList.add('expanded');
            if (this.list) {
                this.list.expanded = this;
            }
            this.expanded = true;
        };
        TContextMenu.prototype.collapse = function () {
            this.element.classList.remove('expanded');
            this.expanded = false;
        };
        Object.defineProperty(TContextMenu.prototype, "items", {
            get: function () {
                return this.element.children[0]._getObj().items;
            },
            enumerable: true,
            configurable: true
        });
        return TContextMenu;
    }(mf.TBaseElement));
    mf.TContextMenu = TContextMenu;
})(mf || (mf = {}));
