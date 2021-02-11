import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/Firebase";
import { RootState } from "app/rootReducer";
import { disablePreviousSteps, showPaymentCheckout, setOrderComplete, setOrderId } from "store/flow/flowSlice";
import { receiveAmountChanged, initialiseCalculator, initialiseExchangeRate } from "store/calculator/calculatorSlice";
import { updateOrderAction, fetchOrderAction } from "store/order/orderSlice";
import { PaymentTypes } from "model/order";
import { ExchangeRates } from "model/rates";
import { AppDispatch } from "app/store";
import PaymentOptions from "./paymentOptions";
import { Poli, BankTransfer, PayId, Card } from "./paymentMethods";

type Props = {
  history: any;
};

function Pay({ history }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  let navigate = useNavigate();

  const { userId } = useAuth();
  const { orderId } = useParams();

  const { paymentMethod, exchangeRates } = useSelector((state: RootState) => state.calculator);
  const { fetchingOrder, updatingOrder, fetchingOrders, orders } = useSelector((state: RootState) => state.order);
  const { fetchingReceivers, receivers, selectedRecipient } = useSelector((state: RootState) => state.receivers);
  const { continueToPayment } = useSelector((state: RootState) => state.transferFlow);
  const order = orders.find(t => t.orderId === orderId);
  const handleClick = () => {
    dispatch(showPaymentCheckout(false));
  };

  React.useEffect(() => {
    async function initializeData() {
      dispatch(setOrderComplete(true));
      dispatch(setOrderId(orderId));
      dispatch(disablePreviousSteps());
      const resultAction = await dispatch(fetchOrderAction({ userId, orderId }));
      const o = unwrapResult(resultAction);

      const exchangeRate = (JSON.parse(localStorage.getItem("amx:exchangeRate")) as ExchangeRates) || exchangeRates;

      dispatch(initialiseExchangeRate(exchangeRate));

      dispatch(
        initialiseCalculator({
          currencyRate: o.exchangeRate,
          receiveAmount: o.receiveAmount,
          targetCurrency: o.targetCurrency,
          localExchangeRate: exchangeRate.AUD
        })
      );

      dispatch(receiveAmountChanged());
      dispatch(disablePreviousSteps());
    }
    initializeData();
  }, []);

  const handleMarkOrderPaid = async () => {
    await dispatch(updateOrderAction({ userId, order: { ...order, status: "paid", markSent: true } }));
    dispatch(setOrderComplete(false));
    dispatch(showPaymentCheckout(false));
    navigate(`/account`);
  };

  const handleCancelOrder = async () => {
    await dispatch(updateOrderAction({ userId, order: { ...order, status: "cancelled", cancelled: true } }));
    dispatch(showPaymentCheckout(false));
  };

  const renderPaymentOption = payment => {
    switch (payment) {
      case PaymentTypes.POLI_PAY:
        return <Poli onClick={handleClick} />;
      case PaymentTypes.BANK_TRANSFER:
        return (
          <BankTransfer
            onClick={handleClick}
            onCancelOrder={handleCancelOrder}
            onMarkOrderPaid={handleMarkOrderPaid}
            orderId={orderId}
            sendAmount={order.sendAmount}
            updatingOrder={updatingOrder}
          />
        );
      case PaymentTypes.PAY_ID:
        return <PayId onClick={handleClick} />;

      case PaymentTypes.DEBIT_CARD:
        return <Card onClick={handleClick} />;

      case PaymentTypes.CREDIT_CARD:
        return <Card onClick={handleClick} />;
    }
  };

  return (
    <>
      {fetchingOrder === "pending" || fetchingReceivers === "pending" || !receivers || !selectedRecipient ? (
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
        <div className="p-b-3">
          <section className="b-transfer-pay-in b-transfer-flow-main__payment-type">
            <div>
              <div className="b-transfer-flow__error-panel ng-isolate-scope"> </div>
              <div className="row m-t-5 p-lg-t-5">
                {!continueToPayment && <PaymentOptions />}
                {continueToPayment && renderPaymentOption(paymentMethod)}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Pay;
