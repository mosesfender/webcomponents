module mf {
    export enum ContextMenuCall {
        METHOD = 1,
        URL = 2,
    }

    export interface IContextMenuItem {
        caption: string;
        call: string;
        callType: mf.ContextMenuCall;
        cssClass: string;
        name: string;
        children: Array<mf.IContextMenuItem> | Array<mf.TContextMenuItem>;
    }

    export class TContextMenu extends mf.TBaseElement {
        protected _items: Array<mf.IContextMenuItem>;

        public constructor(options) {
            super(options);
            Objects.extend(this, options);
        }

        protected _innerInit(options?: Object) {
            if (options.hasOwnProperty('element')) {
                this.element = options['element'];
                delete options['element'];
            } else {
                this.element = Html.createElementEx('div', document.body) as HTMLElement;
            }
            this.element.classList.add('mf-context_menu');

            if (options.hasOwnProperty('items')) {
                this._createItems(options['items']);
                delete options['items'];
            }
        };

        protected _createItems(items: Array<mf.IContextMenuItem>) {

        }

        public get items() {
            if (!this._items) {
                this._items = [];
            }
            return this._items;
        }

        public set items(val: Array<mf.IContextMenuItem>) {
            this._items = val;
        }
    }

    export class TContextMenuItems extends mf.TBaseElement {
        
    }

    export class TContextMenuItem extends mf.TBaseElement implements mf.IContextMenuItem {
        protected _caption: string;
        protected _captionElement: HTMLElement;
        call: string;
        callType: mf.ContextMenuCall;
        name: string;
        children: Array<mf.IContextMenuItem> | Array<mf.TContextMenuItem>;

        public constructor(options) {
            super(options);
            Objects.extend(this, options);
        }

        protected _innerInit(options?: Object) {
            this.element = Html.createElementEx('li', options['parent'], {'class': options['cssClass'] || ''}) as HTMLElement;
            this._captionElement = Html.createElementEx('b', this.element) as HTMLElement;
        }

        public get caption() {
            return this._caption;
        }

        public set caption(val: string) {
            this.caption = this._captionElement.innerHTML = val;
        }
    }
}
