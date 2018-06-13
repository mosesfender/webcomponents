declare module mf {
    interface ISearchIndexItem {
        str: string | Array<string>;
        node: mf.TBaseTreeNode;
    }
    type TSearchIndex = Array<mf.ISearchIndexItem>;
    class TTreeViewSearcher extends mf.TBaseElement {
        owner: mf.TBaseTreeView;
        protected _element: HTMLInputElement;
        protected _index: mf.TSearchIndex;
        protected _searchedNodes: mf.TSearchIndex;
        constructor(options?: any);
        protected _innerInit(options: any): void;
        addIndex(item: mf.ISearchIndexItem): void;
        _setFind(_item: mf.ISearchIndexItem): void;
        _setUnfinded(_item: mf.ISearchIndexItem): void;
        _clearFindRes(all?: boolean): void;
        findTitleInNodes(ttl: string | Array<string>): boolean;
        protected overlapWord(word: string, origin: string | Array<string>): boolean;
        protected overlapWordFromLeft(word: string, origin: string | Array<string>): boolean;
        protected overlapWordFromRight(word: string, origin: string | Array<string>): boolean;
        protected overlapSearch(word: string, origin: string | Array<string>): boolean;
        readonly TreeView: TBaseTreeView;
    }
}
declare module mf {
    class TStatusBar extends mf.TBaseElement {
        constructor(options?: any);
        protected _innerInit(options?: any): void;
        clear(): void;
        text: string;
    }
}
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
        expandAfterCreate: boolean;
        constructor(options: any);
        destroy(): this;
        protected onAfterDraw(obj: mf.TBaseTreeNode): void;
        protected _innerInit(): void;
        busy(val: boolean): void;
        toggle(): void;
        expand(): void;
        _handlerExpand(): void;
        collapse(): void;
        _handlerCollapse(): void;
        protected _hasChild(): boolean;
        select(): void;
        unselect(): void;
        expandAll(): any;
        collapseAll(): any;
        deleteNode(): void;
        addNode(node: mf.TBaseTreeNode): any;
        addNode(label: string, data: mf.IBaseNodeData): any;
        protected _createNodes(): TBaseTreeNodes;
        loadChildren(): void;
        expandChilds(): void;
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
        protected _clearBeforeFill: boolean;
        constructor(options: any);
        addNode(node: mf.TBaseTreeNode): any;
        addNode(node: mf.ISearchIndexItem): any;
        addNode(label: string, data: mf.IBaseNodeData): any;
        removeNode(node: mf.TBaseTreeNode, _selidx?: number): void;
        protected _removeNodes(): void;
        getNode(idx: number): TBaseElement;
        nodes: Array<mf.IBaseNodeData>;
        readonly siblings: HTMLCollection;
        readonly ownNode: TBaseTreeNode;
        readonly count: number;
        TreeView: mf.TBaseTreeView;
        readonly tag: string;
        clearBeforeFill: boolean;
        readonly isTopLevel: boolean;
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
        protected _wrap: HTMLElement;
        protected _nodes: TBaseTreeNodes;
        protected _data: Array<mf.IBaseNodeData>;
        all: mf.TSearchIndex;
        protected _selected: Array<mf.TBaseTreeNode>;
        multiselect: boolean;
        protected _contextMenuList: mf.TContextMenuList;
        protected _contextMenuMap: mf.TContextMenuMap;
        searcher: mf.TTreeViewSearcher;
        status: mf.TStatusBar;
        constructor(options: any);
        protected _onAfterCreateNodeHandler(_node: mf.TBaseTreeNode): void;
        protected _onAfterLoadChildsHandler(_node: mf.TBaseTreeNode): void;
        protected _createNodes(): this;
        loadTreeData(): this;
        select(node: mf.TBaseTreeNode): void;
        protected _select(node: mf.TBaseTreeNode, ctrl?: boolean): this;
        protected _deselect(inode?: mf.TBaseTreeNode, ctrl?: boolean): any;
        expandAll(): this;
        collapseAll(): this;
        recheckAll(): void;
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
        _clickHandler(ev: MouseEvent): void;
        protected _dblclickHandler(ev: Event): void;
        recursiveExpand(node: mf.TBaseTreeNode): void;
        recursiveParents(node: mf.TBaseTreeNode): any[];
        statusPath(node: mf.TBaseTreeNode): void;
        rewriteAll(): this;
        clearAll(): this;
    }
}
