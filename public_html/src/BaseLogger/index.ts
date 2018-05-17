module mf {
    export enum MessageType {
        MESS_DANGER = 'danger',
        MESS_WARNING = 'warning',
        MESS_INFO = 'info',
        MESS_SUCCESS = 'success',
        MESS_DEFAULT = 'default',
    }

    export const LogMessageTag = 'p';

    export class TBaseLogger extends mf.TBaseElement {
        protected _cssClass: string;
        protected _contextMenu: mf.TContextMenu | Array<mf.IContextMenuItem> | null;
        protected _log: HTMLElement;

        constructor(options?) {
            super(options);
            this._innerInit(options);
            Objects.extend(this, options);
            this.element.classList.add('mf-logger');
        }

        protected _innerInit(options?) {
            this._log = Html.createElementEx('div', this.element, {'class': 'log'}) as HTMLElement;
        };

        public log(messageType: mf.MessageType, message: string | Array<string>) {
            let _that = this;
            let _m = [];
            if (typeof message == 'string') {
                _m.push(message);
            } else {
                _m = message;
            }
            [].map.call(_m, function (str) {
                Html.createElementEx(mf.LogMessageTag, _that._log, {'class': messageType}, str);
            });
            this.element.scrollTop = this.element.scrollHeight - this.element.clientHeight;
        }

        public set danger(val: string | Array<string>) {
            this.log(mf.MessageType.MESS_DANGER, val);
        }

        public set warning(val: string | Array<string>) {
            this.log(mf.MessageType.MESS_WARNING, val);
        }

        public set success(val: string | Array<string>) {
            this.log(mf.MessageType.MESS_SUCCESS, val);
        }

        public set info(val: string | Array<string>) {
            this.log(mf.MessageType.MESS_INFO, val);
        }

        public set message(val: string | Array<string>) {
            this.log(mf.MessageType.MESS_DEFAULT, val);
        }

        public get tag() {
            return this._tag;
        }
    }

}
