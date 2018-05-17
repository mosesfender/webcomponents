module mf {
    export const ATTRIBUTE_ANCESTOR = 'data-ancestor';
    export const MAIN_ANCESTOR = 'mfElement';
    export const ANCESTOR_OBJ = '__obj';

    export class TBaseElement {
        protected _cssClass: string;
        protected _tag: string = 'div';
        protected _parent: HTMLElement;
        protected _element: HTMLElement;
        protected _contextMenu: mf.TContextMenu | Array<mf.IContextMenuItem> | null;
        protected _monitor: mf.TBaseLogger | string | null;

        constructor(options) {
            this._innerInit(options);
            Objects.extend(this, options);

            if (this.element instanceof HTMLElement) {
                if (!this.element.hasAttribute((ATTRIBUTE_ANCESTOR))) {
                    this.element.setAttribute((ATTRIBUTE_ANCESTOR), MAIN_ANCESTOR);
                }
                this._element[ANCESTOR_OBJ] = this;
            }
        }

        protected _innerInit(options?) {

        };

        public fire(atype: string, adata?: any) {
            if (this.element) {
                this._element.fire(atype, adata);
            }
        }

        public on(atype: string, func: Function, capture?: Object): Array<any> {
            if (this.element) {
                return (this.element as HTMLElement).eventListener(atype, func, capture);
            }
        }

        public set parent(el: HTMLElement) {
            this._parent = el;
        }

        public get parent() {
            if (!this._parent) {
                if (this._element) {
                    this._parent = this._element.parentElement;
                }
            }
            return this._parent;
        }

        public set element(el: HTMLElement) {
            if (typeof el == 'string') {
                this._element = document.querySelector(el) as HTMLElement;
            } else {
                this._element = el as HTMLElement;
            }
        }

        public get element() {
            if (!this._element) {
                this._element = Html.createElementEx(this.tag, this.parent || null, {'data-ancestor': MAIN_ANCESTOR}) as HTMLElement;
            }
            return this._element;
        }

        public get tag() {
            return this._tag;
        }

        public set contextMenu(val: mf.TContextMenu | Array<mf.IContextMenuItem>) {
            if (isArray(val)) {
                this._contextMenu = new mf.TContextMenu({
                    items: val
                });
            }
            if (val instanceof mf.TContextMenu) {
                this._contextMenu = val;
            }
        }

        public get contextMenu() {
            return this._contextMenu;
        }

        public get cssClass() {
            return this._cssClass;
        }

        public set cssClass(val: string | Array<string>) {
            if (isArray(val)) {
                this._cssClass = (val as Array<string>).join(' ');
            } else {
                this._cssClass = val.toString();
            }
            (this.element as HTMLElement).classList.addMany(this._cssClass);
        }

        public set monitor(val) {
            this._monitor = val;
        }

        public get monitor() {
            if (typeof this._monitor == 'string') {
                if (window.hasOwnProperty(this._monitor)) {
                    this._monitor = window[this._monitor];
                }
            }
            return this._monitor;
        }

        /* Provide methods of Logger */
        protected _logMessage(messageType: mf.MessageType, message: string | Array<string>) {
            if (this.monitor instanceof mf.TBaseLogger) {
                this.monitor.log(messageType, message);
            }
        }

        public set danger(val: any) {
            this._logMessage(mf.MessageType.MESS_DANGER, val);
        }

        public set warning(val: any) {
            this._logMessage(mf.MessageType.MESS_WARNING, val);
        }

        public set success(val: any) {
            this._logMessage(mf.MessageType.MESS_SUCCESS, val);
        }

        public set info(val: any) {
            this._logMessage(mf.MessageType.MESS_INFO, val);
        }

        public set message(val: any) {
            this._logMessage(mf.MessageType.MESS_DEFAULT, val);
        }
    }

    HTMLElement.prototype['_getObj'] = function () {
        if (this.hasOwnProperty(mf.ANCESTOR_OBJ)) {
            return this[mf.ANCESTOR_OBJ];
        }
    };

}

declare interface HTMLElement {
    _getObj(): mf.TBaseElement;
}