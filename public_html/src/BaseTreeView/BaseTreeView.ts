//import {TBaseElement} from "../BaseElement/index";
module mf {
    export enum TREE_ROLE {
        TREE_VIEW = 'treeview',
        TREE_NODES = 'treenodes',
        TREE_NODE = 'treenode',
        TREE_NODE_LEVER = 'treenodelever',
        TREE_NODE_CAPTION = 'treenodecaption',
    }

    /**
     * Events:
     * 
     * created(* TBaseTreeView)
     * select(* TBaseTreeNode)
     * expand(* TBaseTreeNode)
     * collapse(* TBaseTreeNode)
     */
    export class TBaseTreeView extends mf.TBaseElement {
        protected _nodes: TBaseTreeNodes;
        protected _data: Array<mf.IBaseNodeData>;
        public all: Array<mf.TBaseTreeNode> = [];
        protected _selected: Array<mf.TBaseTreeNode> = [];
        public multiselect: boolean = false;

        constructor(options) {
            super(options);
            let _that = this;

            this.element.setAttribute('data-role', TREE_ROLE.TREE_VIEW);
            this.element.classList.add('mf-tree');
            this._nodes = new mf.TBaseTreeNodes({parent: this.element, TreeView: this});

            document.addEventListener('keyup', function (ev: Event) {
                _that._keyupHandler.call(_that, ev);
            });

            this.on('contextmenu', function (ev: Event) {
                ev.preventDefault();
                _that._contextMenuHandler.call(_that, ev);
            });

            this.on('click', function (ev: Event) {
                _that._clickHandler.call(_that, ev);
            });

            this.on('dblclick', function (ev: Event) {
                _that._dblclickHandler.call(_that, ev);
            });

            this.on('created', function (ev: Event) {
                _that.nodes.nodes = _that.data;
                //_that.loadTreeData.call(_that);
            });

            this.fire('created');
        }

        protected _keyupHandler(ev: KeyboardEvent) {
            let _that = this;
            if (ev.keyCode == 46) {
                [].map.call(this.selected, function (node: mf.TBaseTreeNode,
                    idx: number, selected: Array<mf.TBaseTreeNode>) {
                        node.parentNodes.removeNode(node, idx);
                });
            }
        }

        protected _contextMenuHandler(ev: Event) {
            console.log(this, ev);
        }

        protected _clickHandler(ev: Event) {
            let node;
            if ((ev.target as HTMLElement).hasAttribute('data-role')) {
                switch ((ev.target as HTMLElement).getAttribute('data-role')) {
                    case mf.TREE_ROLE.TREE_NODE_LEVER:
                        node = (ev.target as HTMLElement).parentElement._getObj() as mf.TBaseTreeNode;
                        node.toggle.call(node);
                        break;
                        
                    case mf.TREE_ROLE.TREE_NODE_CAPTION:
                        node = (ev.target as HTMLElement).parentElement._getObj() as mf.TBaseTreeNode;
                        this._select(node);
                        this.fire('select', node);
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

        public loadTreeData() {
            if (this.data.length) {
                for (let i = 0; i < this.data.length; i++) {
                    let node = new mf.TBaseTreeNode({data: this.data[i]});
                    this.nodes.addNode(node);
                }
            }
        }

        protected _select(node: mf.TBaseTreeNode) {
            this._deselect();
            if (node.data.selected) {
                node.unselect();
            } else {
                node.select();
                this._selected.push(node);
            }
        }

        protected _deselect(inode?: mf.TBaseTreeNode) {
            [].map.call(this._selected, function (node: mf.TBaseTreeNode, idx: number, sel: Array<mf.TBaseTreeNode>) {
                let _removed = sel.splice(idx, 1)[0] as mf.TBaseTreeNode;
                _removed.unselect();
            });
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
    }
}