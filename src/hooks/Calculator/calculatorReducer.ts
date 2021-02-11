import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getServiceFee, getProcessingFee } from "./helpers";
import { ExchangeRates } from "model/rates";
import { getRates } from "api/rate";
import { FeatureKey } from "utils/featureKey";
import { PaymentTypes } from "model/order";

export const CurrencyTypes = {
  USD: "USD",
  AUD: "AUD",
  KES: "KES",
  ETB: "ETB"
};

export const calculatorReducer = (state, action) => {
  switch (action.type) {
    case "initialiseCalculator":
      const { targetCurrency, exchangeRates, receiveAmount, paymentMethod } = state;

      const targetExchange = exchangeRates[targetCurrency];
      const usdAmount = receiveAmount / targetExchange;
      const serviceFee = getServiceFee(usdAmount, targetCurrency);
      const processingFee = getProcessingFee(
        (usdAmount + serviceFee) / exchangeRates[CurrencyTypes.AUD],
        paymentMethod
      );
      const sendAmount = processingFee + (usdAmount + serviceFee) / exchangeRates[CurrencyTypes.AUD];

      return {
        ...state,
        sendAmount,
        processingFee,
        serviceFee: serviceFee / exchangeRates[CurrencyTypes.AUD]
      };
    case "receiveAmountChanged": {
      const { targetCurrency, exchangeRates, receiveAmount, paymentMethod } = state;

      const targetExchange = exchangeRates[targetCurrency];
      const usdAmount = receiveAmount / targetExchange;
      const serviceFee = getServiceFee(usdAmount, targetCurrency);
      const processingFee = getProcessingFee(
        (usdAmount + serviceFee) / exchangeRates[CurrencyTypes.AUD],
        paymentMethod
      );
      const sendAmount = processingFee + (usdAmount + serviceFee) / exchangeRates[CurrencyTypes.AUD];

      return {
        ...state,
        sendAmount,
        processingFee,
        serviceFee: serviceFee / exchangeRates[CurrencyTypes.AUD]
      };
    }
    case "sendAmountChanged": {
      const { targetCurrency, exchangeRates, sendAmount, paymentMethod } = state;

      const targetExchange = exchangeRates[targetCurrency];
      const processingFee = getProcessingFee(sendAmount, paymentMethod);
      const usdAmount = (sendAmount - processingFee) * exchangeRates[CurrencyTypes.AUD];
      const serviceFee = getServiceFee(usdAmount, targetCurrency);
      const receiveAmount = (usdAmount - serviceFee) * targetExchange;

      return {
        ...state,
        receiveAmount,
        serviceFee: serviceFee / exchangeRates[CurrencyTypes.AUD]
      };
    }
    case "changeCurrency": {
      return {
        ...state,
        iscalculatorenticating: true
      };
    }

    case "changePaymentOption": {
      const selectedPaymentOption = action.payload;
      return {
        ...state,
        selectedPaymentOption,
        paymentMethod: selectedPaymentOption
      };
    }

    case "updateSendAmount": {
      const sendAmount = action.payload;

      return {
        ...state,
        sendAmount
      };
    }

    case "updateReceiveAmount": {
      const receiveAmount = action.payload;
      return {
        ...state,
        receiveAmount
      };
    }

    case "getRateStart": {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case "getRateSuccess": {
      return {
        ...state,
        exchangeRates: action.payload,
        loading: false
      };
    }

    case "getRateFailed": {
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    }

    default:
      return state;
  }
};
