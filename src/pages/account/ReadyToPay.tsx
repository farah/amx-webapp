type Props = {
  onCancelOrder: any;
  onMarkOrderPaid: any;
  onNavigateToPay: any;
  onClickBack: any;
};
function ReadyToPay({ onCancelOrder, onMarkOrderPaid, onNavigateToPay, onClickBack }: Props) {
  return (
    <div className="media">
      <div className="media-left">
        <div className="circle circle-sm circle-inverse circle-responsive invisible"></div>
      </div>
      <div className="media-body">
        <hr className="m-t-0 hidden-xs hidden-sm" />
        <a
          onClick={onClickBack}
          className="visible-xs-inline-block visible-sm-inline-block text-no-decoration m-t-1 tw-card-back"
        >
          <span ng-switch="$ctrl.size" ng-if="!$ctrl.filled" className="tw-icon tw-icon-arrow-left ng-scope">
            <svg ng-switch-when="24" width="24" height="24" fill="currentColor" className="ng-scope">
              <path d="M5.814 13H22v-2H5.814l6.893-6.893L11.293 2.7 2 12l9.293 9.3 1.414-1.407L5.814 13z"></path>
            </svg>
          </span>
        </a>
        <div>
          <div>
            <div>
              <div className="hidden-xl hidden-lg hidden-md m-b-3 m-t-2 hidden-sm hidden-xs">
                <h2>
                  To <strong>abdi farah</strong>
                </h2>
                <p className="small m-b-0 text-max-width">
                  <span className="list-group-item-text ng-binding">Sending paused</span>
                </p>
              </div>
              <div>
                <h2 className="m-b-2 activity-title ng-binding">Ready to pay?</h2>
                <p className="text-max-width ng-binding">
                  Next, send your money to our AUD account. We'll get started on your transfer the moment we receive
                  your money.
                </p>
              </div>
              <div className="btn-toolbar ng-scope">
                <hr className="hidden-xs hidden-sm hidden-md" />
                <button onClick={onNavigateToPay} className="btn btn-success ng-binding ng-scope">
                  Choose how to pay
                </button>
                <button onClick={onMarkOrderPaid} className="btn btn-default ng-binding ng-scope">
                  I've now paid
                </button>
                <button onClick={onCancelOrder} className="btn btn-danger pull-md-right m-b-0 ng-binding ng-scope">
                  Cancel transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadyToPay;
