declare module mf {
    enum ContextMenuCall {
        METHOD = 1,
        URL = 2,
    }
    interface IContextMenuItem {
        caption: string;
        call: string;
        callType: mf.ContextMenuCall;
        cssClass: string;
        name: string;
        children: Array<mf.IContextMenuItem> | Array<mf.TContextMenuItem>;
    }
    class TContextMenu extends mf.TBaseElement {
        protected _items: Array<mf.IContextMenuItem>;
        constructor(options: any);
        protected _innerInit(options?: Object): void;
        protected _createItems(items: Array<mf.IContextMenuItem>): void;
        items: Array<mf.IContextMenuItem>;
    }
    class TContextMenuItems extends mf.TBaseElement {
    }
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
    }
}
