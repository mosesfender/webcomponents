declare module mf {
    class TBaseModal extends mf.TBaseElement {
        protected _cssClass: string;
        protected _overlay: HTMLElement;
        protected _titleBar: HTMLElement;
        protected _caption: HTMLElement;
        protected _contentBar: HTMLElement;
        protected _closeBtn: HTMLElement;
        constructor(options?: any);
        protected _innerInit(options?: any): void;
        show(): void;
        hide(): void;
        content: string | HTMLElement;
        caption: string;
        readonly tag: string;
        static letModal(): any;
        static findModal(): any;
    }
}
