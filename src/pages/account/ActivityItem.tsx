import { Receiver } from "model/receiver";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { RootState } from "app/rootReducer";
import { TWSpinner } from "./TWSpinner";
import ActivitySummary from "./ActivitySummary";
import ReadyToPay from "./ReadyToPay";

type Props = {
  orderId: string;
  selectedActivity: string;
  onMarkOrderPaid: any;
  receivers: Receiver[];
  onClickBack: any;
  onCancelOrder: any;
  onClickActivity: any;
  onNavigateToPay: any;
  sendAmount: any;
  receiveAmount: any;
  targetCurrency: any;
  receiverId: string;
  paid: boolean;
  cancelled: boolean;
  needsAttention?: boolean;
  subtext: string;
  pastOrders?: boolean;
  inProgress?: boolean;
  orderDate: any;
  sentDate: any;
  paidDate: any;
  markSent: any;
  onMarkOrderUnpaid: any;
  id: string;
};

const WarningIcon = () => (
  <div className="circle circle-sm circle-responsive circle-inverse">
    <div className="circle circle-sm circle-responsive warning">
      <span className="tw-icon tw-icon-alert ng-scope">
        <svg ng-switch-when="24" width="24" height="24" fill="currentColor">
          <path d="M13 9v5h-2V9h2zM12 18.2a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.739 3.06c-.767-1.349-2.711-1.349-3.478 0L1.198 19.013C.44 20.345 1.403 22 2.937 22h18.126c1.534 0 2.497-1.655 1.74-2.988L13.738 3.061zM12 4.05L2.937 20h18.126L12 4.05z"
          ></path>
        </svg>
      </span>
    </div>
  </div>
);

const SentIcon = () => (
  <span className="tw-icon tw-icon-send">
    <svg width="24" height="24" fill="currentColor" className="ng-scope">
      <path d="M12.555 13.612l3.494-7.736 1.261 3.466 1.88-.684-2.395-6.578-1.43.52-.026-.012-.012.027-5.11 1.86.685 1.879 3.275-1.192-3.445 7.626a5.87 5.87 0 011.823.824z"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.75 18.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zm-2 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
      ></path>
    </svg>
  </span>
);

function ActivityItem({
  id,
  orderId,
  sendAmount,
  receiveAmount,
  targetCurrency,
  receiverId,
  receivers,
  needsAttention = false,
  subtext,
  cancelled,
  onMarkOrderPaid,
  onNavigateToPay,
  onClickActivity,
  onCancelOrder,
  onClickBack,
  selectedActivity,
  orderDate,
  sentDate,
  paidDate,
  markSent,
  onMarkOrderUnpaid
}: Props) {
  const receiver = receivers.find(receiver => receiver.id === receiverId);
  const isActive = id === selectedActivity;

  const { updatingOrder } = useSelector((state: RootState) => state.order);

  const renderPanel = needsAttention => {
    if (updatingOrder === "pending") {
      return <TWSpinner onClickBack={onClickBack} />;
    }
    if (needsAttention) {
      return (
        <ReadyToPay
          onNavigateToPay={onNavigateToPay}
          onCancelOrder={onCancelOrder}
          onMarkOrderPaid={onMarkOrderPaid}
          onClickBack={onClickBack}
        />
      );
    }
    return (
      <ActivitySummary
        orderId={orderId}
        cancelled={cancelled}
        orderDate={orderDate}
        sentDate={sentDate}
        paidDate={paidDate}
        markSent={markSent}
        onClickBack={onClickBack}
        targetCurrency={targetCurrency}
        onMarkOrderUnpaid={onMarkOrderUnpaid}
        onCancelOrder={onCancelOrder}
        receiver={receiver}
      />
    );
  };

  const renderBody = () => {
    return (
      <div className="media-body">
        <div className="media">
          <div className="media-body">
            <h5 className="list-group-item-heading text-max-width">
              <span>
                To{" "}
                <strong>
                  {receiver.firstName} {receiver.lastName}
                </strong>
              </span>
            </h5>
            <p className="small m-b-0 text-max-width">
              <span className="list-group-item-text">{subtext}</span>
            </p>
          </div>
          <div className="media-right text-xs-right">
            <p className="m-y-0 h5">
              <span>
                {receiveAmount.toFixed(2)} {targetCurrency}{" "}
              </span>
            </p>
            <p className="m-y-0 small">
              <span>{sendAmount.toFixed(2)} AUD</span>
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <li
      className={`list-group-item p-a-0 list-group-item- ${isActive ? "active" : null} ${
        cancelled ? "disabled" : null
      }`}
    >
      <div className="p-a-panel" onClick={onClickActivity}>
        <div className="media">
          <div className="media-left">
            <div className="circle circle-sm circle-responsive circle-inverse">
              <div>
                <div className="circle circle-sm circle-responsive circle-inverse">
                  {needsAttention ? <WarningIcon /> : <SentIcon />}
                </div>
              </div>
            </div>
          </div>
          {renderBody()}
          <div className="media-right">
            <span className="tw-icon tw-icon-chevron-down">
              <svg width="16" height="16" fill="currentColor" className="ng-scope">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 11.8L1.4 5.147 2.537 4 8 9.507 13.463 4 14.6 5.146 8 11.8z"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>

      {isActive && (
        <div className="collapse ng-scope in">
          <div className="p-l-panel p-r-panel p-b-panel">{renderPanel(needsAttention)}</div>
        </div>
      )}

      <div ng-transclude="modals"></div>
    </li>
  );
}

export default ActivityItem;
