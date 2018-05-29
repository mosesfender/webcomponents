declare module mf {
    class TBaseModal extends mf.TBaseElement {
        protected _cssClass: string;
        protected _overlay: HTMLElement;
        protected _titleBar: HTMLElement;
        protected _caption: HTMLElement;
        protected _contentBar: HTMLElement;
        protected _closeBtn: HTMLElement;
        private closeButtonClick;
        constructor(options?: any);
        destroy(): this;
        protected _innerInit(options?: any): void;
        show(): void;
        hide(): void;
        close(): this;
        beforeClose(obj: mf.TBaseModal): void;
        content: string | HTMLElement;
        caption: string;
        readonly tag: string;
        static createModal(): TBaseModal;
        static letModal(): any;
        static findModal(): any;
    }
}
