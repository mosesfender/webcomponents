module mf {

    export class TBaseModal extends mf.TBaseElement {
        protected _cssClass: string;
        protected _overlay: HTMLElement;
        protected _titleBar: HTMLElement;
        protected _caption: HTMLElement;
        protected _contentBar: HTMLElement;
        protected _closeBtn: HTMLElement;

        private closeButtonClick;

        constructor(options?) {
            super(options);
            Objects.extend(this, options);
            let _that = this;
            this.element.classList.addMany('mf-modal hidden');
            this._overlay = Html.createElementEx('div', document.body, {'class': 'mf-overlay hidden'}) as HTMLElement;
            this._titleBar = Html.createElementEx('div', this._element, {'class': 'titlebar'}) as HTMLElement;
            this._contentBar = Html.createElementEx('div', this._element, {'class': 'contentbar'}) as HTMLElement;
            this._caption = Html.createElementEx('span', this._titleBar, {'class': 'caption', }) as HTMLElement;
            this._closeBtn = Html.createElementEx('button', this._titleBar, {'class': 'close', 'aria-label': 'Close', 'type': 'button'}, '<span aria-hidden="true">&times;</span>') as HTMLElement;
            this.closeButtonClick = this._closeBtn.eventListener('click', function (ev: Event) {
                //_that.hide.call(_that);
                _that.close.call(_that);
            });
        }

        destroy() {
            this._closeBtn.eventListener(this.closeButtonClick);
            this._titleBar.removeChild(this._closeBtn);
            this._titleBar.removeChild(this._caption);
            this._element.removeChild(this._titleBar);
            this._element.removeChild(this._contentBar);
            document.body.removeChild(this._overlay);
            document.body.removeChild(this._element);
            return super.destroy();
        }

        protected _innerInit(options?) {
            this.parent = document.body;
        };

        public show() {
            this._element.classList.remove('hidden');
            this._overlay.classList.remove('hidden');
            this._contentBar.style.width = this._contentBar.children[0].clientWidth + 'px';
            this._contentBar.style.height = this._contentBar.children[0].clientHeight + 'px';
        }

        public hide() {
            this._element.classList.add('hidden');
            this._overlay.classList.add('hidden');
        }

        public close() {
            this.fire('beforeClose', this);
            this.beforeClose(this);
            return this.destroy();
        }

        public beforeClose(obj: mf.TBaseModal) {}

        public get content() {
            return this._contentBar;
        }

        public set content(val: string | HTMLElement) {
            this._contentBar.innerHTML = '';
            if (typeof val === 'string') {
                this._contentBar.innerHTML = val;
            } else {
                this._contentBar.appendChild(val);
            }
        };

        public set caption(val: string) {
            this._caption.innerHTML = val;
        }

        public get tag() {
            return this._tag;
        }

        static createModal() {
            return new mf.TBaseModal();
        }

        static letModal() {
            let _mod = mf.TBaseModal.findModal();
            if (!_mod) {
                _mod = window['mf_modal'] = new mf.TBaseModal();
            }
            return _mod;
        }

        static findModal() {
            for (let prop in window) {
                if (window[prop] instanceof mf.TBaseModal) {
                    return window[prop];
                }
            }
            return false;
        }
    }

}
