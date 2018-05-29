module mf {
    export class TBaseDataElement extends mf.TBaseElement {
        protected _dataset: TDataset;
        public keyFieldName: string;

        constructor(options) {
            super(options);
            this._dataset = new TDataset(this);
        }

        public loaded(aowner: TBaseElement) {}

        public get dataset() {
            return this._dataset;
        }
    }
}


