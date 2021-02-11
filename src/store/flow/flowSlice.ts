
import { createAction, createSlice } from "@reduxjs/toolkit";
import { FeatureKey } from "utils/featureKey";
interface FlowState {
  orderComplete: boolean;
  transferStarted: boolean;
  continueToPayment: boolean;
  selectedActivityId: string;
  orderId: string;
  
  steps: Array<{ disabled: boolean; path: string[]; label: string; visible: boolean }>;
}

const initialState: FlowState = {
  transferStarted: false,
  orderComplete: false,
  continueToPayment: false,
  orderId: null,
  selectedActivityId: null,
  steps: [
    {
      visible: true,
      disabled: false,
      path: ["/transfer", "/transfer/enteramount"],
      label: "Amount"
    },
    {
      visible: true,
      disabled: false,
      path: ["/transfer/sender"],
      label: "You"
    },
    {
      visible: true,
      disabled: false,
      path: ["/transfer/recipient"],
      label: "Recipient"
    },
    {
      visible: true,
      disabled: false,
      path: ["/transfer/review"],
      label: "Review"
    },
    {
      visible: true,
      disabled: false,
      path: ["/transfer/pay"],
      label: "Pay"
    },
    {
      visible: false,
      disabled: false,
      path: ["/transfer/verify"],
      label: "Verify"
    }
  ]
};

const transferFlow = createSlice({
  name: FeatureKey.TRANSFERFLOW,
  initialState,
  reducers: {
    changeSteps: (state, action) => {
      const { verify } = action.payload;
      if (verify) {
        state.steps[1] = {
          visible: true,
          disabled: false,
          path: ["/transfer/verify"],
          label: "Verification"
        };
      } else {
        state.steps[1] = {
          visible: true,
          disabled: false,
          path: ["/transfer/senderdetails"],
          label: "Sender"
        };
      }
    },
    setOrderComplete: (state, action) => {
      state.orderComplete = action.payload;
      if (!action.payload) {
        state.steps.forEach((step, index) => {
            state.steps[index].disabled = false;
        });
      }

    },
    setOrderId: (state, action) => {
      const orderId = action.payload;
      console.log('action.payload', action.payload)
      state.orderId = orderId;
 
      state.steps.forEach((step, index) => {
        if (step.path[0].startsWith(`/transfer/pay`) ) {
          state.steps[index].path[0] = `/transfer/pay/${orderId}`;
        }
      });
    },
    startTransfer: state => {
      state.transferStarted = true;
    },
    selectActivity: (state, action) => {
      state.selectedActivityId = action.payload;
    },
    userVerified: state => {
      state.steps[1] = {
        visible: true,
        disabled: false,
        path: ["/senderdetails"],
        label: "Sender"
      };
    },
    disablePreviousSteps: state => {
      state.steps.forEach((step, index) => {
        if (step.label !== "Pay") {
          state.steps[index].disabled = true;
          return;
        }
      });
    },
    showPaymentCheckout: (state, action) => {
      state.continueToPayment = action.payload;
    }
  }
});

export const {
  changeSteps,
  disablePreviousSteps,
  showPaymentCheckout,
  startTransfer,
  setOrderComplete,
  setOrderId,
  selectActivity
} = transferFlow.actions;

const reducer = transferFlow.reducer;

export default reducer;
