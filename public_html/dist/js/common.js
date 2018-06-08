var Objects;
(function (Objects) {
    function extend(first, second) {
        for (var id in second) {
            first[id] = second[id];
        }
    }
    Objects.extend = extend;
    function extendWithExcludes(first, second, excludes) {
        if (excludes === void 0) { excludes = []; }
        for (var id in second) {
            var exclude = false;
            for (var i = 0; i < excludes.length; i++) {
                if (excludes[i] == id) {
                    exclude = true;
                }
            }
            if (!exclude) {
                first[id] = second[id];
            }
        }
    }
    Objects.extendWithExcludes = extendWithExcludes;
    function objectToQueryStr(obj) {
        var _tmp = [];
        for (var p in obj) {
            _tmp.push(p + '=' + encodeURIComponent(obj[p]));
        }
        return _tmp.length ? '?' + _tmp.join('&') : '';
    }
    Objects.objectToQueryStr = objectToQueryStr;
    function objectToQueryStr2(obj) {
        var _tmp = [];
        for (var p in obj) {
            _tmp.push(p + '=' + encodeURIComponent(obj[p]));
        }
        return _tmp.join('&');
    }
    Objects.objectToQueryStr2 = objectToQueryStr2;
    function compileGetUrl(url, params) {
        return url + Objects.objectToQueryStr(params);
    }
    Objects.compileGetUrl = compileGetUrl;
})(Objects || (Objects = {}));
var Html;
(function (Html) {
    function empty(el) {
        for (var _i = 0; _i < el.childNodes.length; _i++) {
            el.removeChild(el.childNodes[_i]);
        }
    }
    Html.empty = empty;
    function createElement(tag) {
        return document.createElement(tag);
    }
    Html.createElement = createElement;
    function createElementNS(NS, tag) {
        return document.createElementNS(NS, tag);
    }
    Html.createElementNS = createElementNS;
    function createElementEx(tag, parent, attributes, innerText) {
        var ret;
        try {
            if (attributes && attributes.hasOwnProperty('xmlns')) {
                ret = Html.createElementNS(attributes['xmlns'], tag);
            }
            else {
                ret = Html.createElement(tag);
            }
            if (attributes) {
                for (var attr in attributes) {
                    if (attr == 'xmlns') {
                        continue;
                    }
                    if (attributes.hasOwnProperty('xmlns')) {
                        ret.setAttributeNS(null, attr, attributes[attr]);
                    }
                    else {
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
        }
        catch (e) {
            console.error(e);
        }
    }
    Html.createElementEx = createElementEx;
    function classStringToCSSSelector(str) {
        var ret = [];
        var arr = str.split(' ');
        [].map.call(arr, function (s) {
            ret.push('.' + s);
        });
        return ret.join('');
    }
    Html.classStringToCSSSelector = classStringToCSSSelector;
    function tagToJqueryTag(tag) {
        return '<' + tag + '></' + tag + '>';
    }
    Html.tagToJqueryTag = tagToJqueryTag;
    function cssMeasureToNumber(css) {
        return css.replace('/px/', '');
    }
    Html.cssMeasureToNumber = cssMeasureToNumber;
})(Html || (Html = {}));
if (!String.prototype['toBool']) {
    String.prototype['toBool'] = function () {
        var str = this;
        if (typeof this == 'number')
            str = str.toString();
        str = str.toLowerCase();
        return Boolean(str == 'true' || str == 'yes' || str == '1' || str == 'on');
    };
}
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}
try {
    function isArray(data) {
        return (Object.prototype.toString.call(data) === "[object Array]");
    }
}
catch (err) { }
try {
    function isObject(data) {
        return (Object.prototype.toString.call(data) === "[object Object]");
    }
}
catch (err) { }
try {
    function isFunc(data) {
        return (Object.prototype.toString.call(data) === "[object Function]");
    }
}
catch (err) { }
try {
    function isInteger(data) {
        return typeof data === 'number' &&
            isFinite(data) &&
            Math.floor(data) === data;
    }
}
catch (err) { }
try {
    function isTouchDevice() {
        return !!('ontouchstart' in window) || !!('onmsgesturechange' in window);
    }
    ;
}
catch (err) { }
DOMTokenList.prototype['addMany'] = function (classes) {
    var array = isArray(classes) ? classes : classes.split(' ');
    for (var i = 0, length = array.length; i < length; i++) {
        this.add(array[i]);
    }
};
DOMTokenList.prototype['removeMany'] = function (classes) {
    var array = isArray(classes) ? classes : classes.split(' ');
    for (var i = 0, length = array.length; i < length; i++) {
        this.remove(array[i]);
    }
};
function executeFunctionByName(functionName, context) {
    var args, namespaces, func;
    if (typeof functionName === 'undefined') {
        throw 'function name not specified';
    }
    if (typeof eval(functionName) !== 'function') {
        throw functionName + ' is not a function';
    }
    if (typeof context !== 'undefined') {
        if (typeof context === 'object' && context instanceof Array === false) {
            if (typeof context[functionName] !== 'function') {
                throw context + '.' + functionName + ' is not a function';
            }
            args = Array.prototype.slice.call(arguments, 2);
        }
        else {
            args = Array.prototype.slice.call(arguments, 1);
            context = window;
        }
    }
    else {
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
    function freeAndNil(obj) {
        var res = obj['destroy']();
        res = null;
    }
}
catch (err) { }
;
(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());
(function () {
    if (typeof window['CustomEvent'] === "function")
        return false;
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    CustomEvent.prototype = window['Event'].prototype;
    window['CustomEvent'] = CustomEvent;
})();
HTMLElement.prototype['eventListener'] = function (atype, func, capture) {
    if (typeof arguments[0] === "object" && (!arguments[0].nodeType)) {
        return this.removeEventListener.apply(this, arguments[0]);
    }
    this.addEventListener(atype, func, capture);
    return arguments;
};
HTMLElement.prototype['fire'] = function (atype, adata) {
    var ev = new CustomEvent(atype, { detail: adata });
    this.dispatchEvent(ev);
};
function printf(format) {
    var args = [];
    for (var _a = 1; _a < arguments.length; _a++) {
        args[_a - 1] = arguments[_a];
    }
    document.write(va_sprintf(printf.arguments));
}
function sprintf(format) {
    var args = [];
    for (var _a = 1; _a < arguments.length; _a++) {
        args[_a - 1] = arguments[_a];
    }
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
        }
        else {
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
                    case '0':
                        if (len == 0)
                            zpad = 1;
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
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
                    case 'u':
                    case 'U':
                        if (arg_index < argc) {
                            if (longflag) {
                                value = parseInt(argv[arg_index++]);
                            }
                            else {
                                value = parseInt(argv[arg_index++]);
                                value %= 4294967296;
                            }
                        }
                        else {
                            value = 0;
                        }
                        output += _dopr_fmtnum(value, 10, 0, ljust, len, zpad);
                        break;
                    case 'o':
                    case 'O':
                        if (arg_index < argc) {
                            if (longflag) {
                                value = parseInt(argv[arg_index++]);
                            }
                            else {
                                value = parseInt(argv[arg_index++]);
                                value %= 4294967296;
                            }
                        }
                        else {
                            value = 0;
                        }
                        output += _dopr_fmtnum(value, 8, 0, ljust, len, zpad);
                        break;
                    case 'd':
                    case 'D':
                        if (arg_index < argc) {
                            if (longflag) {
                                value = parseInt(argv[arg_index++]);
                            }
                            else {
                                value = parseInt(argv[arg_index++]);
                                value %= 4294967296;
                            }
                        }
                        else {
                            value = 0;
                        }
                        output += _dopr_fmtnum(value, 10, 1, ljust, len, zpad);
                        break;
                    case 'x':
                        if (arg_index < argc) {
                            if (longflag) {
                                value = parseInt(argv[arg_index++]);
                            }
                            else {
                                value = parseInt(argv[arg_index++]);
                                value %= 4294967296;
                            }
                        }
                        else {
                            value = 0;
                        }
                        output += _dopr_fmtnum(value, 16, 0, ljust, len, zpad);
                        break;
                    case 'X':
                        if (arg_index < argc) {
                            if (longflag) {
                                value = parseInt(argv[arg_index++]);
                            }
                            else {
                                value = parseInt(argv[arg_index++]);
                                value %= 4294967296;
                            }
                        }
                        else {
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
                                value = value + "";
                        }
                        else {
                            value = '';
                        }
                        output += _dopr_fmtstr(value, ljust, len, llen);
                        break;
                    case 'c':
                        if (arg_index < argc) {
                            value = parseInt(argv[arg_index++]);
                        }
                        else {
                            value = 0;
                        }
                        output += _dopr_fromCharCode(value);
                        break;
                    case '%':
                        output += '%';
                        break;
                    default:
                        if (p + 1 == format_index) {
                            output += '%';
                            output += ch;
                        }
                        else {
                        }
                        break;
                }
                specin = false;
            }
        }
    }
    return output;
}
function _dopr_fmtnum(value, base, dosign, ljust, len, zpad) {
    var signvalue = '';
    var uvalue;
    var place = 0;
    var padlen = 0;
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
    }
    else {
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
    if (padlen < 0)
        padlen = 0;
    if (ljust)
        padlen = -padlen;
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
function _dopr_fmtstr(value, ljust, field_len, llen) {
    var padlen;
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
    }
    else {
        output += value;
    }
    while (padlen < 0) {
        output += ' ';
        ++padlen;
    }
    return output;
}
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
if (!Array.prototype['includes']) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (len === 0) {
                return false;
            }
            var n = fromIndex | 0;
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }
            while (k < len) {
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                k++;
            }
            return false;
        }
    });
}
