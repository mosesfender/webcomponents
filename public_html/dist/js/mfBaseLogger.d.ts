declare module mf {
    enum MessageType {
        MESS_DANGER = "danger",
        MESS_WARNING = "warning",
        MESS_INFO = "info",
        MESS_SUCCESS = "success",
        MESS_DEFAULT = "default",
    }
    const LogMessageTag = "p";
    class TBaseLogger extends mf.TBaseElement {
        protected _cssClass: string;
        protected _contextMenu: mf.TContextMenu | Array<mf.IContextMenuItem> | null;
        protected _log: HTMLElement;
        constructor(options?: any);
        protected _innerInit(options?: any): void;
        log(messageType: mf.MessageType, message: string | Array<string>): void;
        danger: string | Array<string>;
        warning: string | Array<string>;
        success: string | Array<string>;
        info: string | Array<string>;
        message: string | Array<string>;
        readonly tag: string;
    }
}
