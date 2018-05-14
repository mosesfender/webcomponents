declare module mf {
    const ATTRIBUTE_ANCESTOR = 'data-ancestor';
    const MAIN_ANCESTOR = 'mfElement';
    const ANCESTOR_OBJ = '__obj';

    export enum TREE_ROLE {
        TREE_VIEW = 'treeview',
        TREE_NODES = 'treenodes',
        TREE_NODE = 'treenode',
    }

    export class TBaseElement {
        constructor(options: Object);
        public tag: string;
        protected _parent: HTMLElement;
        public parent: HTMLElement;
        protected _element: HTMLElement;
        public element: HTMLElement;
        public fire(atype: string, adata: any): void;
        public on(atype: string, func: Function, capture?: Object): Array<any>;
    }

    export class TBaseTreeView extends TBaseElement {
        nodes: TBaseTreeNodes;
    }

}