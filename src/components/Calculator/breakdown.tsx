import { useDispatch, useSelector } from "react-redux";
import { Select } from "@transferwise-ui";
import { RootState } from "app/rootReducer";
import { useWindowSize } from "hooks";
import { getProcessingFee } from "store/calculator/helpers";
import { AppDispatch } from "app/store";
import { changePaymentOption, receiveAmountChanged } from "store/calculator/calculatorSlice";
import { PaymentTypes } from 'model/order';

export function Breakdown({showPaymentOptions = false}) {
  const calculator = useSelector((state: RootState) => state.calculator);
  const {
    processingFee,
    sendAmount,
    serviceFee,
    selectedCurrency,
    selectedPaymentOption,
    exchangeRates,
    fetchingExchangeRate
  } = calculator;

  const dispatch = useDispatch<AppDispatch>();

  const changePaymentMethod = payment => {
    dispatch(changePaymentOption(payment.type));
    dispatch(receiveAmountChanged());
  };

  const renderOptions = amount => {
    const options = [
      {
        value: 1,
        label: "Manual bank transfer",
        type: PaymentTypes.BANK_TRANSFER,
        note: "0 AUD"
      },
      {
        value: 2,
        label: "POLi",
        type: PaymentTypes.POLI_PAY,
        note: `${getProcessingFee(amount, PaymentTypes.POLI_PAY).toFixed(2)} AUD`
      },
      {
        value: 4,
        disabled: true,
        label: "Debit card",
        type: PaymentTypes.CREDIT_CARD,
        note: `Coming soon`
      }
    ];
    return options;
  };

  const { width } = useWindowSize();
  return (
    <>
      <ul className="sequence sequence-top sequence-bottom tw-calculator-breakdown tw-calculator-breakdown--detailed">
        {showPaymentOptions && (<li className="tw-calculator-breakdown-item-dropdown">
          <span className="tw-calculator-breakdown-item__full">
            <small>Select payment method</small>
            <span className="m-r-1" data-tracking-id="calculator-payment-select">
              <Select
                size={width < 440 ? "sm" : "md"}
                placeholder="Payment methods"
                dropdownUp={false}
                inverse={false}
                block={true}
                disabled={false}
                hasClassNames={true}
                selected={renderOptions(sendAmount).find(
                  o => o.type === selectedPaymentOption
                )}
                money
                onChange={changePaymentMethod}
                options={renderOptions(sendAmount)}
                className={"btn-group, btn-group_33HEu6aS3s"}
              />
            </span>
          </span>
        </li>)}
        <li>
          <span className="tw-calculator-breakdown-item__left">
            {serviceFee.toFixed(2)} AUD
          </span>
          <span className="tw-calculator-breakdown-item__right">Our fee</span>
        </li>
        <li>
          <span className="sequence-icon tw-calculator-breakdown__icon">–</span>
          <span className="tw-calculator-breakdown-item__left">
            <strong>{(serviceFee + processingFee).toFixed(2)} AUD</strong>
          </span>
          <span className="tw-calculator-breakdown-item__right">
            <strong>Total fees</strong>
          </span>
          <hr className="m-y-1" />
        </li>
        <li>
          <span className="sequence-icon tw-calculator-breakdown__icon">=</span>
          <span className="tw-calculator-breakdown-item__left">
            {(sendAmount - serviceFee).toFixed(2)} AUD
          </span>
          <span className="tw-calculator-breakdown-item__right">
            Amount we’ll convert
          </span>
        </li>

        <li>
          <span className="sequence-icon tw-calculator-breakdown__icon">×</span>
          <span className="tw-calculator-breakdown-item__left">
            <a role="button" className="m-r-2">
              <span className="tw-calculator-breakdown-rate__value">
                {selectedCurrency.label === "USD"
                  ? exchangeRates["AUD"]
                  : (
                      exchangeRates[selectedCurrency.label] / exchangeRates["AUD"]
                    ).toFixed(2)}
              </span>
            </a>
          </span>
          <span className="tw-calculator-breakdown-item__right">
            <span>Exchange rate</span>
          </span>
        </li>
      </ul>
    </>
  );
}

export default Breakdown;
