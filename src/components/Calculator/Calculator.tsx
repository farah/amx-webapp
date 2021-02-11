import React from "react";
import { MoneyInput } from "@transferwise-ui";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "app/rootReducer";
import Breakdown from "./breakdown";
import currencies from "utils/currencies";
import {
  changeCurrency,
  updateSendAmount,
  updateReceiveAmount,
  sendAmountChanged,
  receiveAmountChanged
} from "store/calculator/calculatorSlice";
import { AppDispatch } from "app/store";

function Calculator({ landingPage = false, showButton = false, handleContinue = null, disabled = false, showPaymentOptions = false }) {
  const dispatch = useDispatch<AppDispatch>();
  const calculator = useSelector((state: RootState) => state.calculator);

  function handleChangeSendAmount(sendAmount) {
    dispatch(updateSendAmount(sendAmount));
    dispatch(sendAmountChanged());
  }

  function handleChangeReceiveAmount(receiveAmount) {
    dispatch(updateReceiveAmount(receiveAmount));
    dispatch(receiveAmountChanged());
  }

  function handleCurrencyChange(currency) {
    dispatch(changeCurrency(currency));
    dispatch(receiveAmountChanged());
  }

  function handleBlur(title, amount) {}

  const { sendAmount, receiveAmount, selectedCurrency } = calculator;
  const c = currencies

  return (
    <div className="calculator">
      <div className={`${landingPage ? "landing__calculator" : ""}`}>
        <div className="form-group form-group-lg m-b-0">
          <label className="control-label">You send</label>
          <MoneyInput
            size={"lg"}
            amount={sendAmount}
            onAmountChange={a => handleChangeSendAmount(a)}
            onBlur={handleBlur}
            selectedCurrency={{
              value: "AUD",
              label: "AUD",
              note: "Australia Dollar",
              currency: "aud"
            }}
            currencies={[
              {
                value: "AUD",
                label: "AUD",
                note: "Australia Dollar",
                currency: "aud"
              }
            ]}
            customActionLabel="Send amount"
          />
        </div>

        <Breakdown showPaymentOptions={showPaymentOptions} />

        <div className="form-group form-group-lg m-b-0">
          <label className="control-label">Recipient gets</label>
          <MoneyInput
            size={"lg"}
            amount={receiveAmount}
            onAmountChange={a => handleChangeReceiveAmount(a)}
            onBlur={handleBlur}
            selectedCurrency={selectedCurrency}
            currencies={currencies}
            searchPlaceholder={"Type a currency or country"}
            onCurrencyChange={a => handleCurrencyChange(a)}
            customActionLabel="Receive amount"
          />
        </div>

        {showButton && (
          <div className="row m-t-2">
            <div className="col-md-6">
              <button
                onClick={handleContinue}
                disabled={disabled}
                type="button"
                className="btn btn-md np-btn np-btn-md btn-success btn-block np-btn-block"
                data-testid="continue-button"
              >
                Continue
              </button>
            </div>
            <div className="col-md-6"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculator;
