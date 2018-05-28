var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var mf;
(function (mf) {
    var TBaseModal = (function (_super) {
        __extends(TBaseModal, _super);
        function TBaseModal(options) {
            var _this = _super.call(this, options) || this;
            Objects.extend(_this, options);
            var _that = _this;
            _this.element.classList.addMany('mf-modal hidden');
            _this._overlay = Html.createElementEx('div', document.body, { 'class': 'mf-overlay hidden' });
            _this._titleBar = Html.createElementEx('div', _this._element, { 'class': 'titlebar' });
            _this._contentBar = Html.createElementEx('div', _this._element, { 'class': 'contentbar' });
            _this._caption = Html.createElementEx('span', _this._titleBar, { 'class': 'caption', });
            _this._closeBtn = Html.createElementEx('button', _this._titleBar, { 'class': 'close', 'aria-label': 'Close', 'type': 'button' }, '<span aria-hidden="true">&times;</span>');
            _this._closeBtn.eventListener('click', function (ev) {
                _that.hide.call(_that);
            });
            return _this;
        }
        TBaseModal.prototype._innerInit = function (options) {
            this.parent = document.body;
        };
        ;
        TBaseModal.prototype.show = function () {
            this._element.classList.remove('hidden');
            this._overlay.classList.remove('hidden');
            this._contentBar.style.width = this._contentBar.children[0].clientWidth + 'px';
            this._contentBar.style.height = this._contentBar.children[0].clientHeight + 'px';
        };
        TBaseModal.prototype.hide = function () {
            this._element.classList.add('hidden');
            this._overlay.classList.add('hidden');
        };
        Object.defineProperty(TBaseModal.prototype, "content", {
            get: function () {
                return this._contentBar;
            },
            set: function (val) {
                this._contentBar.innerHTML = '';
                if (typeof val === 'string') {
                    this._contentBar.innerHTML = val;
                }
                else {
                    this._contentBar.appendChild(val);
                }
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(TBaseModal.prototype, "caption", {
            set: function (val) {
                this._caption.innerHTML = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TBaseModal.prototype, "tag", {
            get: function () {
                return this._tag;
            },
            enumerable: true,
            configurable: true
        });
        TBaseModal.letModal = function () {
            var _mod = mf.TBaseModal.findModal();
            if (!_mod) {
                _mod = window['mf_modal'] = new mf.TBaseModal();
            }
            return _mod;
        };
        TBaseModal.findModal = function () {
            for (var prop in window) {
                if (window[prop] instanceof mf.TBaseModal) {
                    return window[prop];
                }
            }
            return false;
        };
        return TBaseModal;
    }(mf.TBaseElement));
    mf.TBaseModal = TBaseModal;
})(mf || (mf = {}));
