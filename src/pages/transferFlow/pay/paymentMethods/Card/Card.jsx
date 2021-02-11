import React from "react";
import { PaymentTypes } from "model/order";

function Card({onClick}) {
  return (
    <div id="root">
      <div className="row">
        <div onClick={() => onClick(PaymentTypes.CREDIT_CARD)}  className="col-xs-12 col-sm-10">
          <h2>Pay with your card</h2>
          <a href="#">Use a new card</a>  or,  <a href="#">Pay another way</a>
        </div>
      </div>
      <div className="">
        <div className="m-t-2"></div>
        <div className="">
          <div className="row">
            <div className="col-xs-12 col-sm-10">
              <label data-testid="saved-card-0" className="media decision">
                <div className="media-left">
                  <div className="circle-sm text-primary">
                    <div className="saved-card-form-icon icon-MC"></div>
                  </div>
                </div>
                <div className="media-body">
                  <h5>
                    <div className="col-xs-12">AUD Mastercard Debit</div>
                  </h5>
                  <span className="col-xs-12 m-t-1">Last four <strong>9338</strong> Expiry date <strong>04 / 23</strong></span>
                  <div className="col-xs-10 col-sm-8 col-lg-6">
                    <div className="icon-container">
                      <input type="text" inputMode="numeric" className="form-control m-t-1" name="cvc" placeholder="CVV / CVC" autoComplete="off" value="" />
                      <div data-testid="icon-card-back" className="card-form-icon icon-card-back"></div>
                    </div>
                  </div>
                </div>
                <div className="media-right" id="saved-card-0"><input type="radio" className="sr-only" value="" /><button type="button" className="tw-radio-button checked" aria-pressed="true"><span className="tw-radio-check"></span></button></div>
              </label>
              <div className="m-b-1"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-10"><button type="button" className="btn btn-md tw-btn tw-btn-md btn-success btn-block tw-btn-block" id="pay-button" data-testid="pay-button">Pay 10 AUD</button></div>
          </div>
        </div>
        <div className="hidden">
          <div className="row">
            <div className="col-xs-12 col-sm-10">
              <div className="form-group">
                <label className="control-label" htmlFor="card-number-input">Card number</label>
                <div className="icon-container">
                  <input type="text" inputMode="numeric" className="form-control" id="card-number-input" name="card-number" autoComplete="off" value="" />
                  <div data-testid="icon-GENERIC" className="card-form-icon icon-GENERIC"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-5">
              <div className="form-group"><label className="control-label" htmlFor="expiry-date">Expiry date (MM / YY)</label><input type="text" inputMode="numeric" className="form-control" id="expiry-date" name="expiry-date" autoComplete="off" value="" /></div>
            </div>
            <div className="col-xs-12 col-sm-5">
              <div className="form-group">
                <label className="control-label" htmlFor="cvc">CVV / CVC</label>
                <div className="icon-container">
                  <input type="text" inputMode="numeric" className="form-control" id="cvc" name="cvc" placeholder="" autoComplete="off" value="" />
                  <div data-testid="icon-card-back" className="card-form-icon icon-card-back"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-10">
              <div className=""></div>
              <div id="save-card-flag" className="checkbox"><label>Save card for future payments<button type="button" className="tw-checkbox-button checked" aria-pressed="true"><span className="tw-checkbox-check"></span></button></label></div>
            </div>
          </div>
          <div className="row">
            <div className=" m-t-2 col-xs-12 col-sm-10"><button type="button" className="btn btn-md tw-btn tw-btn-md btn-success btn-block tw-btn-block" id="pay-button" data-testid="pay-button">Pay 10 AUD</button></div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-10">
            <div className="m-t-2">
              <div className="review-details-card">
                <p className="m-b-1 review-element"><span className="review-element-name">Total fee</span> <span className="review-element-value text-primary">- 1.63 AUD</span></p>
                <p className="m-b-1 review-element"><span className="review-element-name">Recipient gets</span> <span className="review-element-value text-primary">5.96 USD</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
