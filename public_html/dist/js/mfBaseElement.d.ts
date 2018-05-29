declare module mf {
    enum TDatasetClasses {
        TDataset = "TDataset",
        TAjaxDataset = "TAjaxDataset",
        TGooleMapDataset = "TGoogleMapDataset",
    }
    enum TFieldTypes {
        NUMBER = 0,
        STRING = 1,
    }
    interface IDefField {
        fieldName: string;
        fieldType: number;
    }
    class TDataset {
        protected owner: TBaseDataElement;
        protected _data: Array<Object>;
        protected _selectValue: any;
        protected flagBof: boolean;
        protected flagEof: boolean;
        protected cursor: number;
        defFields: Array<IDefField>;
        constructor(owner: TBaseDataElement);
        loadData(data: Array<Object>): void;
        protected defineFields(): void;
        issetField(fieldName: string): false | IDefField;
        first(): Object;
        prev(): Object;
        next(): Object;
        last(): Object;
        current(): Object;
        goTo(idx: number): any;
        goTo(field: string, value: any): any;
        protected findIndex(field: string, value: string | number): number;
        size(): number;
        protected setIndex(idx: number): Object;
        fieldByName(fieldName: any): TDataField;
        column(fieldName: any): any[];
        readonly Bof: boolean;
        readonly Eof: boolean;
        readonly index: number;
        data: any;
        readonly isActive: boolean;
        selectValue: string | number;
    }
    class TDataField {
        name: string;
        value: any;
        asString(): any;
        asInteger(): number;
    }
}
declare module mf {
    enum RequestMethods {
        GET = "GET",
        POST = "POST",
    }
    class TAjaxDataset extends TDataset {
        baseUrl: string;
        requestParams: Object;
        requestMethod: RequestMethods;
        constructor(owner: TBaseDataElement);
        loadData(): any;
        loadData(data: Array<Object>): any;
        loadData(params: Object): any;
    }
}
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
        protected _monitor: mf.TBaseLogger | string | null;
        constructor(options: any);
        destroy(): this;
        protected _innerInit(options?: any): void;
        fire(atype: string, adata?: any): void;
        on(atype: string, func: Function, capture?: Object): Array<any>;
        parent: HTMLElement;
        element: HTMLElement;
        readonly tag: string;
        contextMenu: mf.TContextMenu | Array<mf.IContextMenuItem>;
        cssClass: string | Array<string>;
        monitor: string | TBaseLogger;
        protected _logMessage(messageType: mf.MessageType, message: string | Array<string>): void;
        danger: any;
        warning: any;
        success: any;
        info: any;
        message: any;
    }
}
interface HTMLElement {
    _getObj(): mf.TBaseElement;
}
declare module mf {
    class TBaseDataElement extends mf.TBaseElement {
        protected _dataset: TDataset;
        keyFieldName: string;
        constructor(options: any);
        loaded(aowner: TBaseElement): void;
        readonly dataset: TDataset;
    }
}
