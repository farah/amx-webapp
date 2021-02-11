import { Receiver } from "model/receiver";
import { TWSpinner } from "./TWSpinner";

type Props = {
  receiver: Receiver;
  selectedReceiverId: string;
  onSelectReceiver: any;
  onDeleteReceiver: any;
  deletingReceiver: string;
  onSendMoney: any;
};

function ReceiverItem({
  receiver,
  selectedReceiverId,
  onSelectReceiver,
  onDeleteReceiver,
  deletingReceiver,
  onSendMoney
}: Props) {
  const isActive = selectedReceiverId === receiver.id;

  const renderPanel = () => {
    if (deletingReceiver === "pending") {
      return <TWSpinner onClickBack={() => {}} />;
    }
    return (
      <div className="p-l-panel p-r-panel p-b-panel tw-card__content">
        <div className="media">
          <div className="media-left">
            <div className="circle circle-sm circle-inverse circle-responsive invisible"></div>
          </div>
          <div className="media-body">
            <hr className="m-t-0 hidden-xs hidden-sm" />
            <div>
              <dl className="tw-definition-list d-flex  tw-definition-list--columns flex-column flex-row--sm">
                <div className="tw-definition-list__item">
                  <dt>City</dt>
                  <dd className="">{receiver.city}</dd>
                </div>
                <div className="tw-definition-list__item">
                  <dt>Mobile</dt>
                  <dd className="">
                    <span>{receiver.mobile}</span>
                  </dd>
                </div>
              </dl>
              <hr className="hidden-xs hidden-sm hidden-md" />
              <div className="btn-toolbar btn-toolbar-lg">
                <button onClick={onSendMoney} type="button" className="btn btn-md np-btn np-btn-md btn-success">
                  Send money
                </button>
                <span className="pull-lg-right">
                  <button onClick={onDeleteReceiver} type="button" className="btn btn-md np-btn np-btn-md btn-danger">
                    Delete recipient
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <li className={`tw-card list-group-item p-a-0 account-card ${isActive ? "active" : ""}`}>
        <div onClick={onSelectReceiver} className="p-a-panel tw-card__panel" role="button">
          <div className="media">
            <div className="media-left">
              <div className="circle circle-sm text-primary">
                <div className="tw-badge tw-badge-border-light tw-badge-sm">
                  <div className="tw-badge__children">
                    <div className="tw-avatar tw-avatar--md tw-avatar--initials tw-avatar--light">
                      <div className="tw-avatar__content" style={{ backgroundColor: "white" }}>
                        <small>AN</small>
                      </div>
                    </div>
                  </div>
                  <div className="tw-badge__content">
                    <img src="https://transferwise.com/public-resources/assets/flags/square/usd.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="media-body">
              <div className="h5">
                {receiver.firstName} {receiver.lastName}
              </div>
              <div className="decision__content">
                <span className="list-group-item-text small text-max-width">
                  <span>{receiver.city}</span>
                </span>
              </div>
            </div>
            <div className="media-right">
              <span
                className="tw-icon tw-icon-chevron-up tw-chevron chevron-color bottom"
                aria-hidden="true"
                role="presentation"
              >
                <svg width="16" height="16" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 4l-6.6 6.653L2.537 11.8 8 6.293l5.463 5.507 1.137-1.147L8 4z"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>

        {isActive && renderPanel()}
      </li>
    </>
  );
}

export default ReceiverItem;
