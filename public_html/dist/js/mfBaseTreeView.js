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
    var NODE_EXPANDED_STATE;
    (function (NODE_EXPANDED_STATE) {
        NODE_EXPANDED_STATE["NODE_EXPANDED"] = "expanded";
        NODE_EXPANDED_STATE["NODE_COLLAPSED"] = "collapsed";
        NODE_EXPANDED_STATE["NODE_NOCHILD"] = "nochild";
    })(NODE_EXPANDED_STATE = mf.NODE_EXPANDED_STATE || (mf.NODE_EXPANDED_STATE = {}));
    var NODE_CLASSES;
    (function (NODE_CLASSES) {
        NODE_CLASSES["NODE_SELECTED"] = "selected";
        NODE_CLASSES["NODE_LEVER_ICON_CLASS"] = "icon-arrow-right2";
        NODE_CLASSES["NODE_LEVER_ICON_CLASS_NOCHILD"] = "icon-radio-unchecked";
        NODE_CLASSES["NODE_LEVER_BUSY"] = "icon-spinner9";
    })(NODE_CLASSES = mf.NODE_CLASSES || (mf.NODE_CLASSES = {}));
    var TBaseTreeNode = (function (_super) {
        __extends(TBaseTreeNode, _super);
        function TBaseTreeNode(options) {
            var _this = _super.call(this, options) || this;
            _this.element.setAttribute('data-role', mf.TREE_ROLE.TREE_NODE);
            _this.caption = _this.data.caption;
            _this.data.selected = false;
            if (_this.data.children && _this.data.children.length) {
                _this._createNodes();
                _this._nodes.nodes = _this.data.children;
                _this.data.expanded ? _this._handlerExpand.call(_this) : _this._handlerCollapse.call(_this);
            }
            else {
                _this.data.children = [];
            }
            _this._hasChild();
            return _this;
        }
        TBaseTreeNode.prototype._innerInit = function () {
            try {
                this._data = {};
                this._colapseLever = Html.createElementEx('i', this.element, { 'class': mf.NODE_CLASSES.NODE_LEVER_ICON_CLASS, 'data-role': mf.TREE_ROLE.TREE_NODE_LEVER });
                this._label = Html.createElementEx('b', this.element, { 'data-role': mf.TREE_ROLE.TREE_NODE_CAPTION });
            }
            catch (err) {
            }
        };
        TBaseTreeNode.prototype.busy = function (val) {
            if (val) {
                this._colapseLever.classList.removeMany([mf.NODE_CLASSES.NODE_LEVER_ICON_CLASS_NOCHILD, mf.NODE_CLASSES.NODE_LEVER_ICON_CLASS]);
                this._colapseLever.classList.add(mf.NODE_CLASSES.NODE_LEVER_BUSY);
            }
            else {
                this._hasChild();
            }
        };
        TBaseTreeNode.prototype.toggle = function () {
            if (this.expanded) {
                this.collapse();
            }
            else {
                this.expand();
            }
        };
        TBaseTreeNode.prototype.expand = function () {
            this._data.expanded = true;
            this._handlerExpand.call(this);
            this._treeView.fire('expand', this);
        };
        TBaseTreeNode.prototype._handlerExpand = function () {
            this.element.classList.remove(mf.NODE_EXPANDED_STATE.NODE_COLLAPSED);
            this.element.classList.add(mf.NODE_EXPANDED_STATE.NODE_EXPANDED);
            this._hasChild();
        };
        TBaseTreeNode.prototype.collapse = function () {
            this._data.expanded = false;
            this._handlerCollapse.call(this);
            this._treeView.fire('collapse', this);
        };
        TBaseTreeNode.prototype._handlerCollapse = function () {
            this.element.classList.remove(mf.NODE_EXPANDED_STATE.NODE_EXPANDED);
            this.element.classList.add(mf.NODE_EXPANDED_STATE.NODE_COLLAPSED);
            this._hasChild();
        };
        TBaseTreeNode.prototype._hasChild = function () {
            if (this.nodes && this.nodes.count) {
                this._colapseLever.classList.removeMany([mf.NODE_CLASSES.NODE_LEVER_ICON_CLASS_NOCHILD, mf.NODE_CLASSES.NODE_LEVER_BUSY]);
                this._colapseLever.classList.add(mf.NODE_CLASSES.NODE_LEVER_ICON_CLASS);
                return true;
            }
            else {
                this._colapseLever.classList.removeMany([mf.NODE_CLASSES.NODE_LEVER_ICON_CLASS, mf.NODE_CLASSES.NODE_LEVER_BUSY]);
                this._colapseLever.classList.add(mf.NODE_CLASSES.NODE_LEVER_ICON_CLASS_NOCHILD);
                return false;
            }
        };
        TBaseTreeNode.prototype.select = function () {
            if (this.data) {
                this.data.selected = true;
            }
            this._element.classList.add(mf.NODE_CLASSES.NODE_SELECTED);
        };
        TBaseTreeNode.prototype.unselect = function () {
            if (this.data) {
                this.data.selected = false;
            }
            this._element.classList.remove(mf.NODE_CLASSES.NODE_SELECTED);
        };
        TBaseTreeNode.prototype.expandAll = function () {
            return this._treeView.expandAll.call(this._treeView);
        };
        TBaseTreeNode.prototype.collapseAll = function () {
            return this._treeView.collapseAll.call(this._treeView);
        };
        TBaseTreeNode.prototype.deleteNode = function () {
            this.parentNodes.removeNode.call(this.parentNodes, this);
        };
        TBaseTreeNode.prototype.addNode = function () {
            var args = arguments;
            var ret = {};
            this._createNodes();
            if (args[0] instanceof mf.TBaseTreeNode) {
                ret = this._nodes.addNode(args[0]);
            }
            if (typeof (args[0]) === 'string') {
                ret = this._nodes.addNode(args[0], args[1]);
            }
            this.data.children.push({
                caption: ret.caption,
                selected: ret.selected || false,
                expanded: ret.expanded || false,
            });
            this.expand();
        };
        TBaseTreeNode.prototype._createNodes = function () {
            if (!this._nodes) {
                this._nodes = new mf.TBaseTreeNodes({
                    parent: this.element,
                    TreeView: this._treeView
                });
            }
            return this.nodes;
        };
        Object.defineProperty(TBaseTreeNode.prototype, "parentNodes", {
            get: function () {
                return this.parent[mf.ANCESTOR_OBJ];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeNode.prototype, "data", {
            get: function () {
                if (!this._data) {
                    this._data = {};
                }
                return this._data;
            },
            set: function (val) {
                this._data = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeNode.prototype, "expanded", {
            get: function () {
                return this.data.expanded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeNode.prototype, "caption", {
            get: function () {
                return this.data.caption;
            },
            set: function (val) {
                this.data.caption = this._label.innerHTML = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeNode.prototype, "nodes", {
            get: function () {
                return this._nodes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeNode.prototype, "TreeView", {
            get: function () {
                return this._treeView;
            },
            set: function (val) {
                this._treeView = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeNode.prototype, "tag", {
            get: function () {
                return 'li';
            },
            enumerable: true,
            configurable: true
        });
        return TBaseTreeNode;
    }(mf.TBaseElement));
    mf.TBaseTreeNode = TBaseTreeNode;
})(mf || (mf = {}));
var mf;
(function (mf) {
    var TBaseTreeNodes = (function (_super) {
        __extends(TBaseTreeNodes, _super);
        function TBaseTreeNodes(options) {
            var _this = _super.call(this, options) || this;
            _this.element.setAttribute('data-role', mf.TREE_ROLE.TREE_NODES);
            return _this;
        }
        TBaseTreeNodes.prototype.addNode = function () {
            var args = arguments;
            if (args[0] instanceof mf.TBaseTreeNode) {
                args[0].TreeView = this._treeView;
                this.element.appendChild(args[0].element);
                this._treeView.all.push(args[0]);
                return args[0];
            }
            if (typeof (args[0]) === 'string') {
                var node = new mf.TBaseTreeNode(args[1]);
                node.TreeView = this._treeView;
                this.element.appendChild(node.element);
                this._treeView.all.push(node);
                return node;
            }
        };
        TBaseTreeNodes.prototype.removeNode = function (node, _selidx) {
            var _allidx = this._treeView.all.indexOf(node);
            if (!_selidx) {
                try {
                    _selidx = this._treeView.selected.indexOf(node);
                }
                catch (err) {
                    console.error(err);
                }
            }
            this.element.removeChild(node.element);
            node = null;
        };
        TBaseTreeNodes.prototype._removeNodes = function () {
            while (this.element.firstChild) {
                this.removeNode(this.element.firstChild._getObj());
            }
        };
        Object.defineProperty(TBaseTreeNodes.prototype, "nodes", {
            set: function (val) {
                if (val.length) {
                    this._removeNodes();
                    for (var i = 0; i < val.length; i++) {
                        var node = new mf.TBaseTreeNode({
                            data: val[i],
                            TreeView: this._treeView
                        });
                        this.addNode(node);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeNodes.prototype, "siblings", {
            get: function () {
                return this.element.children;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeNodes.prototype, "ownNode", {
            get: function () {
                return this.element.parentElement._getObj();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeNodes.prototype, "count", {
            get: function () {
                return this.siblings.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeNodes.prototype, "TreeView", {
            set: function (val) {
                this._treeView = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeNodes.prototype, "tag", {
            get: function () {
                return 'ul';
            },
            enumerable: true,
            configurable: true
        });
        return TBaseTreeNodes;
    }(mf.TBaseElement));
    mf.TBaseTreeNodes = TBaseTreeNodes;
})(mf || (mf = {}));
var mf;
(function (mf) {
    var TREE_ROLE;
    (function (TREE_ROLE) {
        TREE_ROLE["TREE_VIEW"] = "treeview";
        TREE_ROLE["TREE_NODES"] = "treenodes";
        TREE_ROLE["TREE_NODE"] = "treenode";
        TREE_ROLE["TREE_NODE_LEVER"] = "treenodelever";
        TREE_ROLE["TREE_NODE_CAPTION"] = "treenodecaption";
        TREE_ROLE["TREE_NODE_COUNTRY_CAPTION"] = "countrylever";
    })(TREE_ROLE = mf.TREE_ROLE || (mf.TREE_ROLE = {}));
    var TBaseTreeView = (function (_super) {
        __extends(TBaseTreeView, _super);
        function TBaseTreeView(options) {
            var _this = _super.call(this, options) || this;
            _this.all = [];
            _this._selected = [];
            _this.multiselect = false;
            var _that = _this;
            _this.element.setAttribute('data-role', TREE_ROLE.TREE_VIEW);
            _this.element.classList.add('mf-tree');
            _this._createNodes();
            document.addEventListener('keyup', function (ev) {
                _that._keyupHandler.call(_that, ev);
            });
            _this.on('contextmenu', function (ev) {
                ev.preventDefault();
                _that._contextMenuHandler.call(_that, ev);
            });
            _this.on('click', function (ev) {
                _that._clickHandler.call(_that, ev);
            });
            _this.on('dblclick', function (ev) {
                _that._dblclickHandler.call(_that, ev);
            });
            _this.on('created', function (ev) {
                _that.nodes.nodes = _that.data;
            });
            _this.fire('created');
            return _this;
        }
        TBaseTreeView.prototype._createNodes = function () {
            this._nodes = new mf.TBaseTreeNodes({ parent: this.element, TreeView: this });
            return this;
        };
        TBaseTreeView.prototype.loadTreeData = function () {
            if (this.data.length) {
                for (var i = 0; i < this.data.length; i++) {
                    var node = new mf.TBaseTreeNode({ data: this.data[i] });
                    this.nodes.addNode(node);
                }
            }
            return this;
        };
        TBaseTreeView.prototype._select = function (node) {
            if (node) {
                this._deselect();
                if (node.data.selected) {
                    node.unselect();
                }
                else {
                    node.select();
                    this._selected.push(node);
                }
            }
            return this;
        };
        TBaseTreeView.prototype._deselect = function (inode) {
            [].map.call(this._selected, function (node, idx, sel) {
                var _removed = sel.splice(idx, 1)[0];
                _removed.unselect();
            });
            return this;
        };
        TBaseTreeView.prototype.expandAll = function () {
            for (var i = 0; i < this.all.length; i++) {
                if (this.all[i].nodes) {
                    this.all[i].expand();
                }
            }
            return this;
        };
        TBaseTreeView.prototype.collapseAll = function () {
            for (var i = 0; i < this.all.length; i++) {
                if (this.all[i].nodes) {
                    this.all[i].collapse();
                }
            }
            return this;
        };
        Object.defineProperty(TBaseTreeView.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeView.prototype, "nodes", {
            get: function () {
                return this._nodes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeView.prototype, "data", {
            get: function () {
                if (!this._data) {
                    this._data = [];
                }
                return this._data;
            },
            set: function (val) {
                this._data = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeView.prototype, "tag", {
            get: function () {
                return 'div';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeView.prototype, "contextMenuMap", {
            get: function () {
                return this._contextMenuMap;
            },
            set: function (val) {
                if (val instanceof mf.TContextMenuMap) {
                    this._contextMenuMap = val;
                }
                if (isArray(val)) {
                    this._contextMenuMap = new mf.TContextMenuMap(val);
                }
                this._contextMenuMap.owner = this;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeView.prototype, "contextMenuList", {
            get: function () {
                return this._contextMenuList;
            },
            set: function (val) {
                if (val instanceof mf.TContextMenuList) {
                    this._contextMenuList = val;
                }
                if (isArray(val)) {
                    this._contextMenuList = new mf.TContextMenuList(this, val);
                }
                this._contextMenuList.owner = this;
                var _that = this;
                this.on('contentMenuExpand', function () {
                    _that._contextMenuList.collapseAll.call(_that._contextMenuList);
                });
                this.on('click', function () {
                    if (_that._contextMenuList.expanded) {
                        _that._contextMenuList.expanded.collapse();
                    }
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseTreeView.prototype, "count", {
            get: function () {
                var _nodes = this.element.querySelectorAll('li');
                return _nodes.length;
            },
            enumerable: true,
            configurable: true
        });
        TBaseTreeView.prototype.first = function () {
            return this._findNodeByIndex(0)._getObj();
        };
        TBaseTreeView.prototype.last = function () {
            return this._findNodeByIndex(this.count - 1)._getObj();
        };
        TBaseTreeView.prototype.next = function () {
            return null;
        };
        TBaseTreeView.prototype.prev = function () {
            return null;
        };
        TBaseTreeView.prototype.nextSibling = function () {
            var _sib = this.selected[0].element.nextSibling;
            if (_sib && !this.selected[0].expanded) {
                return _sib._getObj();
            }
            return null;
        };
        TBaseTreeView.prototype.prevSibling = function () {
            var _sib = this.selected[0].element.previousSibling;
            if (_sib) {
                return _sib._getObj();
            }
            return null;
        };
        TBaseTreeView.prototype._findNodeByIndex = function (idx) {
            var _nodes = this.element.querySelectorAll('li');
            return _nodes[idx];
        };
        TBaseTreeView.prototype._keyupHandler = function (ev) {
            var _that = this;
            if (ev.keyCode == 46) {
                [].map.call(this.selected, function (node, idx, selected) {
                    node.parentNodes.removeNode(node, idx);
                });
            }
            if (ev.keyCode == 36) {
                this._select(this.first());
            }
            if (ev.keyCode == 35) {
                this._select(this.last());
            }
            if (ev.keyCode == 38) {
            }
            if (ev.keyCode == 40) {
            }
        };
        TBaseTreeView.prototype._contextMenuHandler = function (ev) {
            var _expander = ev.target.closest('[data-role]');
            var _role = _expander.getAttribute('data-role');
            if (!_expander._getObj()) {
                var _obj = null;
                var _p = _expander;
                var ret = false;
                while (!ret) {
                    _p = _p.parentElement;
                    _obj = _p._getObj();
                    if (_obj instanceof mf.TBaseElement) {
                        _expander = _obj.element;
                        ret = true;
                    }
                }
            }
            if (_role) {
                var _menuName = this._contextMenuMap.getMenuByRole(_role);
                var _menu = this._contextMenuList.getMenu(_menuName);
                if (_menu) {
                    _menu.expander = _expander._getObj();
                    _menu.expand(ev);
                }
            }
        };
        TBaseTreeView.prototype._clickHandler = function (ev) {
            var node;
            if (ev.target.hasAttribute('data-role')) {
                switch (ev.target.getAttribute('data-role')) {
                    case mf.TREE_ROLE.TREE_NODE_LEVER:
                        node = ev.target.parentElement._getObj();
                        node.toggle.call(node);
                        break;
                    case mf.TREE_ROLE.TREE_NODE_CAPTION:
                    case mf.TREE_ROLE.TREE_NODE_COUNTRY_CAPTION:
                        node = ev.target.parentElement._getObj();
                        this._select(node);
                        this.fire('select', node);
                        break;
                }
            }
        };
        TBaseTreeView.prototype._dblclickHandler = function (ev) {
            if (ev.target.tagName == 'B') {
                var node = ev.target.parentElement._getObj();
                node.toggle.call(node);
            }
        };
        return TBaseTreeView;
    }(mf.TBaseElement));
    mf.TBaseTreeView = TBaseTreeView;
})(mf || (mf = {}));
