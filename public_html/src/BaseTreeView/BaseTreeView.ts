//import {TBaseElement} from "../BaseElement/index";
module mf {
    export interface INodesExplore {
        first(): mf.TBaseTreeNode;
        last(): mf.TBaseTreeNode;
        next(): mf.TBaseTreeNode;
        prev(): mf.TBaseTreeNode;
        nextSibling(): mf.TBaseTreeNode;
        prevSibling(): mf.TBaseTreeNode;
    }

    export enum TREE_ROLE {
        TREE_VIEW = 'treeview',
        TREE_NODES = 'treenodes',
        TREE_NODE = 'treenode',
        TREE_NODE_LEVER = 'treenodelever',
        TREE_NODE_CAPTION = 'treenodecaption',
        TREE_NODE_COUNTRY_CAPTION = 'countrylever',
        TREE_NODE_GEONAME_CAPTION = 'geonamelever',
    }

    /**
     * Events:
     * 
     * created(* TBaseTreeView)
     * select(* TBaseTreeNode)
     * expand(* TBaseTreeNode)
     * collapse(* TBaseTreeNode)
     */
    export class TBaseTreeView extends mf.TBaseDataElement implements mf.INodesExplore {
        protected _wrap: HTMLElement;

        protected _nodes: TBaseTreeNodes;
        protected _data: Array<mf.IBaseNodeData>;
        public all: mf.TSearchIndex = [];
        protected _selected: Array<mf.TBaseTreeNode> = [];
        public multiselect: boolean;

        protected _contextMenuList: mf.TContextMenuList;
        protected _contextMenuMap: mf.TContextMenuMap;

        public searcher: mf.TTreeViewSearcher;
        public status: mf.TStatusBar;

        constructor(options) {
            super(options);
            let _that = this;
            (this.element as HTMLElement).setAttribute('data-role', TREE_ROLE.TREE_VIEW);
            (this.element as HTMLElement).classList.add('mf-tree');

            this._wrap = Html.createElementEx('div', this._element.parentElement, {
                'data-role': 'wrapper',
            }) as HTMLElement;


            let _searcherOptions = {};
            _searcherOptions['parent'] = this._wrap;
            _searcherOptions['owner'] = this;
            if (options['searcher']) {
                Objects.extend(_searcherOptions, options['searcher']);
            }
            this.searcher = new mf.TTreeViewSearcher(_searcherOptions);
            this._wrap.appendChild(this.parent.removeChild(this._element));

            this._createNodes();

            let _statusOptions = {};
            _statusOptions['parent'] = this._wrap;
            _statusOptions['owner'] = this;
            if (options['status']) {
                Objects.extend(_statusOptions, options['status']);
            }
            this.status = new mf.TStatusBar(_statusOptions);

            document.addEventListener('keyup', function (ev: Event) {
                //                _that._keyupHandler.call(_that, ev);
            });

            this.on('contextmenu', function (ev: Event) {
                ev.preventDefault();
                _that._contextMenuHandler.call(_that, ev);
            });

            this.on('click', function (ev: Event) {
                //_that._clickHandler.call(_that, ev);
            });

            this.on('dblclick', function (ev: Event) {
                _that._dblclickHandler.call(_that, ev);
            });

            this.on('created', function (ev: Event) {
                _that.nodes.nodes = _that.data;
                //_that.loadTreeData.call(_that);
            });

            this.on('onAfterCreateNode', function (ev: CustomEvent) {
                _that._onAfterCreateNodeHandler.call(_that, ev.detail);
            });

            this.on('onAfterLoadChilds', function (ev: CustomEvent) {
                _that._onAfterCreateNodeHandler.call(_that);
            });

            this.on('onSelectNode', function (ev: CustomEvent) {
                _that.statusPath(ev.detail);
            });

            this.fire('created');
        }

        protected _onAfterCreateNodeHandler(_node: mf.TBaseTreeNode) {
            //            if (this.searcher) {
            //                this.searcher.addIndex({str: _node.caption, node: _node});
            //            }
        }

        protected _onAfterLoadChildsHandler(_node: mf.TBaseTreeNode) {

        }

        protected _createNodes() {
            this._nodes = new mf.TBaseTreeNodes({parent: this.element, TreeView: this});
            return this;
        }

        public loadTreeData() {
            if (this.data.length) {
                for (let i = 0; i < this.data.length; i++) {
                    let node = new mf.TBaseTreeNode({data: this.data[i]});
                    this.nodes.addNode(node);
                }
            }
            return this;
        }

        public select(node: mf.TBaseTreeNode) {
            this._select(node);
        }

