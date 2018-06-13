module mf {

    export interface ISearchIndexItem {
        str: string | Array<string>;
        node: mf.TBaseTreeNode;
    }

    export type TSearchIndex = Array<mf.ISearchIndexItem>;

    export class TTreeViewSearcher extends mf.TBaseElement {
        public owner: mf.TBaseTreeView;
        protected _element: HTMLInputElement;

        protected _index: mf.TSearchIndex = [];
        protected _searchedNodes: mf.TSearchIndex = [];

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

        public addIndex(item: mf.ISearchIndexItem) {
            try {
                this.owner.all.push(item);
            } catch (err) {
                //console.error(err);
            } finally {
                //console.log(item.str);
            }
        }

        public _setFind(_item: mf.ISearchIndexItem) {
            _item.node.element.classList.remove('hidden');
            _item.node.element.classList.add('findres');
            this._searchedNodes.push(_item);
        }

        public _setUnfinded(_item: mf.ISearchIndexItem) {
            _item.node.element.classList.add('hidden');
        }

        public _clearFindRes(all?: boolean) {
            [].map.call(all ? this.owner.all : this._searchedNodes, function (_item: mf.ISearchIndexItem) {
                _item.node.element.classList.removeMany('findres hidden');
            });
        }

        public findTitleInNodes(ttl: string | Array<string>) {
            let _that = this;
            this._searchedNodes = [];

            if (typeof ttl == 'string') {
                ttl = [ttl];
            }

            for (let t = 0; t < ttl.length; t++) {

                let title = ttl[t].toLowerCase();

                if (title.trim() == '') {
                    this._clearFindRes(true);
                    return false;
                }

                this._clearFindRes(true);
                let _method = 0;
                if (title.substring(0, 1) == "*") {
                    title = title.substr(1);
                    _method = _method | 1;
                }
                if (title.substr(-1) == "*") {
                    title = title.substr(0, title.length - 1);
                    _method = _method | 2;
                }

                for (let i = 0; i < this.owner.all.length; i++) {
                    switch (_method) {
                        //                    case 0:                         /* точное совпадение */
                        //                        if (overlapWord(title, this.TreeView.all[i].data.caption)) {
                        //                            this._setFind(this.TreeView.all[i]);
                        //                        }
                        //                        break;
                        case 0:                         /* точное совпадение */
                        case 2:                         /* совпадение слева */
                            if (this.overlapWordFromLeft(title, this.owner.all[i].str)) {
                                this._setFind(this.owner.all[i]);
                            } else {
                                this._setUnfinded(this.owner.all[i]);
                            }
                            break;
                        case 1:                         /* совпадение справа */
                            if (this.overlapWordFromRight(title, this.owner.all[i].str)) {
                                this._setFind(this.owner.all[i]);
                            } else {
                                this._setUnfinded(this.owner.all[i]);
                            }
                            break;
                        case 3:                         /* совпадение в поиске строки */
                            if (this.overlapSearch(title, this.owner.all[i].str)) {
                                this._setFind(this.owner.all[i]);
                            } else {
                                this._setUnfinded(this.owner.all[i]);
                            }
                            break;
                    }
                }
            }

            [].map.call(this._searchedNodes, function (_item: mf.ISearchIndexItem) {
                _item.node.element.scrollIntoView();
                _that.owner.recursiveExpand.call(_that, _item.node);
            });
        }

        protected overlapWord(word: string, origin: string | Array<string>) {
            if (typeof origin == 'string') {
                origin = [origin];
            }
            for (let i = 0; i < origin.length; i++) {
                if (origin[i] == word) {
                    return true;
                }
            }
            return false
        }
        protected overlapWordFromLeft(word: string, origin: string | Array<string>) {
            if (typeof origin == 'string') {
                origin = [origin];
            }
            for (let i = 0; i < origin.length; i++) {
                if (origin[i].substring(0, word.length) == word) {
                    return true;
                }
            }
            return false
        }
        protected overlapWordFromRight(word: string, origin: string | Array<string>) {
            if (typeof origin == 'string') {
                origin = [origin];
            }
            for (let i = 0; i < origin.length; i++) {
                if (origin[i].substr(0 - word.length) == word) {
                    return true;
                }
            }
            return false
        }

        protected overlapSearch(word: string, origin: string | Array<string>) {
            if (typeof origin == 'string') {
                origin = [origin];
            }
            for (let i = 0; i < origin.length; i++) {
                if (origin[i].match(word)) {
                    return true;
                }
            }
            return false
        }

        public get TreeView() {
            return (this._element.nextSibling as HTMLElement)._getObj() as mf.TBaseTreeView;
        }

        public get searchedNodes() {
            return this._searchedNodes;
        }

        public set searchedNodes(val) {
            this._searchedNodes = val;
        }

    }
}
