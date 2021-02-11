import { Timestamp } from "@firebase/firestore-types";
import { Receiver } from "model/receiver";

type Props = {
  orderDate: Timestamp;
  sentDate: Timestamp;
  paidDate: Timestamp;
  markSent: boolean;
  onClickBack: any;
  receiver: Receiver;
  targetCurrency: any;
  onMarkOrderUnpaid: any;
  onCancelOrder: any;
  cancelled: boolean;
  orderId: string;
};

function ActivitySummary({
  cancelled,
  orderDate,
  sentDate,
  paidDate,
  markSent,
  onClickBack,
  receiver,
  targetCurrency,
  onMarkOrderUnpaid,
  onCancelOrder,
  orderId
}: Props) {
  const activeClass = "TrackingItem-module_active__383Xc TrackingItem-module_success__35RX1";
  console.log('orderDate', orderDate.toDate().toDateString() )
  
  const renderCancelled = () => {
    return (
      <div className="ng-scope">
        <div className="ng-scope">
          <div className="row"></div>
          <div className="row ng-scope"></div>
          <div className="row">
            <dl className="col-sm-6">
              <dt className="ng-binding">Order number</dt>
              <dd className="ng-binding">{orderId}</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentInProgress = () => {
    return (
      <article className="Root-module_moneyTracker__1-iaL" data-version="0.7.1">
        <ul className="sequence sequence-lg sequence-animate sequence-info">
          <li>
            <div className="TrackingItem-module_dateLabel__3Vied">
             { orderDate ? (<span data-date="true">{orderDate && <span>{orderDate.toDate().toDateString()}</span>}</span>) : null }
            </div>
            <p className="">You set up your transfer</p>
          </li>
          <li className={`${orderDate && !paidDate && !sentDate && markSent ? "active" : ""}`}>
            <p className="TrackingItem-module_active__383Xc TrackingItem-module_info__2XUzw">
              Your money's on its way to us
            </p>
            <span className="subtitle">
              If it's your first time sending, it might take up to <strong>2 business days</strong> to get it to us.
              We'll let you know when it arrives.
            </span>
            <button
              onClick={onMarkOrderUnpaid}
              className="btn btn-info btn-sm have-not-paid Buttons-module_actionButton__3qx4x"
              type="button"
            >
              I've not paid
            </button>
          </li>
          <li className={`${orderDate && paidDate && !sentDate && markSent ? "active" : ""}`}>
            <div className="TrackingItem-module_dateLabel__3Vied">
             {paidDate ? <span data-date="true">{paidDate && (<span>{orderDate.toDate().toDateString()}</span>)}</span> : null}
            </div>
            <p className="">We receive your AUD</p>
          </li>
          <li className="">
            <div className="TrackingItem-module_dateLabel__3Vied">
            {sentDate ?  <span data-date="true">{sentDate && (<span>{orderDate.toDate().toDateString()}</span>)}</span>: null}
            </div>
            <p className="">We pay out your {targetCurrency}</p>
          </li>
        </ul>
      </article>
    );
  };

  const renderPaymentReceived = () => {
    return (
      <article className="Root-module_moneyTracker__1-iaL">
        <ul className="sequence sequence-lg sequence-animate sequence-success">
          <li className="">
            <div className="TrackingItem-module_dateLabel__3Vied">
              <span data-date="true">Today at 5:59 pm</span>
            </div>
            <p className="">You set up your transfer</p>
          </li>
          <li className="">
            <div className="TrackingItem-module_dateLabel__3Vied">
              <span data-date="true">Today at 6:00 pm</span>
            </div>
            <p className="">We received your AUD</p>
          </li>
          <li className="active">
            <p className="TrackingItem-module_active__383Xc TrackingItem-module_success__35RX1">
              Your money's being processed
            </p>
          </li>
          <li className="">
            <div className="TrackingItem-module_dateLabel__3Vied">
              <span data-date="true">Tomorrow</span>
            </div>
            <p className="">We pay out your {targetCurrency}</p>
          </li>
        </ul>
      </article>
    );
  };

  const renderBodyPanel = () => {
    if (cancelled) {
      return renderCancelled();
    }

    if (paidDate) {
      return renderPaymentReceived()
    }

    return renderPaymentInProgress()
  }
  return (
    <>
      <div className="media">
        <div className="media-left">
          <div className="circle circle-sm circle-inverse circle-responsive invisible"></div>
        </div>
        <div className="media-body">
          <hr className="m-t-0 hidden-xs hidden-sm" />
          <a href="" className="visible-xs-inline-block visible-sm-inline-block text-no-decoration m-t-1 tw-card-back">
            <span className="tw-icon tw-icon-arrow-left ng-scope">
              <svg ng-switch-when="24" width="24" height="24" fill="currentColor" className="ng-scope">
                <path d="M5.814 13H22v-2H5.814l6.893-6.893L11.293 2.7 2 12l9.293 9.3 1.414-1.407L5.814 13z"></path>
              </svg>
            </span>
          </a>
          {renderBodyPanel()}
        </div>
      </div>
    </>
  );
}

export default ActivitySummary;
