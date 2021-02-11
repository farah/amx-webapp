import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { AppDispatch } from "app/store";
import { RootState } from "app/rootReducer";
import Calculator from "components/Calculator";
import { startTransfer } from "store/flow/flowSlice";

function Amount() {
  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { sendAmount } = useSelector((state: RootState) => state.calculator);
  const { orderId, orderComplete } = useSelector((state: RootState) => state.transferFlow);

  const user = useSelector((state: RootState) => state.user);

  const userProfile = user.userProfile;
  const userInfoComplete = userProfile?.userInfoComplete;
  const handleNext = () => {
    if (sendAmount < 20) {
      return;
    }
    dispatch(startTransfer());
    if (userInfoComplete) {
      navigate("/transfer/recipient");
    } else {
      navigate("/transfer/sender");
    }
  };

  if (orderComplete) {
    return <Navigate to={`/transfer/pay/${orderId}`} replace={true} />
  }

  return (
    <>
      <div className="row tw-enter-transfer" data-testid="enter-transfer">
        <div className="">
          <div className="row m-b-3">
            <div className="col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
              <div className="tabs">
                <div className="tabs__panel-container" style={{ overflow: "visible" }}>
                  <div className="tabs__slider" style={{ width: "100%", transform: "translateX(0px)" }}>
                    <div
                      className="tabs__panel"
                      role="tabpanel"
                      id="calculator-tabs-panel-0"
                      aria-labelledby="calculator-tabs-tab-0"
                      style={{ width: "100%", display: "block" }}
                    >
                      <Calculator handleContinue={handleNext} disabled={sendAmount < 20} showButton  showPaymentOptions/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Amount;
