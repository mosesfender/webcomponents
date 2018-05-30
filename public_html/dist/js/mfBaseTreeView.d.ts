declare module mf {
    interface IBaseNodeData {
        caption: string;
        expanded?: boolean;
        selected?: boolean;
        children?: Array<IBaseNodeData>;
    }
    enum NODE_EXPANDED_STATE {
        NODE_EXPANDED = "expanded",
        NODE_COLLAPSED = "collapsed",
        NODE_NOCHILD = "nochild",
    }
    enum NODE_CLASSES {
        NODE_SELECTED = "selected",
        NODE_LEVER_ICON_CLASS = "icon-arrow-right2",
        NODE_LEVER_ICON_CLASS_NOCHILD = "icon-radio-unchecked",
        NODE_LEVER_BUSY = "icon-spinner9",
    }
    class TBaseTreeNode extends mf.TBaseElement {
        protected _treeView: mf.TBaseTreeView;
        protected _nodes: TBaseTreeNodes;
        protected _label: HTMLElement;
        protected _colapseLever: HTMLElement;
        protected _data: mf.IBaseNodeData;
        constructor(options: any);
        protected onAfterDraw(obj: mf.TBaseTreeNode): void;
        protected _innerInit(): void;
        busy(val: boolean): void;
        toggle(): void;
        expand(): void;
        protected _handlerExpand(): void;
        collapse(): void;
        protected _handlerCollapse(): void;
        protected _hasChild(): boolean;
        select(): void;
        unselect(): void;
        expandAll(): any;
        collapseAll(): any;
        deleteNode(): void;
        addNode(node: mf.TBaseTreeNode): any;
        addNode(label: string, data: mf.IBaseNodeData): any;
        protected _createNodes(): TBaseTreeNodes;
        readonly parentNodes: TBaseTreeNodes;
        data: mf.IBaseNodeData;
        readonly expanded: boolean;
        caption: string;
        readonly nodes: TBaseTreeNodes;
        TreeView: mf.TBaseTreeView;
        readonly tag: string;
    }
}
declare module mf {
    class TBaseTreeNodes extends mf.TBaseElement {
        protected _treeView: mf.TBaseTreeView;
        constructor(options: any);
        addNode(node: mf.TBaseTreeNode): any;
        addNode(label: string, data: mf.IBaseNodeData): any;
        removeNode(node: mf.TBaseTreeNode, _selidx?: number): void;
        protected _removeNodes(): void;
        nodes: Array<mf.IBaseNodeData>;
        readonly siblings: HTMLCollection;
        readonly ownNode: TBaseTreeNode;
        readonly count: number;
        TreeView: mf.TBaseTreeView;
        readonly tag: string;
    }
}
declare module mf {
    interface INodesExplore {
        first(): mf.TBaseTreeNode;
        last(): mf.TBaseTreeNode;
        next(): mf.TBaseTreeNode;
        prev(): mf.TBaseTreeNode;
        nextSibling(): mf.TBaseTreeNode;
        prevSibling(): mf.TBaseTreeNode;
    }
    enum TREE_ROLE {
        TREE_VIEW = "treeview",
        TREE_NODES = "treenodes",
        TREE_NODE = "treenode",
        TREE_NODE_LEVER = "treenodelever",
        TREE_NODE_CAPTION = "treenodecaption",
        TREE_NODE_COUNTRY_CAPTION = "countrylever",
        TREE_NODE_GEONAME_CAPTION = "geonamelever",
    }
    class TBaseTreeView extends mf.TBaseDataElement implements mf.INodesExplore {
        protected _nodes: TBaseTreeNodes;
        protected _data: Array<mf.IBaseNodeData>;
        all: Array<mf.TBaseTreeNode>;
        protected _selected: Array<mf.TBaseTreeNode>;
        multiselect: boolean;
        protected _contextMenuList: mf.TContextMenuList;
        protected _contextMenuMap: mf.TContextMenuMap;
        constructor(options: any);
        protected _createNodes(): this;
        loadTreeData(): this;
        select(node: mf.TBaseTreeNode): void;
        protected _select(node: mf.TBaseTreeNode): this;
        protected _deselect(inode?: mf.TBaseTreeNode): this;
        expandAll(): this;
        collapseAll(): this;
        readonly selected: TBaseTreeNode[];
        readonly nodes: TBaseTreeNodes;
        data: Array<mf.IBaseNodeData>;
        readonly tag: string;
        contextMenuMap: mf.TContextMenuMap | Array<mf.IContextMenuMapItem>;
        contextMenuList: mf.TContextMenuList | Array<mf.IContextMenu>;
        readonly count: number;
        first(): mf.TBaseTreeNode;
        last(): mf.TBaseTreeNode;
        next(): mf.TBaseTreeNode;
        prev(): mf.TBaseTreeNode;
        nextSibling(): mf.TBaseTreeNode;
        prevSibling(): mf.TBaseTreeNode;
        private _findNodeByIndex(idx);
        protected _keyupHandler(ev: KeyboardEvent): void;
        protected _contextMenuHandler(ev: Event): void;
        protected _clickHandler(ev: Event): void;
        protected _dblclickHandler(ev: Event): void;
    }
}
