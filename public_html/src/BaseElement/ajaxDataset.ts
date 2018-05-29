module mf {
    export enum RequestMethods {
        GET = "GET",
        POST = "POST"
    };

    export class TAjaxDataset extends TDataset {
        public baseUrl: string;
        public requestParams: Object = {};
        public requestMethod: RequestMethods = RequestMethods.GET;

        public constructor(owner: TBaseDataElement) {
            super(owner);
            this.owner = owner;
        }

        public loadData();
        public loadData(data: Array<Object>);
        public loadData(params: Object);
        public loadData(params?: Object) {
            let _that = this;
            if (arguments.length) {
                if (isArray(params)) {
                    super.loadData(params as Array<Object>);
                    return true;
                } else {
                    this.requestParams = params;
                }
            }

            fetch(_that.baseUrl)
                .then(function (resp: Response) {

                }).catch()

            //            $.ajax({
            //                url: _that.baseUrl,
            //                data: _that.requestParams,
            //                method: _that.requestMethod,
            //                dataType: 'json',
            //                success: function (data: any, textStatus: string, jqXHR: JQueryXHR) {
            //                    _that.data = data;
            //                    _that.owner.loaded();
            //                }
            //            });
        }
    }
}

