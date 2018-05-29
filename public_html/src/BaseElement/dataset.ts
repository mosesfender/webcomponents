module mf {
    export enum TDatasetClasses {
        TDataset = "TDataset",
        TAjaxDataset = "TAjaxDataset",
        TGooleMapDataset = "TGoogleMapDataset",
    };
    
    export enum TFieldTypes {NUMBER, STRING};

    export interface IDefField {
        fieldName: string,
        fieldType: number,
    }

    export class TDataset { 
        protected owner: TBaseDataElement;
        protected _data: Array<Object> = [];
        protected _selectValue: any;
        protected flagBof: boolean = false;
        protected flagEof: boolean = false;
        protected cursor: number = 0;
        public defFields: Array<IDefField> = [];

        public constructor(owner: TBaseDataElement) {
            this.owner = owner;
        }

        public loadData(data: Array<Object>) {
                    console.log(this);
            this.data = data;
            this.owner.loaded.call(this.owner);
        }

        protected defineFields() {
            this.defFields = [];
            if (this._data.length > 0) {
                for (let p in this._data[0]) {
                    let ftype = TFieldTypes.STRING;
                    if (isInteger(this.data[0][p])) {
                        ftype = TFieldTypes.NUMBER;
                    }
                    this.defFields.push({
                        fieldName: p,
                        fieldType: ftype
                    })
                }
            }
        }

        public issetField(fieldName: string) {
            for (let i = 0; i < this.defFields.length; i++) {
                if (fieldName == this.defFields[i].fieldName) {
                    return this.defFields[i];
                }
            }
            return false;
        }

        public first() {
            return this.setIndex(0);
        }

        public prev() {
            return this.setIndex(this.cursor - 1);
        }

        public next() {
            return this.setIndex(this.cursor + 1);
        }

        public last() {
            return this.setIndex(this._data.length - 1);
        }

        public current() {
            try {
                return this.setIndex(this.cursor);
            } catch (err) {
                this.cursor = 0;
                return this.setIndex(this.cursor);
            }
        }

        public goTo(idx: number);
        public goTo(field: string, value: any);
        public goTo(a: any, value?: any) {
            if (typeof a == 'string') {
                return this.goTo(this.findIndex(a, value));
            } else if (typeof a == 'number') {
                return this.setIndex(a);
            }
        }

        protected findIndex(field: string, value: string | number) {
            try {
                for (let i = 0; i < this._data.length; i++) {
                    if (value == this._data[i][field]) {
                        return i;
                    }
                }
            } catch (err) {
                console.error(err);
            }
            return 0;
        }

        public size() {
            return this._data.length;
        }

        protected setIndex(idx: number) {
            try {
                this.flagBof = false;
                this.flagEof = false;
                if (idx < 0) {
                    idx = 0;
                    this.flagBof = true;
                }
                if (idx >= this._data.length) {
                    idx = this._data.length - 1;
                    this.flagEof = true;
                }
                this.cursor = idx;
                return this._data[this.cursor];
            } catch (err) {
                this.cursor = 0;
            }
        }

        /**
         * @returns {TDataField}
         */
        public fieldByName(fieldName) {
            let ret = new TDataField();
            ret.name = fieldName;
            if ((this.data[this.cursor] as Object).hasOwnProperty(fieldName)) {
                ret.value = this.data[this.cursor][fieldName];
            } else {
                ret.value = '';
            }
            return <TDataField> ret;
        }
        
        public column(fieldName){
            let ret = [];
            [].map.call(this._data, function(row){
                if(row[fieldName]){
                    ret.push(row[fieldName]);
                }
            });
            return ret;
        }

        public get Bof() {
            return this.flagBof;
        }
        public get Eof() {
            return this.flagEof;
        }

        public get index() {
            return this.cursor;
        }

        public set data(data: any) {
            this._data = data;
            this.defineFields();
        }
        public get data() {
            return this._data;
        }

        public get isActive() {
            return this.size() > 0;
        }

        public set selectValue(val: string | number) {
            try {
                this._selectValue = val;
                this.findIndex(this._selectValue, this.owner.keyFieldName);
            } catch (err) {

            }
        }
    }

    export class TDataField {
        name: string;
        value: any;

        public asString() {
            return this.value.toString();
        }
        public asInteger() {
            return parseInt(this.value);
        }
    }
}