        protected _select(node: mf.TBaseTreeNode, ctrl?: boolean) {
            if (node) {
                if (!(this.multiselect && ctrl)) {
                    this._deselect();
                }
                if (node.data.selected) {
                    this._deselect(node, ctrl);
                } else {
                    node.select();
                    this._selected.push(node);
                }
            }
            return this;
        }

        protected _deselect(inode?: mf.TBaseTreeNode, ctrl?: boolean) {
            let _removed;
            let _that = this;
            let idx = 0;
            while (_that._selected.length) {
                if (_that.multiselect && ctrl) {
                    if (inode && inode == _that._selected[idx]) {
                        _removed = _that._selected.splice(idx, 1)[0] as mf.TBaseTreeNode;
                        return _removed.unselect();
                    }
                } else {
                    _removed = _that._selected.splice(0, 1)[0] as mf.TBaseTreeNode;
                    _removed.unselect();
                }
                idx++;
            }
            return this;
        }

        public expandAll() {
            for (let i = 0; i < this.all.length; i++) {
                if (this.all[i].node.nodes) {
                    this.all[i].node.expand();
                }
            }
            return this;
        }

        public collapseAll() {
            for (let i = 0; i < this.all.length; i++) {
                if (this.all[i].node.nodes) {
                    this.all[i].node.collapse();
                }
            }
            return this;
        }

        public recheckAll() {
            this.all = [];
            let _els = this._element.querySelectorAll('li');
            for (let i = 0; i < _els.length; i++) {
                this.all.push({
                    str: (_els[i]._getObj() as mf.TBaseTreeNode).data.caption,
                    node: _els[i]._getObj() as mf.TBaseTreeNode
                });
            }
        }

        public get selected() {
            return this._selected;
        }

        public get nodes() {
            return this._nodes;
        }

        public set data(val: Array<mf.IBaseNodeData>) {
            this._data = val;
        }

        public get data() {
            if (!this._data) {
                this._data = [];
            }
            return this._data;
        }

        public get tag() {
            return 'div';
        }

        public set contextMenuMap(val: mf.TContextMenuMap | Array<mf.IContextMenuMapItem>) {
            if (val instanceof mf.TContextMenuMap) {
                this._contextMenuMap = val;
            }
            if (isArray(val)) {
                this._contextMenuMap = new mf.TContextMenuMap(val as Array<mf.IContextMenuMapItem>);
            }
            this._contextMenuMap.owner = this;
        }

        public get contextMenuMap() {
            return this._contextMenuMap;
        }

        public set contextMenuList(val: mf.TContextMenuList | Array<mf.IContextMenu>) {
            if (val instanceof mf.TContextMenuList) {
                this._contextMenuList = val;
            }
            if (isArray(val)) {
                this._contextMenuList = new mf.TContextMenuList(this, val as Array<mf.IContextMenu>);
            }
            this._contextMenuList.owner = this;
            let _that = this;
            /* collapse all context menus handler */
            this.on('contentMenuExpand', function () {
                _that._contextMenuList.collapseAll.call(_that._contextMenuList);
            });
            this.on('click', function () {
                if (_that._contextMenuList.expanded) {
                    (_that._contextMenuList.expanded as mf.TContextMenu).collapse();
                }
            });
        }

        public get contextMenuList() {
            return this._contextMenuList;
        }

        public get count() {
            let _nodes = (this.element as HTMLElement).querySelectorAll('li');
            return _nodes.length;
        }

        public first(): mf.TBaseTreeNode {
            return this._findNodeByIndex(0)._getObj() as mf.TBaseTreeNode;
        }

        public last(): mf.TBaseTreeNode {
            return this._findNodeByIndex(this.count - 1)._getObj() as mf.TBaseTreeNode;
        }

        public next(): mf.TBaseTreeNode {
            return null;
        }

        public prev(): mf.TBaseTreeNode {
            return null;
        }

        public nextSibling(): mf.TBaseTreeNode {
            let _sib = (this.selected[0].element as HTMLElement).nextSibling as HTMLElement;
            if (_sib && !this.selected[0].expanded) {
                return _sib._getObj() as mf.TBaseTreeNode;
            }
            return null;
        }

        public prevSibling(): mf.TBaseTreeNode {
            let _sib = (this.selected[0].element as HTMLElement).previousSibling as HTMLElement;
            if (_sib) {
                return _sib._getObj() as mf.TBaseTreeNode;
            }
            return null;
        }

        private _findNodeByIndex(idx: number) {
            try {
                let _nodes = (this.element as HTMLElement).querySelectorAll('li');
                return _nodes[idx];
            } catch (err) {
                //console.error(err);
            }
        }

