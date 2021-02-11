import { combineReducers } from "@reduxjs/toolkit";
import poliReducer from "store/payments/poliSlice";

const paymentReducer = combineReducers({
  poli: poliReducer
});

export default paymentReducer;
