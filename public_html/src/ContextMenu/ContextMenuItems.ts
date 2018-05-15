module mf {
    export class TContextMenuItems extends mf.TBaseElement {

        constructor(options?) {
            super(options);
        }

        static create(parent: mf.TContextMenu | mf.TContextMenuItem) {
            return new mf.TContextMenuItems({
                parent: parent.element
            });
        }

        public set items(val: Array<mf.IContextMenuItem>) {
            let _that = this;
            [].map.call(val, function (el) {
                el['parent'] = _that.element;
                let _item = new mf.TContextMenuItem(el);
            });
        }

        public get items() {
            let ret = [];
            let _items = this.element.querySelectorAll('li');
            if (_items) {
                [].map.call(_items, function (el) {
                    ret.push((el as HTMLElement)._getObj());
                });
            }
            return ret;
        }

        public get tag() {
            return 'ul';
        }

    }
}