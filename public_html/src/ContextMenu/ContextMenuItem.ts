module mf {

    export interface IContextMenuItem {
        caption: string;
        call: string;
        callType: mf.ContextMenuCall;
        cssClass: string | Array<string>;
        name: string;
        items: Array<mf.IContextMenuItem> | Array<mf.TContextMenuItem>;
    }

    export const DEF_CONTEXTMENUITEM_CSSCLASS = 'mf-context_menu_item';

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
            this._captionElement.eventListener('click', function (ev: MouseEvent) {
                let _menuItemElement, _menuItemObj, _menuElement, _menuObj;
                _menuItemElement = (ev.target as HTMLElement).closest(['[', mf.ATTRIBUTE_ANCESTOR, ']'].join(''));
                if (_menuItemElement) {
                    _menuItemObj = (_menuItemElement as HTMLElement)._getObj() as mf.TContextMenuItem;
                    if (_menuItemObj) {
                        _menuElement = (_menuItemElement as HTMLElement).closest('[data-role=' + mf.DEF_CONTEXTMENU_ROLE + ']');
                        if (_menuElement) {
                            _menuObj = (_menuElement as HTMLElement)._getObj() as mf.TContextMenu;
                            if (_menuObj && _menuObj.expander) {
                                try {
                                    console.info(_menuObj.expander, (_menuItemObj as mf.TContextMenuItem).call);
                                    _menuObj.expander[(_menuItemObj as mf.TContextMenuItem).call].call(_menuObj.expander);
                                } catch (err) {
                                    console.info(_menuObj.expander);
                                }
                            }
                        }
                    }
                }
                //let _obj = (ev.target as HTMLElement)._getObj()[]
            });
        }

        public get caption() {
            return this._caption;
        }

        public set caption(val: string) {
            this._caption = this._captionElement.innerHTML = val;
        }

        public get cssClass() {
            return this._cssClass;
        }

        public set cssClass(val: string | Array<string>) {
            if (isArray(val)) {
                (val as Array<string>).unshift(mf.DEF_CONTEXTMENUITEM_CSSCLASS);
                this._cssClass = (val as Array<string>).join(' ');
            } else {
                val = mf.DEF_CONTEXTMENUITEM_CSSCLASS + ' ' + val;
                this._cssClass = val.toString();
            }
            this.element.classList.addMany(this._cssClass);
        }

        /**
         * @returns Array<mf.IContextMenuItem>
         */
        public get items() {
            return ((this.element.children[0] as HTMLElement)._getObj() as mf.TContextMenuItems).items;
        }
    }
}