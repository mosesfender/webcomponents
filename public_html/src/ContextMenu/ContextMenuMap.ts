module mf {
    export interface IContextMenuMapItem {
        menuName: string;
        forClass: string;
        forRole: string;
    }

    export class TContextMenuMap {
        owner: mf.TBaseElement;
        protected _items: Array<mf.IContextMenuMapItem>;

        constructor(map: Array<mf.IContextMenuMapItem>) {
            this._items = map;
        }

        public getMenuByClass(className: string) {
            for (let i = 0; i < this._items.length; i++) {
                if (className === this._items[i].forClass) {
                    return this._items[i].menuName;
                }
            }
        }

        public getMenuByRole(roleName: string) {
            for (let i = 0; i < this._items.length; i++) {
                if (roleName === this._items[i].forRole) {
                    return this._items[i].menuName;
                }
            }
        }

        public getMenu(menuName: string) {
            for (let i = 0; i < this._items.length; i++) {
                if (menuName === this._items[i].menuName) {
                    return this._items[i];
                }
            }
        }
    }
}

