module mf {
    export enum ContextMenuCall {
        METHOD = 1,
        URL = 2,
    }

    export const DEF_CONTEXTMENU_CSSCLASS = 'mf-context_menu';
    export const DEF_CONTEXTMENU_ROLE = 'contextmenu';

    export interface IContextMenu {
        items: Array<mf.IContextMenuItem> | Array<mf.IContextMenuItem>;
        name: string;
    }

    export class TContextMenu extends mf.TBaseElement implements mf.IContextMenu {
        public owner: mf.TBaseElement;
        public list: mf.TContextMenuList;
        public expander: mf.TBaseElement;
        public expanded: boolean = false;
        public events: any = {};

        /** protected defines */
        protected _items: Array<mf.IContextMenuItem>;

        /** public defines */
        public name: string;

        public constructor(options) {
            super(options);
            Objects.extend(this, options);
            this.element.classList.add(mf.DEF_CONTEXTMENU_CSSCLASS);
            this.element.setAttribute('data-role', mf.DEF_CONTEXTMENU_ROLE);
            if (options.hasOwnProperty('items')) {
                let _items = mf.TContextMenuItems.create(this);
                _items.items = options['items'];
                delete options['items'];
            }
        }

        protected _innerInit(options?: Object) {
            if (options.hasOwnProperty('element')) {
                this.element = options['element'];
                delete options['element'];
            } else {
                this.element = Html.createElementEx('div', document.body) as HTMLElement;
            }
        }
        
        public expand(ev: MouseEvent){
            this.owner.fire('contentMenuExpand');
            this.element.style.left = ev.pageX + 'px';
            this.element.style.top = ev.pageY + 'px';
            this.element.classList.add('expanded');
            if (this.list){
                this.list.expanded = this;
            }
            this.expanded = true;
        }
        
        public collapse(){
            this.element.classList.remove('expanded');
            this.expanded = false;
        }

        /**
         * @returns Array<mf.IContextMenuItem>
         */
        public get items() {
            return ((this.element.children[0] as HTMLElement)._getObj() as mf.TContextMenuItems).items;
        }

    }
}


