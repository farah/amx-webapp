import React from 'react';
import { useDispatch } from "react-redux";
import { PaymentTypes } from "model/order";
import { Button } from "@transferwise-ui/index";
import { AppDispatch } from "app/store";
import { RootState } from "app/rootReducer";
import { selectActivity, setOrderId } from "store/flow/flowSlice";

export type Props = {
  onClick?: any;
  orderId?: any;
  sendAmount?: any;
  onMarkOrderPaid?: any;
  onCancelOrder?: any;
  updatingOrder?: any;
};

function BankTransfer({ onClick, orderId, sendAmount, onMarkOrderPaid, onCancelOrder, updatingOrder }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [action, setAction] = React.useState('markPaid');
  const handleonMarkOrderPaid = () => {
    setAction('markPaid')

    onMarkOrderPaid()
  }

  const handleonOnCancelOrder = () => {
    setAction('cancel')
    onCancelOrder()
  }

  return (
    <section className="b-transfer-pay-in b-transfer-flow-main__payment-type">
      <div className="row m-t-5">
        <div className="col-lg-6 col-lg-offset-3">
          <div className="js-bank-transfer-content ng-scope">
            <div>
              <h2 className="text-xs-center ng-scope"></h2>
              <div className="text-xs-center m-b-5 m-t-2">
                <span>
                  Go to your online banking and transfer <strong>{sendAmount.toFixed(2)} AUD</strong> to our account
                  using the details below.
                </span>{" "}
                <br />
                <div className="step-heading-subtitle__go-back m-t-2">
                  <span className="step-heading-subtitle__go-back__icon m-r-1">
                    <span className="tw-icon tw-icon-arrow-left ng-scope">
                      <svg width="16" height="16" fill="currentColor">
                        <path d="M3.012 7.2L8.57 1.562 7.43.438 0 8l7.43 7.562 1.14-1.124L3.012 8.8H16V7.2H3.012z"></path>
                      </svg>
                    </span>
                  </span>
                  <a onClick={() => onClick(PaymentTypes.BANK_TRANSFER)} className="ng-scope">
                    Or, pay another way
                  </a>
                </div>
                <div className="m-t-2 ng-scope">
                  <p className="ng-scope ng-hide">
                    Make sure your transfer reaches TransferWise within 1 business day to receive the agreed amount of
                    USD. If later than that, you might get more or less USD than you intended.{" "}
                    <a
                      href="https://transferwise.com/support/customer/portal/articles/2200504-24-hour-rate-lock"
                      target="_blank"
                    >
                      Read more.
                    </a>
                  </p>
                </div>
              </div>
              <div className="tw-payment-instructions__card ng-scope">
                <div className="tw-payment-instructions__card-instructions">
                  <div className="media">
                    <div className="media-body">
                      {" "}
                      <span>
                        <strong>Bank transfer details</strong>
                      </span>{" "}
                    </div>
                    <div className="media-right"> </div>
                  </div>
                  <hr className="m-t-3" />
                  <div className="m-b-0 alert alert-warning alert-dismissible ng-scope" role="alert">
                    <p className="ng-scope">
                      Please make sure that you include <strong className="text-xs-nowrap">{orderId}</strong> in the
                      bank transfer's description field.{" "}
                    </p>
                  </div>
                  <div className="m-t-3 row ng-scope">
                    <div className="m-b-3 col-sm-6">
                      {" "}
                      <span className="small ng-scope">Payee name</span>{" "}
                      <span>
                        {" "}
                        <br />
                        <span className="text-primary ng-binding">Amal Enterprises Pty Ltd</span>{" "}
                      </span>{" "}
                    </div>
                    <div className="m-b-3 col-sm-6 ng-scope">
                      {" "}
                      <span className="small">
                        {" "}
                        <span> Payment description </span>{" "}
                      </span>{" "}
                      <span ng-switch="$ctrl.sourceCurrency">
                        {" "}
                        <span>
                          {" "}
                          <br /> <span className="text-primary ng-binding"> {orderId} </span>{" "}
                        </span>{" "}
                      </span>{" "}
                    </div>
                    <div className="col-xs-12 ng-scope">
                      <div className="m-t-1"> </div>
                      <div className="row row-equal-height">
                        <div className="ng-scope col-xs-12 col-sm-6">
                          <dl className="ng-scope">
                            <dt className="ng-binding">Amount to send</dt>
                            <dd className="text-word-break">
                              {" "}
                              <span> {sendAmount.toFixed(2)} AUD </span>{" "}
                            </dd>
                          </dl>
                        </div>
                        <div className="ng-scope col-xs-12 col-sm-6">
                          <dl>
                            <dt className="ng-binding">BSB code</dt>
                            <dd className="text-word-break">
                              {" "}
                              <span> 806043 </span>{" "}
                            </dd>
                          </dl>
                        </div>
                        <div className="ng-scope col-xs-12 col-sm-6">
                          <dl className="ng-scope">
                            <dt className="ng-binding">Account number</dt>
                            <dd className="text-word-break">
                              {" "}
                              <span> 10025 7918 </span>{" "}
                            </dd>
                          </dl>
                        </div>
                        <div className="ng-scope col-xs-12 col-sm-6">
                          <dl className="ng-scope">
                            <dt className="ng-binding">Bank name</dt>
                            <dd className="text-word-break">
                              {" "}
                              <span> BNK Bank </span>{" "}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="m-t-2 ng-scope">
                    You can use your bank's online banking or mobile app to make your bank transfer to Amal Express.
                  </div>
                </div>
              </div>
              <div className="p-t-3">
                <div>
                  <Button
                    onClick={handleonMarkOrderPaid}
                    className="m-t-2 btn btn-block btn-primary ng-scope"
                    loading={updatingOrder === "pending" && action === 'markPaid'}
                    size="md"
                    block
                    htmlType="submit"
                    disabled={false}
                    label="I've paid"
                    type="btn-primary"
                  >
                    I've paid
                  </Button>
                </div>

                <Button
                  onClick={handleonOnCancelOrder}
                  className="btn btn-danger btn-block m-t-2 ng-scope"
                  loading={updatingOrder === "pending" && action === 'cancel'}
                  size="md"
                  block
                  htmlType="submit"
                  disabled={false}
                  label="Cancel this transfer"
                  type="btn-primary"
                >
                  Cancel this transfer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BankTransfer;