        protected _keyupHandler(ev: KeyboardEvent) {
            let _that = this;
            //console.log(ev.keyCode);
            if (ev.keyCode == 46) {
                /* delete key */
                [].map.call(this.selected, function (node: mf.TBaseTreeNode,
                    idx: number, selected: Array<mf.TBaseTreeNode>) {
                    node.parentNodes.removeNode(node, idx);
                });
            }
            if (ev.keyCode == 36) {
                /* home key */
                this._select(this.first());
            }
            if (ev.keyCode == 35) {
                /* end key */
                this._select(this.last());
            }
            if (ev.keyCode == 38) {
                /* top arrow */
                //                if (!this.selected.length) {
                //                    this._select(this.first());
                //                } else {
                //                    if (this.selected[0].element)
                //                    this._select(this.prev());
                //                }
            }
            if (ev.keyCode == 40) {
                /* bottom arrow */
                //                if (!this.selected.length) {
                //                    this._select(this.last());
                //                } else {
                //                    this._select(this.next());
                //                }
            }
        }

        protected _contextMenuHandler(ev: Event) {
            let _expander = (ev.target as HTMLElement).closest('[data-role]') as HTMLElement;
            let _role = _expander.getAttribute('data-role');
            if (!_expander._getObj()) {
                let _obj = null;
                let _p = _expander;
                let ret = false;
                while (!ret) {
                    _p = _p.parentElement;
                    _obj = _p._getObj();
                    if (_obj instanceof mf.TBaseElement) {
                        _expander = _obj.element as HTMLElement;
                        ret = true;
                    }
                }
            }
            if (_role) {
                let _menuName = this._contextMenuMap.getMenuByRole(_role);
                let _menu = this._contextMenuList.getMenu(_menuName);
                if (_menu) {
                    _menu.expander = _expander._getObj();
                    _menu.expand(ev as MouseEvent);
                }
            }
        }

        public _clickHandler(ev: MouseEvent) {
            let node;
            if ((ev.target as HTMLElement).hasAttribute('data-role')) {
                switch ((ev.target as HTMLElement).getAttribute('data-role')) {
                    case mf.TREE_ROLE.TREE_NODE_LEVER:
                        node = (ev.target as HTMLElement).parentElement._getObj() as mf.TBaseTreeNode;
                        node.toggle.call(node);
                        break;

                    case mf.TREE_ROLE.TREE_NODE_CAPTION:
                    case mf.TREE_ROLE.TREE_NODE_COUNTRY_CAPTION:
                    case mf.TREE_ROLE.TREE_NODE_GEONAME_CAPTION:
                        node = (ev.target as HTMLElement).parentElement._getObj() as mf.TBaseTreeNode;
                        this._select(node, ev.ctrlKey);
                        break;
                }
            }
        }

        protected _dblclickHandler(ev: Event) {
            if ((ev.target as HTMLElement).tagName == 'B') {
                let node = (ev.target as HTMLElement).parentElement._getObj() as mf.TBaseTreeNode;
                node.toggle.call(node);
            }
        }

        public recursiveExpand(node: mf.TBaseTreeNode) {
            let _node = node;
            while (_node) {
                try {
                    if (_node.parentNodes) {
                        if (!_node.parentNodes.isTopLevel) {
                            _node = _node.parentNodes.ownNode;
                        } else {
                            _node = null;
                        }
                        _node._handlerExpand();
                        _node.element.classList.remove('hidden');
                    } else {
                        _node = null;
                    }
                } catch (err) {
                    //console.error(err);
                }
            }
        }

        public recursiveParents(node: mf.TBaseTreeNode) {
            let _node = node;
            let _ret = [];
            while (_node) {
                try {
                    if (_node.parentNodes) {
                        if (!_node.parentNodes.isTopLevel) {
                            _ret.push(_node);
                            _node = _node.parentNodes.ownNode;
                        } else {
                            _ret.push(_node);
                            _node = null;
                        }
                    } else {
                        _node = null;
                    }
                } catch (err) {
                    //console.error(err);
                }
            }
            return _ret.reverse();
        }

        public statusPath(node: mf.TBaseTreeNode) {
            let _path = this.recursiveParents(node);
            let _arr: Array<string> = [];
            [].map.call(_path, function (_node: mf.TBaseTreeNode) {
                _arr.push(_node.caption);
            });
            this.status.text = _arr.join('/');
        }

        public rewriteAll() {
            let _that = this;
            this.clearAll();
            [].map.call(this.element.querySelectorAll('li'), function (_li: HTMLElement) {
                let _node = _li._getObj() as mf.TBaseTreeNode;
                _that.all.push(<mf.ISearchIndexItem> {node: _node, str: [_node.caption]});
            });
            return this;
        }

        public clearAll() {
            this.all = [];
            return this;
        }
    }
}