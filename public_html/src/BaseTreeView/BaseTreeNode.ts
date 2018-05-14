module mf {
    export interface IBaseNodeData {
        caption: string,
        expanded?: boolean,
        selected?: boolean,
        children?: Array<IBaseNodeData>
    }

    export enum NODE_EXPANDED_STATE {
        NODE_EXPANDED = 'expanded',
        NODE_COLLAPSED = 'collapsed',
        NODE_NOCHILD = 'nochild',
    }

    export enum NODE_CLASSES {
        NODE_SELECTED = 'selected',
    }

    export class TBaseTreeNode extends mf.TBaseElement {
        public leverIconClass: string = 'icon-arrow-right';
        public leverIconClassNoChild: string = 'icon-circle-o';
        protected _treeView: mf.TBaseTreeView;
        protected _nodes: TBaseTreeNodes;
        protected _label: HTMLElement;
        protected _colapseLever: HTMLElement;
        protected _data: mf.IBaseNodeData;

        constructor(options) {
            super(options);
            this.element.setAttribute('data-role', TREE_ROLE.TREE_NODE);
            this.caption = this.data.caption;

            this.data.selected = false;
            if (this.data.children && this.data.children.length) {
                this._nodes = new mf.TBaseTreeNodes({
                    parent: this.element,
                    TreeView: this._treeView
                });
                this._nodes.nodes = this.data.children;

                /** Collapse or expand at data expanded value */
                this.data.expanded ? this._handlerExpand.call(this) : this._handlerCollapse.call(this);
            } else {
                this.data.children = [];
            }
            this._hasChild();
        }

        protected _innerInit() {
            try {
                this._colapseLever = Html.createElementEx('i', this.element, {'class': this.leverIconClass, 'data-role': mf.TREE_ROLE.TREE_NODE_LEVER}) as HTMLElement;
                this._label = Html.createElementEx('b', this.element, {'data-role': mf.TREE_ROLE.TREE_NODE_CAPTION}) as HTMLElement;
            } catch (err) {

            }
        }

        public toggle() {
            if (this.expanded) {
                this.collapse();
            } else {
                this.expand();
            }
        }

        public expand() {
            this._data.expanded = true;
            this._handlerExpand.call(this);
            this._treeView.fire('expand', this);
        }

        protected _handlerExpand() {
            this.element.classList.remove(mf.NODE_EXPANDED_STATE.NODE_COLLAPSED);
            this.element.classList.add(mf.NODE_EXPANDED_STATE.NODE_EXPANDED);
            this._hasChild();
        }

        public collapse() {
            this._data.expanded = false;
            this._handlerCollapse.call(this);
            this._treeView.fire('collapse', this);
        }

        protected _handlerCollapse() {
            this.element.classList.remove(mf.NODE_EXPANDED_STATE.NODE_EXPANDED);
            this.element.classList.add(mf.NODE_EXPANDED_STATE.NODE_COLLAPSED);
            this._hasChild();
        }

        protected _hasChild() {
            if (this.data.hasOwnProperty('children') && this.data.children.length) {
                this._colapseLever.classList.remove(this.leverIconClassNoChild);
                this._colapseLever.classList.add(this.leverIconClass);
                return true;
            } else {
                this._colapseLever.classList.remove(this.leverIconClass);
                this._colapseLever.classList.add(this.leverIconClassNoChild);
                return false;
            }
        }

        public select() {
            this.data.selected = true;
            this._element.classList.add(mf.NODE_CLASSES.NODE_SELECTED);
        }

        public unselect() {
            this.data.selected = false;
            this._element.classList.remove(mf.NODE_CLASSES.NODE_SELECTED);
        }

        public addNode(node: mf.TBaseTreeNode);
        public addNode(label: string, data: mf.IBaseNodeData);
        public addNode() {
            let args = arguments;
            let ret = <mf.IBaseNodeData> {};
            this._createNodes();
            if (args[0] instanceof mf.TBaseTreeNode) {
                ret = this._nodes.addNode(args[0] as mf.TBaseTreeNode);
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
        }

        protected _createNodes() {
            if (!this._nodes) {
                this._nodes = new mf.TBaseTreeNodes({
                    parent: this.element,
                    TreeView: this._treeView
                });
            }
            return this.nodes;
        }



        public get parentNodes() {
            return this.parent[mf.ANCESTOR_OBJ] as mf.TBaseTreeNodes;
        }

        public set data(val: mf.IBaseNodeData) {
            this._data = val;
        }

        public get data() {
            if (!this._data) {
                this._data = <mf.IBaseNodeData> {};
            }
            return this._data;
        }

        public get expanded() {
            return this.data.expanded;
        }

        public get caption() {
            return this.data.caption;
        }

        public set caption(val: string) {
            this.data.caption = this._label.innerHTML = val;
        }

        public get nodes() {
            return this._nodes;
        }

        public set TreeView(val: mf.TBaseTreeView) {
            this._treeView = val;
        }

        public get tag() {
            return 'li';
        }
    }
}