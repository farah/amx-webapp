

function RepeatTransfer() {
    return (
        <div className="p-y-3 bg-default p-l-panel p-r-panel ng-scope">
            <div className="media">
                <div className="media-left">
                    <div className="circle circle-sm circle-responsive invisible"></div>
                </div>
                <div className="media-body">
                    <form className="ng-valid ng-valid-min ng-valid-max ng-valid-validation ng-valid-required ng-dirty">
                        <div className="row">
                            <div className="col-sm-6 col-lg-4">
                                <div className="form-group m-b-0">
                                    <label className="control-label ng-binding">You send (approximately)</label>
                                    <div className="input-group"> <input type="text" autoComplete="off" name="amount" step="any" className="form-control p-r-0 ng-pristine ng-untouched ng-valid ng-isolate-scope ng-not-empty" placeholder="" /> <span className="hello-world input-group-addon tw-currency-input-code p-l-1 ng-binding"> <span></span> AUD </span> </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4">
                                <div className="form-group m-b-0">
                                    <label className="control-label ng-binding">Recipient will get exactly</label>
                                    <div className="input-group"> <input type="text" autoComplete="off" name="amount" step="any" className="form-control p-r-0 ng-pristine ng-untouched ng-valid ng-isolate-scope ng-not-empty" placeholder="" /> <span className="hello-world input-group-addon tw-currency-input-code p-l-1 ng-binding"> <span></span> USD </span> </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-lg-4 p-t-3 m-b-0">
                                <button type="submit" className="btn btn-success btn-block ng-binding">
                                    Repeat transfer
                  </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RepeatTransfer;
