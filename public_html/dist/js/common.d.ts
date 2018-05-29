declare namespace Objects {
    function extend(first: Object, second: Object): void;
    function extendWithExcludes(first: Object, second: Object, excludes?: Array<String>): void;
    function objectToQueryStr(obj: Object): string;
    function objectToQueryStr2(obj: Object): string;
    function compileGetUrl(url: string, params: Object): string;
}
declare namespace Html {
    function empty(el: HTMLElement): void;
    function createElement(tag: string): Element;
    function createElementNS(NS: string, tag: string): Element;
    function createElementEx(tag: string, parent?: Element, attributes?: Object, innerText?: string): Element;
    function classStringToCSSSelector(str: string): string;
    function tagToJqueryTag(tag: string): string;
}
declare function executeFunctionByName(functionName: any, context: any): any;
declare function printf(format: string, ...args: any[]): void;
declare function sprintf(format: string, ...args: any[]): any;
declare function va_sprintf(args: any): any;
declare function _dopr_fmtnum(value: any, base: any, dosign: any, ljust: any, len: any, zpad: any): any;
declare function _dopr_fmtstr(value: any, ljust: any, field_len: any, llen: any): string;
declare var _dopr_fromCharCode_chars: any;
declare function _dopr_fromCharCode(code: any): any;
