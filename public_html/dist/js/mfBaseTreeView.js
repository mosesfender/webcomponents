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
    })(NODE_CLASSES = mf.NODE_CLASSES || (mf.NODE_CLASSES = {}));
    var TBaseTreeNode = (function (_super) {
        __extends(TBaseTreeNode, _super);
        function TBaseTreeNode(options) {
            var _this = _super.call(this, options) || this;
            _this.leverIconClass = 'icon-arrow-right';
            _this.leverIconClassNoChild = 'icon-circle-o';
            _this.element.setAttribute('data-role', mf.TREE_ROLE.TREE_NODE);
            _this.caption = _this.data.caption;
            _this.data.selected = false;
            if (_this.data.children && _this.data.children.length) {
                _this._nodes = new mf.TBaseTreeNodes({
                    parent: _this.element,
                    TreeView: _this._treeView
                });
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
                this._colapseLever = Html.createElementEx('i', this.element, { 'class': this.leverIconClass, 'data-role': mf.TREE_ROLE.TREE_NODE_LEVER });
                this._label = Html.createElementEx('b', this.element, { 'data-role': mf.TREE_ROLE.TREE_NODE_CAPTION });
            }
            catch (err) {
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
            if (this.data.hasOwnProperty('children') && this.data.children.length) {
                this._colapseLever.classList.remove(this.leverIconClassNoChild);
                this._colapseLever.classList.add(this.leverIconClass);
                return true;
            }
            else {
                this._colapseLever.classList.remove(this.leverIconClass);
                this._colapseLever.classList.add(this.leverIconClassNoChild);
                return false;
            }
        };
        TBaseTreeNode.prototype.select = function () {
            this.data.selected = true;
            this._element.classList.add(mf.NODE_CLASSES.NODE_SELECTED);
        };
        TBaseTreeNode.prototype.unselect = function () {
            this.data.selected = false;
            this._element.classList.remove(mf.NODE_CLASSES.NODE_SELECTED);
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
                _selidx = this._treeView.selected.indexOf(node);
            }
            this.element.removeChild(node.element);
        };
        Object.defineProperty(TBaseTreeNodes.prototype, "nodes", {
            set: function (val) {
                if (val.length) {
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
            _this._nodes = new mf.TBaseTreeNodes({ parent: _this.element, TreeView: _this });
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
        TBaseTreeView.prototype._keyupHandler = function (ev) {
            var _that = this;
            if (ev.keyCode == 46) {
                [].map.call(this.selected, function (node, idx, selected) {
                    node.parentNodes.removeNode(node, idx);
                });
            }
        };
        TBaseTreeView.prototype._contextMenuHandler = function (ev) {
            console.log(this, ev);
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
        TBaseTreeView.prototype.loadTreeData = function () {
            if (this.data.length) {
                for (var i = 0; i < this.data.length; i++) {
                    var node = new mf.TBaseTreeNode({ data: this.data[i] });
                    this.nodes.addNode(node);
                }
            }
        };
        TBaseTreeView.prototype._select = function (node) {
            this._deselect();
            if (node.data.selected) {
                node.unselect();
            }
            else {
                node.select();
                this._selected.push(node);
            }
        };
        TBaseTreeView.prototype._deselect = function (inode) {
            [].map.call(this._selected, function (node, idx, sel) {
                var _removed = sel.splice(idx, 1)[0];
                _removed.unselect();
            });
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
        return TBaseTreeView;
    }(mf.TBaseElement));
    mf.TBaseTreeView = TBaseTreeView;
})(mf || (mf = {}));
