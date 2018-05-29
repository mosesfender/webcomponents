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
    
    export function objectToQueryStr2(obj: Object): string {
        let _tmp = [];
        for (let p in obj) {
            _tmp.push(p + '=' + encodeURIComponent(obj[p]));
        }
        return _tmp.join('&');
    }

    export function compileGetUrl(url: string, params: Object) {
        return url + Objects.objectToQueryStr(params);
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

DOMTokenList.prototype['addMany'] = function (classes: string | Array<string>) {
    var array = isArray(classes) ? classes : (classes as string).split(' ');
    for (var i = 0, length = array.length; i < length; i++) {
        (this as DOMTokenList).add(array[i]);
    }
};

DOMTokenList.prototype['removeMany'] = function (classes: string | Array<string>) {
    var array = isArray(classes) ? classes : (classes as string).split(' ');
    for (var i = 0, length = array.length; i < length; i++) {
        (this as DOMTokenList).remove(array[i]);
    }
};

function executeFunctionByName(functionName, context /*, args */) {
    var args, namespaces, func;
    if (typeof functionName === 'undefined') {throw 'function name not specified';}
    if (typeof eval(functionName) !== 'function') {throw functionName + ' is not a function';}
    if (typeof context !== 'undefined') {
        if (typeof context === 'object' && context instanceof Array === false) {
            if (typeof context[functionName] !== 'function') {
                throw context + '.' + functionName + ' is not a function';
            }
            args = Array.prototype.slice.call(arguments, 2);
        } else {
            args = Array.prototype.slice.call(arguments, 1);
            context = window;
        }
    } else {
        context = window;
    }
    namespaces = functionName.split(".");
    func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}

try {
    function freeAndNil(obj: Object) {
        let res = obj['destroy']();
        res = null;
    }
} catch (err) {};

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

// printf.js - version 1.1.0
//
//  Copyright (C) 2000-2002  Masanao Izumo <iz@onicos.co.jp>
//
//  This library is free software; you can redistribute it and/or
//  modify it under the terms of the GNU Lesser General Public
//  License as published by the Free Software Foundation; either
//  version 2.1 of the License, or (at your option) any later version.
//
//  This library is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
//  Lesser General Public License for more details.
//
//  You should have received a copy of the GNU Lesser General Public
//  License along with this library; if not, write to the Free Software
//  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
//
//
// SYNOPSIS:
//   printf("format", ...);
//   str = sprintf("format", ...);
//
// Chages:
// 2002-02-04  Masanao Izumo <mo@goice.co.jp>
//             - Fixed bug about sprintf("%%") will return "%%".
//             - Evaluate undefined "%" argument.  That is:
//                   numerical value ===> 0	(%d, %x, %o, etc)
//                   string value    ===> ''	(%s)

// printf(format, ...);
function printf(format: string, ...args) {
    document.write(va_sprintf(printf.arguments));
}

// str = sprintf(format, ...);
function sprintf(format: string, ...args) {
    return va_sprintf(sprintf.arguments);
}

function va_sprintf(args) {
    var ch;
    var value;
    var longflag;
    var ljust;
    var len, llen;
    var zpad;
    var p;
    var output;
    var format_index, arg_index;
    var argc, argv;
    var specin;
    var format;

    output = '';
    format_index = 0;
    arg_index = 1;
    argv = args;
    argc = args.length;
    format = args[0];

    while (format_index < format.length) {
        ch = format.substr(format_index++, 1);
        if (ch != '%' || format_index == format.length) {
            output += ch;
        } else {
            // ch == '%'
            ljust = len = zpad = longflag = 0;
            llen = -1;
            p = format_index;
            specin = true;

            while (specin) {
                ch = format.substr(format_index++, 1);
                switch (ch) {
                    case '-':
                        ljust = 1;
                        continue;

                    case '0':         // set zero padding if len not set
                        if (len == 0)
                            zpad = 1;
                    // FALLTHROUGH
                    case '1': case '2': case '3':
                    case '4': case '5': case '6':
                    case '7': case '8': case '9':
                        len = len * 10 + parseInt(ch);
                        continue;

                    case '.':
                        llen = len;
                        len = 0;
                        continue;

                    case '*':
                        if (arg_index < argc)
                            len = parseInt(argv[arg_index++]);
                        else
                            len = 0;
                        if (len < 0) {
                            ljust = 1;
                            len = -len;
                        }
                        continue;

                    case 'l':
                        longflag = 1;
                        continue;

                    case 'u': case 'U':
                        if (arg_index < argc) {
                            if (longflag) {
                                value = parseInt(argv[arg_index++]);
                            } else {
                                value = parseInt(argv[arg_index++]);
                                value %= 4294967296;
                            }
                        } else {
                            value = 0;
                        }
                        output += _dopr_fmtnum(value, 10, 0, ljust, len, zpad);
                        break;

                    case 'o': case 'O':
                        if (arg_index < argc) {
                            if (longflag) {
                                value = parseInt(argv[arg_index++]);
                            } else {
                                value = parseInt(argv[arg_index++]);
                                value %= 4294967296;
                            }
                        } else {
                            value = 0;
                        }
                        output += _dopr_fmtnum(value, 8, 0, ljust, len, zpad);
                        break;

                    case 'd': case 'D':
                        if (arg_index < argc) {
                            if (longflag) {
                                value = parseInt(argv[arg_index++]);
                            } else {
                                value = parseInt(argv[arg_index++]);
                                value %= 4294967296;
                            }
                        } else {
                            value = 0;
                        }
                        output += _dopr_fmtnum(value, 10, 1, ljust, len, zpad);
                        break;

                    case 'x':
                        if (arg_index < argc) {
                            if (longflag) {
                                value = parseInt(argv[arg_index++]);
                            } else {
                                value = parseInt(argv[arg_index++]);
                                value %= 4294967296;
                            }
                        } else {
                            value = 0;
                        }
                        output += _dopr_fmtnum(value, 16, 0, ljust, len, zpad);
                        break;

                    case 'X':
                        if (arg_index < argc) {
                            if (longflag) {
                                value = parseInt(argv[arg_index++]);
                            } else {
                                value = parseInt(argv[arg_index++]);
                                value %= 4294967296;
                            }
                        } else {
                            value = 0;
                        }
                        output += _dopr_fmtnum(value, -16, 0, ljust, len, zpad);
                        break;

                    case 's':
                        if (arg_index < argc) {
                            value = argv[arg_index++];
                            if (value == null)
                                value = "(null)";
                            else
                                value = value + "";	// toString
                        } else {
                            value = '';
                        }
                        output += _dopr_fmtstr(value, ljust, len, llen);
                        break;

                    case 'c':
                        if (arg_index < argc) {
                            value = parseInt(argv[arg_index++]);
                        } else {
                            value = 0;
                        }
                        output += _dopr_fromCharCode(value);
                        break;

                    case '%':
                        output += '%';
                        break;

                    /* Not supported
                            case 'f': case 'e': case 'E': case 'g': case 'G':
                              if (arg_index < argc) {
                                value = argv[arg_index++];
                              } else {
                                value = 0.0;
                              }
                              output += _dopr_fmtdouble(format.substr(p, format_index - p), value);
                              break;
                    */

                    default:
                        if (p + 1 == format_index) {
                            output += '%';
                            output += ch;
                        }
                        else {
                            // alert("format error: " + format);
                        }
                        break;
                }
                specin = false;
            }
        }
    }
    return output;
}

// Private function
function _dopr_fmtnum(value, base, dosign, ljust, len, zpad) {
    var signvalue = '';
    var uvalue: number;
    var place = 0;
    var padlen = 0;		// amount to pad
    var caps = 0;
    var convert;
    var output;

    convert = '';
    output = '';

    if (value >= 0)
        uvalue = value;
    else
        uvalue = (value % 4294967296) + 4294967296;

    if (dosign) {
        if (value < 0) {
            signvalue = '-';
            uvalue = -value;
        }
    }

    if (base < 0) {
        caps = 1;
        base = -base;
    }

    if (uvalue == 0) {
        convert = '0';
        place = 1;
    } else {
        while (uvalue) {
            if (caps)
                convert = '0123456789ABCDEF'.substr(uvalue % base, 1) + convert;
            else
                convert = '0123456789abcdef'.substr(uvalue % base, 1) + convert;
            uvalue = uvalue / base;
            place++;
        }
    }

    padlen = len - place;
    if (padlen < 0) padlen = 0;
    if (ljust) padlen = -padlen;
    if (zpad && padlen > 0) {
        if (signvalue) {
            output += signvalue;
            --padlen;
            signvalue = '0';
        }

        while (padlen > 0) {
            output += '0';
            --padlen;
        }
    }

    while (padlen > 0) {
        output += ' ';
        --padlen;
    }
    if (signvalue) {
        output += signvalue;
    }

    output += convert;

    while (padlen < 0) {
        output += ' ';
        ++padlen;
    }
    return output;
}

// Private function
function _dopr_fmtstr(value, ljust, field_len, llen) {
    var padlen;			// amount to pad
    var slen, truncstr = 0;
    var output = '';

    slen = value.length;

    if (llen != -1) {
        var rlen;

        rlen = field_len;
        if (slen > rlen) {
            truncstr = 1;
            slen = rlen;
        }
        field_len = llen;
    }
    padlen = field_len - slen;

    if (padlen < 0)
        padlen = 0;
    if (ljust)
        padlen = -padlen;
    while (padlen > 0) {
        output += ' ';
        --padlen;
    }
    if (truncstr) {
        output += value.substr(0, slen);
    } else {
        output += value;
    }

    while (padlen < 0) {
        output += ' ';
        ++padlen;
    }
    return output;
}

// Private function
var _dopr_fromCharCode_chars = null;
function _dopr_fromCharCode(code) {
    if (String.fromCharCode)
        return String.fromCharCode(code);
    if (!_dopr_fromCharCode_chars)
        _dopr_fromCharCode_chars =
            "\000\001\002\003\004\005\006\007\010\011\012\013\014\015\016\017\020" +
            "\021\022\023\024\025\026\027\030\031\032\033\034\035\036\037 !\"#$%&" +
            "'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghi" +
            "jklmnopqrstuvwxyz{|}~\177\200\201\202\203\204\205\206\207\210\211" +
            "\212\213\214\215\216\217\220\221\222\223\224\225\226\227\230\231\232" +
            "\233\234\235\236\237\240\241\242\243\244\245\246\247\250\251\252\253" +
            "\254\255\256\257\260\261\262\263\264\265\266\267\270\271\272\273\274" +
            "\275\276\277\300\301\302\303\304\305\306\307\310\311\312\313\314\315" +
            "\316\317\320\321\322\323\324\325\326\327\330\331\332\333\334\335\336" +
            "\337\340\341\342\343\344\345\346\347\350\351\352\353\354\355\356\357" +
            "\360\361\362\363\364\365\366\367\370\371\372\373\374\375\376\377";
    if (code < 0)
        return "";
    if (code <= 255)
        return _dopr_fromCharCode_chars.substr(code, 1);
    return eval(sprintf("\"\\u%04x\"", code));
}


