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
        NODE_LEVER_ICON_CLASS = 'icon-arrow-right2',
        NODE_LEVER_ICON_CLASS_NOCHILD = 'icon-radio-unchecked',
        NODE_LEVER_BUSY = 'icon-spinner9',
    }

    /**
     * <Self triggers>
     * 
     * onAfterDraw
     * 
     * <TreeView triggers>
     * 
     * onAfterDrawNode
     * onAfterCreateNode
     * onAfterLoadChilds
     * 
     */

    export class TBaseTreeNode extends mf.TBaseElement {
        protected _treeView: mf.TBaseTreeView;
        protected _nodes: TBaseTreeNodes;
        protected _label: HTMLElement;
        protected _colapseLever: HTMLElement;
        protected _data: mf.IBaseNodeData;
        
        public expandAfterCreate: boolean;

        constructor(options) {
            super(options);
            
            if (this.expandAfterCreate == undefined){
                this.expandAfterCreate = false;
            }

            this.element.setAttribute('data-role', TREE_ROLE.TREE_NODE);
            this.caption = this.data.caption;

            this.fire('onAfterDraw', this);
            this.TreeView.fire('onAfterDrawNode', this);
            this.onAfterDraw.call(this, this);

            this.data.selected = false;
            if (this.data.children && this.data.children.length) {
                this._createNodes();
                this._nodes.nodes = this.data.children;

                /** Collapse or expand at data expanded value */
                this.data.expanded ? this._handlerExpand.call(this) : this._handlerCollapse.call(this);
            } else {
                this.data.children = [];
            }

            this._hasChild();
            this._treeView.fire('onAfterCreateNode', this);
        }
        
        destroy(){
            return super.destroy();
        }
        
        protected onAfterDraw(obj: mf.TBaseTreeNode) {}

        protected _innerInit() {
            try {
                this._data = <mf.IBaseNodeData> {};
                this._colapseLever = Html.createElementEx('i', this.element, {'class': mf.NODE_CLASSES.NODE_LEVER_ICON_CLASS, 'data-role': mf.TREE_ROLE.TREE_NODE_LEVER}) as HTMLElement;
                this._label = Html.createElementEx('b', this.element, {'data-role': mf.TREE_ROLE.TREE_NODE_CAPTION}) as HTMLElement;
            } catch (err) {

            }
        }

        public busy(val: boolean) {
            if (val) {
                this._colapseLever.classList.removeMany([mf.NODE_CLASSES.NODE_LEVER_ICON_CLASS_NOCHILD, mf.NODE_CLASSES.NODE_LEVER_ICON_CLASS]);
                this._colapseLever.classList.add(mf.NODE_CLASSES.NODE_LEVER_BUSY);
            } else {
                this._hasChild();
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

        public _handlerExpand() {
            this.element.classList.remove(mf.NODE_EXPANDED_STATE.NODE_COLLAPSED);
            this.element.classList.add(mf.NODE_EXPANDED_STATE.NODE_EXPANDED);
            this._hasChild();
        }

        public collapse() {
            this._data.expanded = false;
            this._handlerCollapse.call(this);
            this._treeView.fire('collapse', this);
        }

        public _handlerCollapse() {
            this.element.classList.remove(mf.NODE_EXPANDED_STATE.NODE_EXPANDED);
            this.element.classList.add(mf.NODE_EXPANDED_STATE.NODE_COLLAPSED);
            this._hasChild();
        }

        protected _hasChild() {
            if (this.nodes && this.nodes.count) {
                this._colapseLever.classList.removeMany([mf.NODE_CLASSES.NODE_LEVER_ICON_CLASS_NOCHILD, mf.NODE_CLASSES.NODE_LEVER_BUSY]);
                this._colapseLever.classList.add(mf.NODE_CLASSES.NODE_LEVER_ICON_CLASS);
                return true;
            } else {
                this._colapseLever.classList.removeMany([mf.NODE_CLASSES.NODE_LEVER_ICON_CLASS, mf.NODE_CLASSES.NODE_LEVER_BUSY]);
                this._colapseLever.classList.add(mf.NODE_CLASSES.NODE_LEVER_ICON_CLASS_NOCHILD);
                return false;
            }
        }

        public select() {
            if (this.data) {
                this.data.selected = true;
            }
            this._element.classList.add(mf.NODE_CLASSES.NODE_SELECTED);
            this._treeView.fire('onSelectNode', this);
        }

        public unselect() {
            if (this.data) {
                this.data.selected = false;
            }
            this._element.classList.remove(mf.NODE_CLASSES.NODE_SELECTED);
        }

        public expandAll() {
            return this._treeView.expandAll.call(this._treeView);
        }

        public collapseAll() {
            return this._treeView.collapseAll.call(this._treeView);
        }

        public deleteNode() {
            this.parentNodes.removeNode.call(this.parentNodes, this);
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
                    TreeView: this._treeView,
                    expandAfterCreate: this.expandAfterCreate
                });
            }
            return this.nodes;
        }
        
        public loadChildren(){
            this._treeView.fire('onAfterLoadChilds');
        }

        public expandChilds(){
            this.expandAfterCreate = true;
            this.expand();
        }

        public get parentNodes() {
            if (this.parent){
                return this.parent[mf.ANCESTOR_OBJ] as mf.TBaseTreeNodes;
            }else{
                return null;
            }
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

        public get TreeView() {
            return this._treeView;
        }

        public get tag() {
            return 'li';
        }
    }
}