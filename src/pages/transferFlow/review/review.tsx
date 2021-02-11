import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@transferwise-ui/index";
import firebase from 'firebase';
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "contexts/Firebase";
import { unwrapResult } from "@reduxjs/toolkit";
import { RootState } from "app/rootReducer";
import { AppDispatch } from "app/store";
import { createOrderAction } from "store/order/orderSlice";
import { disablePreviousSteps, setOrderComplete } from "store/flow/flowSlice";
import { generateShortCode } from "utils/misc";
import { addDays } from "date-fns";

// Simulate loading indicate for UX purposes
const fakeWait = async ms => new Promise(resolve => setTimeout(resolve, ms));

const Review = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedRecipient, receivers } = useSelector((state: RootState) => state.receivers);
  const receiver = receivers.find(r => r.id === selectedRecipient);
  const {
    sendAmount,
    selectedCurrency,
    receiveAmount,
    processingFee,
    serviceFee,
    exchangeRates,
    targetCurrency,
    paymentMethod
  } = useSelector((state: RootState) => state.calculator);
  const { orderId, orderComplete } = useSelector((state: RootState) => state.transferFlow);
  const { creatingOrder } = useSelector((state: RootState) => state.order);
  const { userProfile } = useSelector((state: RootState) => state.user);
  const { userId, authUser } = useAuth();
  const navigate = useNavigate();
  const [fakeLoading, setFakeLoading] = React.useState(false);

  const handleNext = async () => {


    console.log('days',addDays(new Date(Date.now() - 604800000), Math.round(Math.random() * 10)))
    
    const order = {
      orderId: generateShortCode(),
      senderId: userId,
      receiverId: selectedRecipient,
      firstName: receiver.firstName,
      middleName: receiver.middleName,
      lastName: receiver.lastName,
      mobile: receiver.mobile,
      city: receiver.city,
      country: receiver.country,
      secretWord: receiver.secretWord,
      paymentMethod,
      sendAmount: parseInt(sendAmount.toFixed(2)),
      receiveAmount:parseInt(receiveAmount.toFixed(2)),
      processingFee,
      serviceFee,
      targetCurrency,
      exchangeRate: exchangeRates[targetCurrency],
      senderEmail: authUser.email,
      senderName: userProfile.firstName,
      sendExactly: false,
      completed: false,
      paid: false,
      cancelled: false,
      markSent: false,
      status: 'notPaid',
      orderDate:  false ? addDays(new Date(Date.now() - 604800000), Math.round(Math.random() * 10)) : new Date(),
      paidDate: null,
      sentDate: null,
      emailSent: false
    };
    
    setFakeLoading(true)
    await fakeWait(1500)
    const resultAction = await dispatch(createOrderAction({ userId, order }));
   
    const o = unwrapResult(resultAction);
    dispatch(disablePreviousSteps());
    setFakeLoading(false)
    navigate(`/transfer/pay/${o.orderId}`);

  };

  React.useEffect(() => {
    if (!receiver || !receivers) {
    }
  }, []);

  if (orderComplete) {
    return <Navigate to={`/transfer/pay/${orderId}`} replace={true} />;
  }
  return (
    <div className="row">
      <div className="col-md-offset-3 col-md-6">
        <header className="transfer-flow-main__header">
          <h2 className="text-xs-left text-sm-center">Review details of your transfer</h2>
        </header>

        <div className="ng-scope">
          <div className="p-b-3">
            <div className="tw-review-details-card">
              <strong className="tw-review-details-card__title">
                <small className="ng-binding">Transfer details</small>
              </strong>
              <strong>
                <small>
                  <Link to="/transfer" className="pull-right tw-review-details-card__title-link">
                    Edit
                  </Link>
                </small>
              </strong>

              <p className="m-t-2 m-b-1 tw-review-element">
                <small className="tw-review-element__name">You send</small>
                <strong className="tw-review-element__value h3">{sendAmount.toFixed(2)} AUD</strong>
              </p>

              <p className="m-b-1  tw-review-element">
                <small className="tw-review-element__name">Total Fees (included):</small>
                <span className="tw-review-element__value text-primary">
                  <span className="ng-binding">- {(serviceFee + processingFee).toFixed(2)} AUD</span>
                  <span className="ng-binding ng-hide">Free</span>
                </span>
              </p>

              <p className="m-b-1 tw-review-element">
                <small className="tw-review-element__name">Amount we'll convert</small>
                <span className="tw-review-element__value text-primary">
                  {(sendAmount - serviceFee - processingFee).toFixed(2)} AUD
                </span>
              </p>

              <p className="m-b-1 tw-review-element">
                <small className="tw-review-element__name ng-scope">
                  <span>Guaranteed rate</span>
                </small>

                <span className="tw-review-element__value text-primary">
                  {(exchangeRates[selectedCurrency.label] / exchangeRates["AUD"]).toFixed(2)}
                </span>
              </p>

              <p className="m-b-1 tw-review-element">
                <span className="tw-review-element__name">
                  <small className="ng-binding">{/*receiver ? null : `${receiver.firstName} gets` */}</small>
                </span>
                <strong className="tw-review-element__value h3">
                  {receiveAmount.toFixed(2)} {selectedCurrency.label}
                </strong>
              </p>

              <p className="m-b-0 tw-review-element ng-scope">
                <small className="tw-review-element__name displayNone">Should arrive &nbsp;</small>
                <span className="tw-review-element__value text-primary">
                  <span className="tw-normal-estimate ng-scope"> by tommorow</span>
                </span>
              </p>

              <hr className="m-y-2" />
              <strong className="tw-review-details-card__title">
                <small className="ng-binding">Recipient details</small>
              </strong>
              <strong>
                <small>
                  <Link to="/transfer/recipient" className="pull-right tw-review-details-card__title-link">
                    Change
                  </Link>
                </small>
              </strong>

              <p className="m-t-2 m-b-1 tw-review-element">
                <small className="tw-review-element__name">Name</small>
                <span className="tw-review-element__value text-primary">
                  {`${receiver.firstName} ${receiver.lastName}`}
                </span>
              </p>

              <p className="m-b-1 tw-review-element">
                <small className="tw-review-element__name">City</small>
                <span className="tw-review-element__value text-primary">{`${receiver.city}`}</span>
              </p>

              <p className="m-b-1 tw-review-element">
                <small className="tw-review-element__name">Mobile</small>
                <span className="tw-review-element__value text-primary">{`${receiver.mobile}`}</span>
              </p>

              {receiver.secretWord && (
                <p className="m-b-1 tw-review-element">
                  <small className="tw-review-element__name">Secret word</small>
                  <span className="tw-review-element__value text-primary">{`${receiver.secretWord}`}</span>
                </p>
              )}

              <p className="m-b-0 tw-review-element ng-hide">
                <small className="tw-review-element__name">Collection method</small>
                <span className="tw-review-element__value text-primary">Bank account</span>
              </p>
            </div>

            <Button
              onClick={handleNext}
              className="ft-continue-button btn btn-success btn-block"
              loading={fakeLoading}
              size="md"
              block
              htmlType="submit"
              disabled={false}
              label="Confirm and continue"
              type="btn-primary"
            >
              Confirm and continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
