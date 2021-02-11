import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "store/user/userSlice";
import transferFlowReducer from "store/flow/flowSlice";
import receiversReducer from "store/receiver/receiverSlice";
import { combineReducers } from "@reduxjs/toolkit";
import exchangeReducer from "store/calculator/calculatorSlice";
import ordersReducer from "store/order/orderSlice";
import poliReducer from "store/payments/poliSlice";

const rootReducer = combineReducers({
  calculator: exchangeReducer,
  receivers: receiversReducer,
  user: userReducer,
  order: ordersReducer,
  transferFlow: transferFlowReducer,
  poli: poliReducer
});

const store = configureStore({
  reducer: {
    calculator: exchangeReducer,
    receivers: receiversReducer,
    user: userReducer,
    order: ordersReducer,
    transferFlow: transferFlowReducer,
    poli: poliReducer
  },
  devTools: process.env.NODE_ENV === "development",
})

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
