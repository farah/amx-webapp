import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "app/rootReducer";
import { AppDispatch } from "app/store";
import { showPaymentCheckout } from "store/flow/flowSlice";
import { updateOrderAction } from "store/order/orderSlice";
import { useAuth } from "contexts/Firebase";
import { setOrderComplete, setOrderId } from "store/flow/flowSlice";
import { Button } from "@transferwise-ui";
import { PaymentTypes } from "model/order";
import { getServiceFee, getProcessingFee } from "store/calculator/helpers";

export const CurrencyTypes = {
  USD: "USD",
  AUD: "AUD",
  KES: "KES",
  ETB: "ETB"
};

const getTotalFees = (receiveAmount, exchangeRates, targetCurrency, paymentType) => {
  const targetExchange = exchangeRates[targetCurrency];
  const usdAmount = receiveAmount / targetExchange;
  const serviceFee = getServiceFee(usdAmount, targetCurrency);
  const processingFee = getProcessingFee((usdAmount + serviceFee) / exchangeRates[CurrencyTypes.AUD], paymentType);
  return processingFee + serviceFee;
};

export function PaymentReview() {
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();
  const { userId } = useAuth();
  const { orderId } = useParams();
  const { selectedRecipient, receivers } = useSelector((state: RootState) => state.receivers);
  const receiver = receivers.find(r => r.id === selectedRecipient);
  const calculator = useSelector((state: RootState) => state.calculator);

  const { orders, updatingOrder } = useSelector((state: RootState) => state.order);
  const order = orders.find(t => t.orderId === orderId);

  const { sendAmount, receiveAmount, selectedCurrency, serviceFee, processingFee, exchangeRates } = calculator;

  const handleContinuePayment = () => {
    dispatch(showPaymentCheckout(true));
  };

  const handleCancelOrder = async () => {
    await dispatch(updateOrderAction({ userId, order: { ...order, cancelled: true } }));
    dispatch(setOrderComplete(false));

    setTimeout(() => {
      navigate(`/account`);
    }, 2000);
  };

  return (
    <div className="review-column col-md-5 col-xl-4 col-xl-offset-1 sticky-t-1">
      <div className="m-b-2 hidden-xs hidden-sm">
        <div className="tw-review-details-card">
          <strong className="tw-review-details-card__title">
            <small className="ng-binding">Transfer details</small>
          </strong>
          <strong>
            <small></small>
          </strong>

          <div className="ng-scope">
            <p className="m-t-2 m-b-1 tw-review-element tw-review-element_large">
              <small className="tw-review-element__name">You send</small>
              <strong className="tw-review-element__value h3">{sendAmount.toFixed(2)} AUD</strong>
            </p>

            <p className="m-b-1 tw-review-element tw-transfer-success">
              <small className="tw-review-element__name">Total fees (included)</small>
              <a className="tw-transfer-hint ng-scope">{(serviceFee + processingFee).toFixed(2)} AUD</a>
            </p>

            <p className="m-b-1 tw-review-element">
              <small className="tw-review-element__name">Amount we'll convert</small>
              <span className="tw-review-element__value text-primary">
                {(sendAmount - serviceFee - processingFee).toFixed(2)} AUD
              </span>
            </p>

            <p className="m-b-1 tw-review-element">
              <small className="tw-review-element__name">
                <span>Guaranteed rate (61 hours)</span>
              </small>

              <span className="tw-review-element__value text-primary">
                {(exchangeRates[selectedCurrency.label] / exchangeRates["AUD"]).toFixed(2)}
              </span>
            </p>

            <p className="m-b-1 tw-review-element tw-review-element_large">
              <span className="tw-review-element__name">
                <small className="ng-binding ng-hide">You get approximately</small>
                <small className="ng-binding">{receiver.firstName} gets</small>
              </span>
              <strong className="tw-review-element__value h3">
                {receiveAmount.toFixed(2)} {selectedCurrency.label}
              </strong>
            </p>

            <p className="m-b-1 tw-review-element">
              <small className="tw-review-element__name">Should arrive</small>

              <span className="tw-review-element__value text-primary tw-normal-estimate">by February 10th</span>
            </p>
          </div>

          <hr className="m-y-2" />
          <strong className="tw-review-details-card__title">
            <small className="ng-binding">Recipient details</small>
          </strong>
          <strong>
            <small></small>
          </strong>

          <p className="m-t-2 m-b-1 tw-review-element">
            <small className="tw-review-element__name">Name</small>
            <span className="tw-review-element__value text-primary">
              {`${receiver.firstName} ${receiver.lastName}`}
            </span>
          </p>

          <p className="m-b-1 tw-review-element">
            <small className="tw-review-element__name">Mobile</small>
            <span className="tw-review-element__value text-primary">{receiver.mobile}</span>
          </p>

          <p className="tw-review-element m-b-0">
            <small className="tw-review-element__name">City</small>
            <span className="tw-review-element__value text-primary">{receiver.city}</span>
          </p>

          <p className="m-b-0 tw-review-element ng-hide">
            <small className="tw-review-element__name">Country</small>
            <span className="tw-review-element__value text-primary">{receiver.country}</span>
          </p>
        </div>
      </div>
      <Button
        onClick={handleContinuePayment}
        className="btn btn-block btn-payment btn-primary"
        loading={false}
        size="md"
        block
        htmlType="submit"
        disabled={order.cancelled}
        label="Confirm"
        type="btn-primary"
      >
        Confirm
      </Button>

      <Button
        onClick={handleCancelOrder}
        className="btn btn-danger btn-block m-y-2 ng-isolate-scope"
        loading={updatingOrder === "pending"}
        size="md"
        block
        htmlType="submit"
        disabled={order.cancelled}
        label="Confirm"
        type="btn-primary"
      >
        Cancel this transfer
      </Button>
    </div>
  );
}

export default PaymentReview;
