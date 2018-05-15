declare module mf {
    const ATTRIBUTE_ANCESTOR = "data-ancestor";
    const MAIN_ANCESTOR = "mfElement";
    const ANCESTOR_OBJ = "__obj";
    class TBaseElement {
        protected _cssClass: string;
        protected _tag: string;
        protected _parent: HTMLElement;
        protected _element: HTMLElement;
        protected _contextMenu: mf.TContextMenu | Array<mf.IContextMenuItem> | null;
        constructor(options: any);
        protected _innerInit(options?: any): void;
        fire(atype: string, adata?: any): void;
        on(atype: string, func: Function, capture?: Object): Array<any>;
        parent: HTMLElement;
        element: HTMLElement;
        readonly tag: string;
        contextMenu: mf.TContextMenu | Array<mf.IContextMenuItem>;
        cssClass: string | Array<string>;
    }
}
interface HTMLElement {
    _getObj(): mf.TBaseElement;
}
