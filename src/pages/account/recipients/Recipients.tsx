import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "contexts/Firebase";
import { Receiver } from "model/receiver";
import { AppDispatch } from "app/store";
import { RootState } from "app/rootReducer";
import { deleteReceiver } from "store/receiver/receiverSlice";
import AddReceiverModal from "../../transferFlow/recipient/AddReceiverModal";
import ReceiverList from "./ReceiverList";
import PreloadAccountIndicator from "./PreloadAccountIndicator";

type Props = {
  receivers: Receiver[];
  onSendMoney: any;
};

function Recipients({ receivers, onSendMoney }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuth();

  const [open, setOpen] = React.useState(false);
  const [selectedReceiverId, setSelectedReceiver] = React.useState(null);

  const user = useSelector((state: RootState) => state.user);
  const { deletingReceiver, fetchingReceivers } = useSelector((state: RootState) => state.receivers);
  const { fetchingOrders, orders } = useSelector((state: RootState) => state.order);

  const handleAdd = event => {
    if (event.target === event.currentTarget) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectReceiver = id => {
    const ordersId = id !== selectedReceiverId ? id : null;
    setSelectedReceiver(ordersId);
  };

  const handleDeleteReceiver = async receiverId => {
    
    await dispatch(deleteReceiver({ userId, receiverId }));
  };

  return (
    <>
      <AddReceiverModal name={"createReceiver"} title="Add receiver" open={open} onClose={handleClose} />

      <div className="nav-toolbar">
        <div className="container m-l-0">
          <div className="row">
            <div className="action-buttons m-b-2 col-xs-12 col-sm-8 col-md-9">
              &nbsp;
              <button onClick={e => handleAdd(e)} type="button" className="btn btn-sm np-btn np-btn-sm btn-default">
                Add a recipient
              </button>
            </div>

            {receivers && receivers.filter(receiver => receiver.visible).length > 4 && (
              <div className="m-b-2 col-xs-12 col-sm-4 col-md-3">
                <div className="input-group input-group-sm">
                  <input type="text" className="search-input form-control" placeholder="Search..." value="" />
                  <span className="input-group-addon">
                    <span className="tw-icon tw-icon-search " aria-hidden="true" role="presentation">
                      <svg width="16" height="16" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.35 12.484a7 7 0 111.133-1.133l3.517 3.508L14.86 16l-3.51-3.515zM12.4 7A5.4 5.4 0 111.6 7a5.4 5.4 0 0110.8 0z"
                        ></path>
                      </svg>
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {user.loading === "pending" ||
      fetchingReceivers === "pending" ||
      fetchingOrders === "pending" ||
      !receivers ||
      !orders ? (
        <PreloadAccountIndicator />
      ) : (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title h6">Your recipients</h3>
            </div>
            <ReceiverList
              receivers={receivers}
              selectedReceiverId={selectedReceiverId}
              onSelectReceiver={handleSelectReceiver}
              onDeleteReceiver={handleDeleteReceiver}
              deletingReceiver={deletingReceiver}
              onSendMoney={onSendMoney}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Recipients;
