import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { RootState } from "app/rootReducer";
import { AppDispatch } from "app/store";
import { Button } from "@transferwise-ui";
import { PaymentTypes } from "model/order";
import { createPoliPaymentLink } from "store/payments/poliSlice";

function POLI({ onClick }) {
  const dispatch = useDispatch<AppDispatch>();
  const { orderId } = useParams();
  const { sendAmount } = useSelector((state: RootState) => state.calculator);
  const { creatingPoliLink, fetchingPoliTransaction } = useSelector((state: RootState) => state.poli);
  const handleCreatePoliLink = async () => {
    const resultAction = await dispatch(createPoliPaymentLink({ sendAmount, orderId }));

    const { NavigateURL } = unwrapResult(resultAction);
    window.location.href = NavigateURL;
  };

  return (
    <section className="b-transfer-pay-in b-transfer-flow-main__payment-type">
      <div className="row m-t-5 ng-scope">
        <div className="col-lg-6 col-lg-offset-3">
          <div className="m-b-3 text-xs-center">
            <h2 className="m-b-1"> Pay with POLi </h2>
            <div className="step-heading-subtitle__go-back m-t-2">
              <div className="step-heading-subtitle__go-back__icon m-r-1">
                <span ng-switch="$ctrl.size" ng-if="!$ctrl.filled" className="tw-icon tw-icon-arrow-left ng-scope">
                  <svg width="16" height="16" fill="currentColor">
                    <path d="M3.012 7.2L8.57 1.562 7.43.438 0 8l7.43 7.562 1.14-1.124L3.012 8.8H16V7.2H3.012z"></path>
                  </svg>
                </span>
              </div>
              <a onClick={() => onClick(PaymentTypes.POLI_PAY)} className="ng-binding">
                {" "}
                Pay another way{" "}
              </a>
            </div>
          </div>
          <div ng-if="$ctrl.isSelected($ctrl.PayInMethodTypes.POLI)" className="ng-scope">
            <div className="row">
              <div className="col-md-4 col-md-push-8">
                <div className="center-block transfer-method-poli-logo"></div>
              </div>
              <div className="col-md-8 col-md-pull-4">
                <div
                  className="alert alert-danger text-md-center ng-binding ng-hide"
                  role="alert"
                  ng-show="$ctrl.notAvailable"
                >
                  {" "}
                  We're sorry, POLi is currently unavailable. Please select a different payment method or try again
                  later.{" "}
                </div>
                <h4 className="m-b-2 ng-binding">Pay in with POLi</h4>
                <p className="ng-scope">
                  POLi lets you securely make a payment from your internet bank to TransferWise. You must send payments
                  from an account in your name. Money coming from friends &amp; relatives can't be accepted. Here's a
                  list of supported{" "}
                  <a
                    target="_blank"
                    href="https://order.apac.paywithpoli.com/POLiFISupported.aspx?merchantcode=S6101597"
                  >
                    banks
                  </a>
                  .
                </p>
                <p className="ng-scope ng-hide">
                  POLi lets you securely make a payment from your internet bank to TransferWise. You must send payments
                  from an account in your name. Money coming from friends &amp; relatives can't be accepted. Here's a
                  list of supported{" "}
                  <a
                    target="_blank"
                    href="https://order.apac.paywithpoli.com/POLiFISupported.aspx?merchantcode=6400518"
                  >
                    banks
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <Button
                  onClick={handleCreatePoliLink}
                  className="btn btn-success btn-block"
                  loading={creatingPoliLink === "pending"}
                  size="md"
                  block
                  disabled={false}
                  htmlType="submit"
                  label="Confirm"
                  type="btn-primary"
                >
                  Continue to POLi
                </Button>
              </div>
              <div className="col-md-4 text-xs-center">
                <a href="https://www.polipayments.com/Buy" target="_blank" className="ng-binding">
                  What is POLi?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default POLI;
