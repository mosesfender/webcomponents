declare namespace Objects {
    export function extend(first: Object, second: Object): void;
    export function extendWithExcludes(first: Object, second: Object, excludes: Array<String>): void;
    export function objectToQueryStr(obj: Object): string;
}

declare namespace Html {
    export function empty(el: HTMLElement): void;
    export function createElement(tag: string): Element;
    export function createElementNS(NS: string, tag: string): Element;
    export function createElementEx(tag: string, parent?: Element,
        attributes?: Object, innerText?: string): Element;
    /**
     * @var {string} str Class attribute, e.g. 'class-one class-two'
     * @returns {string} CSS path, e.q. '.class-one.class-two'
     */
    export function classStringToCSSSelector(str: string): string;
    /**
     * @var {string} tag, e.g. 'div'
     * @returns {string} e.g. '<div></div>'
     */
    export function tagToJqueryTag(tag: string): string;
}

declare interface String {
    toBool(): boolean;
    trim(): string;
}

declare interface DOMTokenList {
    readonly length: number;
    add(...token: string[]): void;
    contains(token: string): boolean;
    item(index: number): string;
    remove(...token: string[]): void;
    toString(): string;
    toggle(token: string, force?: boolean): boolean;
    addMany(classes: string | Array<string>): void;
    removeMany(classes: string | Array<string>): void;
    [index: number]: string;
}

declare interface HTMLElement {
    eventListener(atype: string, func?: Function, capture?: Object): Array<any>,
    fire(atype: string, adata?: any): void;
}

declare function isArray(data: any): Boolean;
declare function isObject(data: any): Boolean;
declare function isFunc(data: any): Boolean;
declare function isInteger(data: any): Boolean;
declare function isTouchDevice(data: any): Boolean;