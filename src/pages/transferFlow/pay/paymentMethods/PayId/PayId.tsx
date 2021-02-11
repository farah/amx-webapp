import React from "react";
import { PaymentTypes } from 'model/order';

function PayId({ onClick }) {
  return (
<section className="b-transfer-pay-in b-transfer-flow-main__payment-type">
   <div className="row m-t-5 ng-scope">
      <div className="col-lg-6 col-lg-offset-3">
         <div className="m-b-3 text-xs-center">
            <h2 className="m-b-1 ng-binding"> Pay using PayID </h2>
            <div className="step-heading-subtitle__go-back m-t-2">
               <div className="step-heading-subtitle__go-back__icon m-r-1">
                  <span className="tw-icon tw-icon-arrow-left ng-scope">
                     <svg ng-switch-default="" width="16" height="16" fill="currentColor">
                        <path d="M3.012 7.2L8.57 1.562 7.43.438 0 8l7.43 7.562 1.14-1.124L3.012 8.8H16V7.2H3.012z"></path>
                     </svg>
                  </span>
               </div>
               <a onClick={()=> onClick(PaymentTypes.PAY_ID)}> Pay another way </a> 
            </div>
         </div>
         <div className="ng-scope">
            <div>
               <div className="ng-scope">
                  <div data-test="payIn-osko-success" ng-if="$ctrl.payinDetailsRetrieved" className="text-xs-justify ng-scope">
                     <p data-test="payIn-osko-step-one" className="osko-text ng-scope">1. Next, go to your online banking or mobile app to pay for your transfer.</p>
                     <p data-test="payIn-osko-step-two" className="osko-text ng-scope">2. Select the option to pay to an email address or PayID, then send exactly <strong>11 AUD</strong> to our PayID:</p>
                     <p className="text-xs-center"> <span className="osko-pay-id ng-binding"> aud@transferwise.com </span> </p>
                     <p className="osko-text ng-scope">3. Enter the following on the payment description field on the transfer:</p>
                     <p className="text-xs-center"> <span className="osko-ref ng-binding"> 100096314108665 </span> </p>
                     <p className="osko-text ng-scope">Payments with incorrect or missing payment description will be automatically <strong>rejected</strong>.</p>
                     <p className="osko-text ng-scope">Should arrive <strong className="text-success">by November 10th</strong></p>
                     <div> <button id="h33cx" className="btn btn-default"><span ng-transclude=""><span > I'll transfer my money later </span></span><span><span className="btn-loader m-l-md"></span></span></button> <button id="uwcbvm" ng-disabled="$ctrl.isDisabled()" className="btn btn-primary ng-isolate-scope" ng-click="$ctrl.onMoneySent()" data-test="moneySent"><span ng-transclude=""><span className="ng-binding ng-scope"> I've made my transfer </span></span><span ng-show="$ctrl.isLoading()" className="ng-hide"><span className="btn-loader m-l-md"></span></span></button> </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
  );
}

export default PayId;
