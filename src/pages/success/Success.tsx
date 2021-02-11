import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "app/store";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { RootState } from "app/rootReducer";
import { useAuth } from "contexts/Firebase";
import { fetchUser } from "store/user/userSlice";
import { fetchRecipients } from "store/receiver/receiverSlice";
import { fetchOrdersAction } from "store/order/orderSlice";
import { getPoliTransaction } from "store/payments/poliSlice";
import SuccessSvg from "./successSvg";
import LoadingSpinner from "components/LoadingSpinner";
import Logo from "components/Logo";
import { render } from "@testing-library/react";

const SuccessPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  let navigate = useNavigate();

  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token");

  const { userId } = useAuth();
  const { orderId } = useParams();
  const { receivers, fetchingReceivers } = useSelector((state: RootState) => state.receivers);
  const { orders, fetchingOrders } = useSelector((state: RootState) => state.order);
  const { creatingPoliLink, fetchingPoliTransaction } = useSelector((state: RootState) => state.poli);

  React.useEffect(() => {
    async function initializeData() {
      await dispatch(getPoliTransaction({ transactionToken: "KBxay4W%2bx8Lyr3j4jWkFfBQ%2bH0HH7h8D", userId, orderId }));
      await dispatch(fetchUser(userId));
      await dispatch(fetchRecipients(userId));
      await dispatch(fetchOrdersAction({ userId }));
    }
    initializeData();
  }, []);


  const renderSucessMessage = () => {

    const result = orders.find(t => t.orderId === orderId);
    
    const { id, receiverId, receiveAmount, sendAmount, targetCurrency } = result;
  
    const receiver = receivers.find(r => r.id === receiverId);
    const handleClose = () => {
      navigate(`/account`);
    };
    return (
      <div>
      <div className="bg-primary overlay ng-scope">
        <div className="container">
          <div className="row m-t-3">
            <div className="col-xs-6">
              <a href="/user/account/">
                <div className="logo logo-inverse pull-xs-left">
                  <Logo />
                </div>
              </a>
            </div>
            <div className="col-xs-6">
              <button onClick={handleClose} type="button" className="close">
                <span className="icon icon-close"></span>
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <div ui-view="" className="slide ng-scope">
            <div className="m-t-section-1 ng-scope">
              <div className="row">
                <div className="hide-animation col-xs-offset-1 col-sm-offset-3 col-lg-offset-4 text-xs-nowrap m-t-2 ng-scope">
                  <h4 className="text-success">{`${sendAmount.toFixed(2)} AUD`}</h4>
                  <div className="ng-binding">You paid</div>
                </div>
                <div className="globe-animated">
                  <SuccessSvg />
                </div>
                <div className="hide-animation col-xs-11 col-sm-9 col-lg-8 text-xs-nowrap text-xs-right ng-scope">
                  <h4 className="text-success">{`${receiveAmount.toFixed(2)} ${targetCurrency}`}</h4>
                  <div className="ng-binding">{`${receiver.firstName}`} will receive</div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h2 className="text-xs-center m-t-2 ng-scope">
                  <span className="text-success ng-scope">Your transfer has started</span>
                </h2>
                <div className="text-xs-center m-t-2 ng-scope">
                  Your money is on its way and should arrive{" "}
                  <strong className="text-success">in 2 working days</strong>. We'll keep you posted.
                </div>
                <div ng-if="!$ctrl.isPrefundingTransfer" className="ng-scope">
                  <div className="ng-scope">
                    <div className="row m-t-4 ng-scope">
                      <div className="col-md-6 col-md-offset-3 m-b-1">
                        <Link to="/account" role="button" className="btn btn-default btn-block ng-binding">
                          Track your transfer
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  const renderLoading = () => {
    return (
      <div id="preloader" className="bg-primary overlay">
      <div className="container">
        <div className="row m-t-3">
          <div className="col-xs-6">
            <a href="/account">
              <div className="logo logo-inverse pull-xs-left" style={{ height: "24px", width: "130px" }}></div>
            </a>
          </div>
          <div className="col-xs-6"></div>
        </div>
      </div>
      <div className="slide-carousel container" style={{ height: "40%" }}>
        <div className="row text-xs-center">
          <div className="loader">
            <div className="loader-spinner"></div>
            <div className="loader-flag">
              <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="-2 -2 56 56">
                <polygon
                  className="loader-flag-stroke"
                  stroke="#00B9FF"
                  stroke-width="2"
                  stroke-linejoin="miter"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  stroke-dasharray="300"
                  strokeDashoffset="300"
                  fill="none"
                  points="24.6,27.3 0,27.3 14.3,13.7 6.1,0 48.2,0 26.3,52 19.5,52 39.2,5.5 16.8,5.5 21.6,13.6 13.4,21.8 27,21.8"
                ></polygon>
              </svg>
              <svg
                className="loader-flag-fill"
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="52"
                viewBox="0 2 52 48"
              >
                <polygon
                  fill="#00B9FF"
                  points="6.1,0 14.3,13.7 0,27.3 24.6,27.3 27,21.8 13.4,21.8 21.6,13.6 16.8,5.5 39.2,5.5 19.5,52 26.3,52 48.2,0 "
                ></polygon>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  return (
    <>
      <div className="success-page">
        <div className="b-page">
          <section className="ng-scope">
            { fetchingOrders === "pending" || fetchingReceivers === "pending" || !orders || !receivers ? renderLoading() : renderSucessMessage()}

          </section>
        </div>
      </div>
    </>
  );
};
export default SuccessPage;
