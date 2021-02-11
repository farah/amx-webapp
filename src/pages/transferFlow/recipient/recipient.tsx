import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { AppDispatch } from "app/store";
import { RootState } from "app/rootReducer";
import { selectRecipient } from "store/receiver/receiverSlice";
import AddReceiverModal from "./AddReceiverModal";
import ReceiverList from "./ReceiverList";
import LoadingSpinner from "components/LoadingSpinner";

const fakeWait = async ms => new Promise(resolve => setTimeout(resolve, ms));

function Recipient() {
  const { receivers, fetchingReceivers } = useSelector((state: RootState) => state.receivers);
  const { orderId, orderComplete } = useSelector((state: RootState) => state.transferFlow);
  const [open, setOpen] = React.useState(false);
  const [fakeSelecting, setFakeSelecting] = React.useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleAdd = event => {
      setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = async (event, id) => {
    setFakeSelecting(true)
    await fakeWait(1000)
    dispatch(selectRecipient(id));
    setFakeSelecting(false)
    navigate("/transfer/review");
  };


  if (orderComplete) {
    return <Navigate to={`/transfer/pay/${orderId}`} replace={true} />
  }
  return (
    <div className="row">
      <div className="col-md-offset-2 col-md-8 tw-beneficiaries ">
        {fetchingReceivers === "pending" ? (
          <LoadingSpinner loading={true} />
        ) : (
          <React.Fragment>
            <header className="transfer-flow-main__header ">
              <h2 className="text-xs-left text-sm-center">Who are you sending money to?</h2>
            </header>
            <div className="">
              <div className="">
                <section className="m-b-5">
                  {receivers.length > 4 && (
                    <div className="input-group tw-beneficiaries__search">
                      <input type="text" className="form-control" placeholder="Search" />
                      <span className="input-group-addon">
                        <span className="tw-icon tw-icon-search " aria-hidden="true" role="presentation">
                          <svg width="24" height="24" fill="currentColor" focusable="false">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15.76 17.178a8.5 8.5 0 111.418-1.418L22 20.543 20.543 22l-4.783-4.822zM17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                            ></path>
                          </svg>
                        </span>
                      </span>
                    </div>
                  )}
                  { receivers.filter(receiver => receiver.visible).length > 0 && <p className="h6 text-primary m-t-3 m-b-2">Your recipients</p> }
                  <ReceiverList
                    receivers={receivers}
                    handleSelect={handleSelect}
                    loading={fakeSelecting}
                  />

                  {receivers.length > 4 && (
                    <div className="m-t-4 row d-flex justify-content-center">
                      <div className="col-xs-12 col-sm-5">
                        <button
                          type="button"
                          className="btn btn-sm np-btn np-btn-sm btn-default btn-block np-btn-block"
                        >
                          Show more
                        </button>
                      </div>
                    </div>
                  )}
                </section>

                <section className="m-b-5">
                  {/* <p className="h6 text-primary m-b-2">New recipient</p> */}
                  <div className="np-decision np-decision--small">
                    <div onClick={e => handleAdd(e)}  className="np-size-swapper d-flex" style={{ visibility: "visible" }}>
                      <a
                        className="decision flex-column np-tile text-no-decoration text-xs-center np-decision__tile--small np-tile--small p-a-2"
                        aria-label="Someone else"
                      >
                        <div className="np-tile__media d-flex justify-content-center">
                          <div className="tw-avatar tw-avatar--md tw-avatar--icon tw-avatar--light">
                            <div className="tw-avatar__content">
                              <span className="tw-icon tw-icon-recipients " aria-hidden="true" role="presentation">
                                <svg width="24" height="24" fill="currentColor" focusable="false">
                                  <path d="M15.5 2a4.493 4.493 0 00-3.561 1.749 6.733 6.733 0 011.545 1.273A2.5 2.5 0 1115.18 8.98a6.839 6.839 0 01-.144 1.996A4.5 4.5 0 1015.5 2zM15.5 15c-.201 0-.397.004-.588.01a13.836 13.836 0 00-1.82-.631c.418-.394.786-.84 1.092-1.33A17.48 17.48 0 0115.5 13c3.403 0 5.627.934 6.912 1.748 1.18.748 1.588 2.06 1.588 3.2V19h-2v-1.052c0-.732-.258-1.257-.658-1.51C20.369 15.82 18.515 15 15.5 15z"></path>
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4 9.5a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM8.5 7a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                                  ></path>
                                  <path d="M17 20.948V22h-2v-1.052c0-.732-.258-1.257-.658-1.51C13.369 18.82 11.515 18 8.5 18c-3.015 0-4.87.821-5.842 1.437-.4.254-.658.78-.658 1.511V22H0v-1.052c0-1.14.407-2.452 1.588-3.2C2.873 16.934 5.098 16 8.5 16c3.403 0 5.627.934 6.912 1.748 1.18.748 1.588 2.06 1.588 3.2z"></path>
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="np-tile__title">Add new receiver</div>
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <AddReceiverModal name={"newReceiverForm"} title="Add receiver" open={open} onClose={handleClose} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Recipient;
