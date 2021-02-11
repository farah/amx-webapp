import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CheckboxOption } from "@transferwise-ui";
import { Bank as BankIcon } from "@transferwise/icons";
import PaymentReview from "./payment_review";
import { AppDispatch } from "app/store";
import { PaymentTypes } from "model/order";
import { RootState } from "app/rootReducer";
import { changePaymentOption, receiveAmountChanged } from "store/calculator/calculatorSlice";
import { getServiceFee, getProcessingFee } from "store/calculator/helpers";
import { Card } from "./paymentMethods";

export const CurrencyTypes = {
  USD: "USD",
  AUD: "AUD",
  KES: "KES",
  ETB: "ETB"
};

const getTotalFees = (receiveAmount, localExchangeRate, currencyRate, targetCurrency, paymentType) => {
  const usdAmount = receiveAmount / currencyRate;
  const serviceFeeUsd = getServiceFee(usdAmount, targetCurrency);
  const serviceFeeAud = serviceFeeUsd / localExchangeRate;

  const processingFee = getProcessingFee((usdAmount + serviceFeeUsd) / localExchangeRate, paymentType);
  return processingFee + serviceFeeAud;
};

function PaymentOptions() {
  const dispatch = useDispatch<AppDispatch>();
  const { orderId } = useParams();

  const calculator = useSelector((state: RootState) => state.calculator);
  const { receiveAmount, targetCurrency, selectedPaymentOption, localExchangeRate, currencyRate } = calculator;

  const { orders, updatingOrder } = useSelector((state: RootState) => state.order);

  const order = orders.find(t => t.orderId === orderId);

  const handleSelect = selection => {
    dispatch(changePaymentOption(selection));
    dispatch(receiveAmountChanged());
  };

  return (
    <div>
      <div className="col-md-7">
        {!order.cancelled && <h2 className="m-b-5 ng-binding ng-scope"> How would you like to pay? </h2>}
        {order.cancelled && <h2 className="m-b-5 ng-binding ng-scope"> This order has been cancelled </h2>}
        <div className="row">
          <div className="col-xs-12">
            <div className="tw-payment-option-group ng-scope">
              <CheckboxOption
                id={PaymentTypes.BANK_TRANSFER}
                name="checkbox-option"
                title={`Manually transfer the money from your bank`}
                checked={selectedPaymentOption === PaymentTypes.BANK_TRANSFER}
                onChange={() => handleSelect(PaymentTypes.BANK_TRANSFER)}
                content={`${getTotalFees(
                  receiveAmount,
                  localExchangeRate,
                  currencyRate,
                  targetCurrency,
                  PaymentTypes.BANK_TRANSFER
                ).toFixed(2)} AUD in total fees`}
                disabled={order.cancelled}
                complex={false}
                media={<BankIcon />}
              />
              <CheckboxOption
                id={PaymentTypes.POLI_PAY}
                name="checkbox-option"
                title={`Poli`}
                checked={selectedPaymentOption === PaymentTypes.POLI_PAY}
                onChange={() => handleSelect(PaymentTypes.POLI_PAY)}
                content={`${getTotalFees(
                  receiveAmount,
                  localExchangeRate,
                  currencyRate,
                  targetCurrency,
                  PaymentTypes.POLI_PAY
                ).toFixed(2)} AUD in total fees`}
                disabled={order.cancelled}
                complex={false}
                media={<BankIcon />}
              />

              <CheckboxOption
                id={PaymentTypes.POLI_PAY}
                name="checkbox-option"
                title={`Debit Card`}
                checked={selectedPaymentOption === PaymentTypes.DEBIT_CARD}
                onChange={() => handleSelect(PaymentTypes.DEBIT_CARD)}
                content={`${getTotalFees(
                  receiveAmount,
                  localExchangeRate,
                  currencyRate,
                  targetCurrency,
                  PaymentTypes.POLI_PAY
                ).toFixed(2)} AUD in total fees`}
                disabled={order.cancelled}
                complex={false}
                media={<BankIcon />}
              />
            </div>
          </div>
        </div>
      </div>

      <PaymentReview />
    </div>
  );
}

export default PaymentOptions;
