module mf {
    export class TBaseTreeNodes extends mf.TBaseElement {
        protected _treeView: mf.TBaseTreeView;
        protected _clearBeforeFill: boolean;
        public addedBuffer: Array<mf.TBaseTreeNode>;

        constructor(options) {
            super(options);
            this.element.setAttribute('data-role', TREE_ROLE.TREE_NODES);
        }

        public addNode(node: mf.TBaseTreeNode);
        public addNode(node: mf.ISearchIndexItem);
        public addNode(label: string, data: mf.IBaseNodeData);
        public addNode() {
            let args = arguments;
            if ((args[0] as Object).hasOwnProperty('str')) {
                (args[0] as mf.ISearchIndexItem).node.TreeView = this._treeView;
                this.element.appendChild((args[0] as mf.ISearchIndexItem).node.element);
                this.TreeView.searcher.addIndex(args[0]);
            }
            if (args[0] instanceof mf.TBaseTreeNode) {
                (args[0] as mf.TBaseTreeNode).TreeView = this._treeView;
                this.element.appendChild((args[0] as mf.TBaseTreeNode).element);
                this.TreeView.searcher.addIndex({node: args[0], str: (args[0] as mf.TBaseTreeNode).caption});
                return args[0];
            }
            if (typeof (args[0]) === 'string') {
                let node = new mf.TBaseTreeNode({data: args[1]});
                node.TreeView = this._treeView;
                this.element.appendChild(node.element);
                this.TreeView.searcher.addIndex({node: node, str: node.caption});
                return node;
            }
        }

        public removeNode(node: mf.TBaseTreeNode, _selidx?: number) {
            //            let _allidx = function(_n: mf.TBaseTreeNode){
            //                for (let i=0; i< _n.TreeView.all.length; i++){
            //                    if(_n.TreeView.all[i].node == _n){
            //                        return i;
            //                    }
            //                }
            //            };
            //            if (!_selidx) {
            //                try {
            //                    _selidx = this._treeView.selected.indexOf(node);
            //                } catch (err) {
            //                    console.error(err);
            //                }
            //            }
            this.element.removeChild(node.element);
            node = null;
        }

        protected _removeNodes() {
            //console.log(this.clearBeforeFill);
            if (this.clearBeforeFill) {
                while (this.element.firstChild) {
                    this.removeNode((this.element.firstChild as HTMLElement)._getObj() as mf.TBaseTreeNode);
                }
            }
        }

        /**
         * @returns {mf.TBaseTreeNode}
         */
        public getNode(idx: number) {
            return (this.siblings[idx] as HTMLElement)._getObj();
        };

        public set nodes(val: Array<mf.IBaseNodeData>) {
            if (val.length) {
                this._removeNodes();
                for (let i = 0; i < val.length; i++) {
                    try {
                        let node = new mf.TBaseTreeNode({
                            data: val[i],
                            TreeView: this._treeView,
                            expandAfterCreate: this.ownNode.expandAfterCreate
                        });
                        this.addNode(node);
                    } catch (err) {
                        //console.error(err);
                    }
                }
            }
        }

        /**
         * @returns {HTMLCollection<HTMLLiElement>}
         */
        public get siblings() {
            return this.element.children;
        }

        public get ownNode() {
            return this.element.parentElement._getObj() as mf.TBaseTreeNode;
        }

        public get count() {
            return this.siblings.length;
        }

        public set TreeView(val: mf.TBaseTreeView) {
            this._treeView = val;
        }

        public get TreeView() {
            return this._treeView;
        }

        public get tag() {
            return 'ul';
        }

        public set clearBeforeFill(val: boolean) {
            this._clearBeforeFill = val;
        }

        public get clearBeforeFill() {
            if (this._clearBeforeFill === undefined) {
                this._clearBeforeFill = true;
            }
            return this._clearBeforeFill;
        }

        /**
         * True если это верхний уровень дерева
         */
        public get isTopLevel() {
            return this._element.parentElement.getAttribute('data-role') == mf.TREE_ROLE.TREE_VIEW;
        }
    }
}