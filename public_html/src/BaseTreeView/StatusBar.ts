module mf {
    export class TStatusBar extends mf.TBaseElement {

        constructor(options?) {
            super(options);
        }

        protected _innerInit(options?) {
            this._element = Html.createElementEx('div', options['parent'], {'data-role': 'treeview-statusbar'}) as HTMLInputElement;
        }

        public clear(){
            this.text = '';
        }

        public set text(val: string) {
            this._element.innerHTML = val;
        }
    }
}