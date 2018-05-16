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
    var array = classes.split(' ');
    for (var i = 0, length = array.length; i < length; i++) {
        this.add(array[i]);
    }
};
DOMTokenList.prototype['removeMany'] = function (classes) {
    var array = classes.split(' ');
    for (var i = 0, length = array.length; i < length; i++) {
        this.remove(array[i]);
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
