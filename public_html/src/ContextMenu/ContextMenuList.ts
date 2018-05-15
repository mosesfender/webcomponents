module mf {

    export class TContextMenuList {
        owner: mf.TBaseElement;
        items: Object = {};
        expanded: boolean | mf.TContextMenu;

        constructor(owner?: mf.TBaseElement, options?: Object) {
            let _that = this;
            this.owner = owner;
            if (isArray(options)) {
                [].map.call(options, function (el) {
                    _that.addMenu.call(_that, el);
                });
            }
        }

        public addMenu(menu: mf.TContextMenu);
        public addMenu(menu: mf.IContextMenu);
        public addMenu(menu: Array<mf.IContextMenuItem>);
        public addMenu(menu) {
            if (menu instanceof mf.TContextMenu) {
                let _name = menu.name || this.count;
                this.items[_name] = menu;
                (this.items[_name] as mf.TContextMenu).owner = this.owner;
                (this.items[_name] as mf.TContextMenu).list = this;
            } else if (isArray(menu)) {
                this.addMenu.call(this, new mf.TContextMenu({items: menu}));
            } else if (isObject(menu)) {
                let _name = menu.name || this.count;
                this.items[_name] = new mf.TContextMenu({name: _name, items: menu.items});
                (this.items[_name] as mf.TContextMenu).owner = this.owner;
                (this.items[_name] as mf.TContextMenu).list = this;
            }
        }

        public getMenu(name: string): mf.TContextMenu {
            return this.items[name];
        }

        public collapseAll() {
            for (let item in this.items) {
                (this.items[item] as mf.TContextMenu).collapse();
            }
        }

        public get count() {
            let count = 0;
            for (let prop in this) {
                if (this.hasOwnProperty(prop))
                    count = count + 1;
            }
            return count;
        }
    }
}