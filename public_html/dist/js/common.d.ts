declare namespace Objects {
    function extend(first: Object, second: Object): void;
    function extendWithExcludes(first: Object, second: Object, excludes?: Array<String>): void;
    function objectToQueryStr(obj: Object): string;
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
