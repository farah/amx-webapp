import React from "react";
import { Routes, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { RootState } from "app/rootReducer";
import { useAuth } from "contexts/Firebase";
import { fetchUser } from "store/user/userSlice";
import { getExchangeRate } from "store/calculator/calculatorSlice";
import { fetchRecipients } from "store/receiver/receiverSlice";
import { fetchOrdersAction } from "store/order/orderSlice";
import { setOrderComplete, setOrderId } from "store/flow/flowSlice";

import { PrivateRoute } from "utils/routes";
import Navigation from "./navigation";
import Amount from "./amount";
import SenderDetails from "./sender";
import ReceiverDetails from "./recipient";
import Pay from "./pay";
import Review from "./review";

type Props = {
  history: any;
};

function TransferFlow({ history }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  let navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);

  const user = useSelector((state: RootState) => state.user);
  const { fetchingReceivers, receivers } = useSelector((state: RootState) => state.receivers);
  const { steps, orderComplete } = useSelector((state: RootState) => state.transferFlow);
  const { fetchingOrders, orders } = useSelector((state: RootState) => state.order);

  const { userId } = useAuth();

  React.useEffect(() => {
    async function initializeData() {
      dispatch(fetchUser(userId));
      dispatch(fetchRecipients(userId));
      dispatch(getExchangeRate());
      dispatch(fetchOrdersAction({ userId }));
    }
    initializeData();
  }, []);

  const handleChangeFlow = step => {
    setActiveStep(step.index);
  };
  const handleClickClose = () => {
    dispatch(setOrderComplete(false));
    dispatch(setOrderId(null));
    navigate("/account");
  };

  return (
    <>
      <>
        <Navigation
          profileType={"PERSONAL"}
          pathname={location.pathname}
          activeStep={activeStep}
          steps={steps}
          done={false}
          onClickClose={handleClickClose}
          onClickLabel={step => handleChangeFlow(step)}
          onClose={() => {}}
        />

        <div>
          <section className="amx-shared-css tw-flow__main">
            <div className="tw-flow__steps">
              {user.loading === "pending" ||
              fetchingReceivers === "pending" ||
              fetchingOrders === "pending" ||
              !receivers ? (
                <div className="row tw-flow__loader-wrapper" data-testid="step-wrapper">
                  <div className="p-y-3 m-y-3 text-xs-center" data-testid="step-loader">
                    <div className="tw-loader tw-loader--xl">
                      <div className="tw-loader__stripe"></div>
                      <div className="tw-loader__stripe"></div>
                      <div className="tw-loader__stripe"></div>
                      <div className="tw-loader__stripe"></div>
                      <div className="tw-loader__stripe"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="tw-flow__step container">
                  <Routes>
                    <PrivateRoute history={history} path="" element={<Amount />} />
                    <PrivateRoute path="amount" element={<Amount />} />
                    <PrivateRoute path="sender" element={<SenderDetails />} />
                    <PrivateRoute orderComplete={orderComplete} tset path="recipient" element={<ReceiverDetails />} />
                    <PrivateRoute orderComplete={orderComplete} path="review" history={history} element={<Review />} />
                    <PrivateRoute path="/pay/:orderId" history={history} element={<Pay history={history} />} />
                  </Routes>
                </div>
              )}
            </div>
          </section>
        </div>
      </>
    </>
  );
}

export default TransferFlow;
