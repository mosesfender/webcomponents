module mf {
    export const ATTRIBUTE_ANCESTOR = 'data-ancestor';
    export const MAIN_ANCESTOR = 'mfElement';
    export const ANCESTOR_OBJ = '__obj';

    export class TBaseElement {
        public cssClass: string;
        protected _tag: string = 'div';
        protected _parent: HTMLElement;
        protected _element: HTMLElement;
        protected _contextMenu: mf.TContextMenu | Array<mf.IContextMenuItem> | null;

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
                return this.element.eventListener(atype, func, capture);
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
            this._element = el;
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