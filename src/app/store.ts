import { configureStore, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ThunkAction } from "redux-thunk";
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import LogRocket from "logrocket";

import rootReducer, { RootState } from "./rootReducer";

const middlewares = [thunk, logger, LogRocket.reduxMiddleware(), ...getDefaultMiddleware({serializableCheck: false})] as const

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV === "development",
})
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>() 
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;


export default store;
