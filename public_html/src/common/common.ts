/**
 * @update 11.05.2018
 */
namespace Objects {

    export function extend(first: Object, second: Object): void {
        for (let id in second) {
            (<any> first)[id] = (<any> second)[id];
        }
    }
    export function extendWithExcludes(first: Object, second: Object, excludes: Array<String> = []): void {
        for (let id in second) {
            let exclude = false;
            for (let i = 0; i < excludes.length; i++) {
                if (excludes[i] == id) {
                    exclude = true;
                }
            }
            if (!exclude) {
                (<any> first)[id] = (<any> second)[id];
            }
        }
    }
    export function objectToQueryStr(obj: Object): string {
        let _tmp = [];
        for (let p in obj) {
            _tmp.push(p + '=' + encodeURIComponent(obj[p]));
        }
        return _tmp.length ? '?' + _tmp.join('&') : '';
    }
}

namespace Html {
    export function empty(el: HTMLElement): void {
        for (let _i = 0; _i < el.childNodes.length; _i++) {
            el.removeChild(el.childNodes[_i]);
        }
    }
    export function createElement(tag: string): Element {
        return document.createElement(tag);
    }
    export function createElementNS(NS: string, tag: string): Element {
        return document.createElementNS(NS, tag);
    }
    export function createElementEx(tag: string, parent?: Element,
        attributes?: Object, innerText?: string): Element {
        let ret: Element;
        try {
            if (attributes && attributes.hasOwnProperty('xmlns')) {
                ret = <Element> Html.createElementNS(attributes['xmlns'], tag);
            } else {
                ret = <Element> Html.createElement(tag);
            }
            if (attributes) {
                for (var attr in attributes) {
                    if (attr == 'xmlns') {
                        continue;
                    }
                    if (attributes.hasOwnProperty('xmlns')) {
                        ret.setAttributeNS(null, attr, attributes[attr]);
                    } else {
                        ret.setAttribute(attr, attributes[attr]);
                    }
                }
            }
            if (innerText) {
                ret.innerHTML = innerText;
            }
            if (parent) {
                parent.appendChild(ret);
            }
            return ret;
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * @var {string} str Class attribute, e.g. 'class-one class-two'
     * @returns {string} CSS path, e.q. '.class-one.class-two'
     */
    export function classStringToCSSSelector(str: string): string {
        let ret = [];
        let arr = str.split(' ');
        [].map.call(arr, function (s) {
            ret.push('.' + s);
        });
        return ret.join('');
    }

    /**
     * @var {string} tag, e.g. 'div'
     * @returns {string} e.g. '<div></div>'
     */
    export function tagToJqueryTag(tag: string): string {
        return '<' + tag + '></' + tag + '>';
    }
}

if (!String.prototype['toBool']) {
    String.prototype['toBool'] = function () {
        var str = this;
        if (typeof this == 'number')
            str = (str as string).toString();
        str = (str as string).toLowerCase();
        return Boolean(str == 'true' || str == 'yes' || str == '1' || str == 'on');
    };
}

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return (this as String).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
}

//if (!Array.prototype.inArray) {
//    Array.prototype.inArray = function (needle) {
//        for (var i = 0; i < this.length; i++) {
//            if (this[i] == needle)
//                return true;
//        }
//        return false;
//    }
//}

//declare interface Array<T> {
//    inArray(needle: T): boolean;
//}
try {
    function isArray(data: any): Boolean {
        return (Object.prototype.toString.call(data) === "[object Array]");
    }
} catch (err) {}
try {
    function isObject(data: any): Boolean {
        return (Object.prototype.toString.call(data) === "[object Object]");
    }
} catch (err) {}
try {
    function isFunc(data: any): Boolean {
        return (Object.prototype.toString.call(data) === "[object Function]");
    }
} catch (err) {}
try {
    function isInteger(data: any): Boolean {
        return typeof data === 'number' &&
            isFinite(data) &&
            Math.floor(data) === data;
    }
} catch (err) {}
try {
    function isTouchDevice(): Boolean {
        return !!('ontouchstart' in window) || !!('onmsgesturechange' in window);
    };
} catch (err) {}

DOMTokenList.prototype['addMany'] = function (classes: string) {
    var array = classes.split(' ');
    for (var i = 0, length = array.length; i < length; i++) {
        (this as DOMTokenList).add(array[i]);
    }
};

DOMTokenList.prototype['removeMany'] = function (classes: string) {
    var array = classes.split(' ');
    for (var i = 0, length = array.length; i < length; i++) {
        (this as DOMTokenList).remove(array[i]);
    }
};



(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback: FrameRequestCallback, element?: HTMLElement) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {callback(currTime + timeToCall);},
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

(function () {
    /* Incompatible CustomEvent browsers polyfill */
    if (typeof window['CustomEvent'] === "function") return false;
    function CustomEvent(event, params) {
        params = params || {bubbles: false, cancelable: false, detail: undefined};
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    CustomEvent.prototype = window['Event'].prototype;
    window['CustomEvent'] = CustomEvent;
})();

HTMLElement.prototype['eventListener'] = function (atype: string, func: Function, capture?: Object) {
    if (typeof arguments[0] === "object" && (!arguments[0].nodeType)) {
        return this.removeEventListener.apply(this, arguments[0]);
    }
    this.addEventListener(atype, func, capture);
    return arguments;
};
HTMLElement.prototype['fire'] = function (atype: string, adata?: any) {
    let ev = new CustomEvent(atype, {detail: adata});
    this.dispatchEvent(ev);
};

