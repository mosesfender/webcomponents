module mf {

    export class TTreeViewSearcher extends mf.TBaseElement {
        protected _element: HTMLInputElement;

        protected _searchedNodes: Array<mf.TBaseTreeNode> = [];

        constructor(options?) {
            super(options);
            let _that = this;
            this._element.eventListener('keyup', function (ev: KeyboardEvent) {
                _that.findTitleInNodes(_that._element.value);
            });
        }

        protected _innerInit(options) {
            this._element = Html.createElementEx('input', options['parent'], {'type': 'text', 'data-role': 'treeview-searcher'}) as HTMLInputElement;
        }

        protected _setFind(node: mf.TBaseTreeNode) {
            this._searchedNodes.push(node);
            node.element.classList.remove('hidden');
            node.element.classList.add('findres');
            node.element.scrollIntoView();
            this.TreeView.recursiveExpand(node);
        }

        protected _setUnfinded(node: mf.TBaseTreeNode) {
            node.element.classList.add('hidden');
        }

        protected _clearFindRes(all?: boolean) {
            [].map.call(all ? this.TreeView.all : this._searchedNodes, function (node: mf.TBaseTreeNode) {
                node.element.classList.removeMany('findres hidden');
            });
        }

        public findTitleInNodes(title: string) {

            function overlapWord(word: string, origin: string) {
                return origin.toLowerCase() == word.toLowerCase();
            }
            function overlapWordFromLeft(word: string, origin: string) {
                return origin.toLowerCase().substring(0, word.length) == word.toLowerCase();
            }
            function overlapWordFromRight(word: string, origin: string) {
                return origin.toLowerCase().substr(0 - word.length) == word.toLowerCase();
            }
            function overlapSearch(word: string, origin: string) {
                return origin.toLowerCase().match(word.toLowerCase());
            }

            if (title.trim() == '') {
                this._clearFindRes(true);
                return false;
            }

            this._clearFindRes();
            let _method = 0;
            if (title.substring(0, 1) == "*") {
                title = title.substr(1);
                _method = _method | 1;
            }
            if (title.substr(-1) == "*") {
                title = title.substr(0, title.length - 1);
                _method = _method | 2;
            }

            for (let i = 0; i < this.TreeView.all.length; i++) {
                switch (_method) {
                    //                    case 0:                         /* точное совпадение */
                    //                        if (overlapWord(title, this.TreeView.all[i].data.caption)) {
                    //                            this._setFind(this.TreeView.all[i]);
                    //                        }
                    //                        break;
                    case 0:                         /* точное совпадение */
                    case 2:                         /* совпадение слева */
                        if (overlapWordFromLeft(title, this.TreeView.all[i].data.caption)) {
                            this._setFind(this.TreeView.all[i]);
                        } else {
                            this._setUnfinded(this.TreeView.all[i]);
                        }
                        break;
                    case 1:                         /* совпадение справа */
                        if (overlapWordFromRight(title, this.TreeView.all[i].data.caption)) {
                            this._setFind(this.TreeView.all[i]);
                        } else {
                            this._setUnfinded(this.TreeView.all[i]);
                        }
                        break;
                    case 3:                         /* совпадение в поиске строки */
                        if (overlapSearch(title, this.TreeView.all[i].data.caption)) {
                            this._setFind(this.TreeView.all[i]);
                        } else {
                            this._setUnfinded(this.TreeView.all[i]);
                        }
                        break;
                }
            }
        }

        public get TreeView() {
            return (this._element.nextSibling as HTMLElement)._getObj() as mf.TBaseTreeView;
        }

    }
}
