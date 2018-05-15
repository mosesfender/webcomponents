declare module mf {
    interface IContextMenuMapItem {
        menuName: string;
        forClass: string;
        forRole: string;
    }
    class TContextMenuMap {
        owner: mf.TBaseElement;
        protected _items: Array<mf.IContextMenuMapItem>;
        constructor(map: Array<mf.IContextMenuMapItem>);
        getMenuByClass(className: string): string;
        getMenuByRole(roleName: string): string;
        getMenu(menuName: string): IContextMenuMapItem;
    }
}
declare module mf {
    class TContextMenuList {
        owner: mf.TBaseElement;
        items: Object;
        expanded: boolean | mf.TContextMenu;
        constructor(owner?: mf.TBaseElement, options?: Object);
        addMenu(menu: mf.TContextMenu): any;
        addMenu(menu: mf.IContextMenu): any;
        addMenu(menu: Array<mf.IContextMenuItem>): any;
        getMenu(name: string): mf.TContextMenu;
        collapseAll(): void;
        readonly count: number;
    }
}
declare module mf {
    interface IContextMenuItem {
        caption: string;
        call: string;
        callType: mf.ContextMenuCall;
        cssClass: string | Array<string>;
        name: string;
        items: Array<mf.IContextMenuItem> | Array<mf.TContextMenuItem>;
    }
    const DEF_CONTEXTMENUITEM_CSSCLASS = "mf-context_menu_item";
    class TContextMenuItem extends mf.TBaseElement implements mf.IContextMenuItem {
        protected _caption: string;
        protected _captionElement: HTMLElement;
        call: string;
        callType: mf.ContextMenuCall;
        name: string;
        children: Array<mf.IContextMenuItem> | Array<mf.TContextMenuItem>;
        constructor(options: any);
        protected _innerInit(options?: Object): void;
        caption: string;
        cssClass: string | Array<string>;
        readonly items: IContextMenuItem[];
    }
}
declare module mf {
    class TContextMenuItems extends mf.TBaseElement {
        constructor(options?: any);
        static create(parent: mf.TContextMenu | mf.TContextMenuItem): TContextMenuItems;
        items: Array<mf.IContextMenuItem>;
        readonly tag: string;
    }
}
declare module mf {
    enum ContextMenuCall {
        METHOD = 1,
        URL = 2,
    }
    const DEF_CONTEXTMENU_CSSCLASS = "mf-context_menu";
    const DEF_CONTEXTMENU_ROLE = "contextmenu";
    interface IContextMenu {
        items: Array<mf.IContextMenuItem> | Array<mf.IContextMenuItem>;
        name: string;
    }
    class TContextMenu extends mf.TBaseElement implements mf.IContextMenu {
        owner: mf.TBaseElement;
        list: mf.TContextMenuList;
        expander: mf.TBaseElement;
        expanded: boolean;
        protected _items: Array<mf.IContextMenuItem>;
        name: string;
        constructor(options: any);
        protected _innerInit(options?: Object): void;
        expand(ev: MouseEvent): void;
        collapse(): void;
        readonly items: IContextMenuItem[];
    }
}
