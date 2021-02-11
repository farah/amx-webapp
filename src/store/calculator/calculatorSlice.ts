import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { unwrapResult } from "@reduxjs/toolkit";
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

interface CalculatorState {
  sendAmount: number;
  receiveAmount: number;
  serviceFee: number;
  processingFee: number;
  totalFees: number;
  exchangeRates: ExchangeRates;
  targetCurrency: string;
  currencyRate: number;
  localExchangeRate: number;
  paymentMethod: string;
  selectedCurrency: {
    value: string;
    label: string;
    note: string;
    currency: string;
  };
  selectedPaymentOption: string;
  fetchingExchangeRate: string;
  error: any;
}

const initialState: CalculatorState = {
  sendAmount: 100,
  receiveAmount: 100,
  serviceFee: 5,
  processingFee: 0,
  totalFees: 5,
  exchangeRates: { AUD: 0.6896, ETB: 38, KES: 101.27, USD: 1 },
  localExchangeRate: 0.6896,
  currencyRate: 1,
  targetCurrency: CurrencyTypes.USD,
  paymentMethod: PaymentTypes.BANK_TRANSFER,
  selectedCurrency: {
    value: CurrencyTypes.USD,
    label: CurrencyTypes.USD,
    note: "United States Dollar",
    currency: "usd"
  },
  selectedPaymentOption: PaymentTypes.BANK_TRANSFER,
  fetchingExchangeRate: "idle",
  error: null
};

export const getExchangeRate = createAsyncThunk<ExchangeRates, void>(
  `${FeatureKey.CALCULATOR}/fetch`,
  async (_arg, { dispatch, rejectWithValue }) => {
    let data;
    try {
      data = await getRates();
      
      const resultAction = await dispatch(initialiseExchangeRate(data));
      const exchangeRate = unwrapResult(resultAction);

      localStorage.setItem("amx:exchangeRate", JSON.stringify(exchangeRate));
      dispatch(initialiseCalculator({
        currencyRate: exchangeRate.AUD,
        receiveAmount:  100,
        targetCurrency: "USD",
        localExchangeRate: exchangeRate.AUD
      }));
      dispatch(receiveAmountChanged());
      
    } catch (err) {
      return rejectWithValue(err);
    }
    return data;
  }
);

const calculator = createSlice({
  name: FeatureKey.CALCULATOR,
  initialState,
  reducers: {
    initialiseCalculator: (state, action: PayloadAction<any>) => {
      const { currencyRate, receiveAmount, localExchangeRate, targetCurrency } = action.payload;

      const usdAmount = receiveAmount / currencyRate;
      const serviceFee = getServiceFee(usdAmount, targetCurrency);
      const processingFee = getProcessingFee((usdAmount + serviceFee) / currencyRate, PaymentTypes.BANK_TRANSFER);
      const sendAmount = processingFee + (usdAmount + serviceFee) / currencyRate;
      state.receiveAmount = receiveAmount;
      state.sendAmount = sendAmount;
      state.processingFee = processingFee;
      state.serviceFee = serviceFee;
      state.localExchangeRate = localExchangeRate;
    },
    initialiseExchangeRate: (state, action: PayloadAction<ExchangeRates>) => {
      state.exchangeRates = action.payload;
      state.localExchangeRate = action.payload.AUD;
    },
    receiveAmountChanged: state => {
      const { localExchangeRate, targetCurrency, exchangeRates, currencyRate, receiveAmount, paymentMethod } = state;

      const targetExchange = exchangeRates[targetCurrency];
      const usdAmount = receiveAmount / targetExchange;
     
      const serviceFee = getServiceFee(usdAmount, targetCurrency);
      const processingFee = getProcessingFee((usdAmount + serviceFee) / localExchangeRate, paymentMethod);
      const sendAmount = processingFee + (usdAmount + serviceFee) / localExchangeRate;

      state.sendAmount = sendAmount;
      state.processingFee = processingFee;
      state.serviceFee = serviceFee / localExchangeRate;
    },
    sendAmountChanged: state => {
      const { localExchangeRate, targetCurrency, exchangeRates, sendAmount, paymentMethod } = state;

      const targetExchange = exchangeRates[targetCurrency];
      const processingFee = getProcessingFee(sendAmount, paymentMethod);
      const usdAmount = (sendAmount - processingFee) * localExchangeRate;
      const serviceFee = getServiceFee(usdAmount, targetCurrency);
      const receiveAmount = (usdAmount - serviceFee) * targetExchange;

      state.receiveAmount = receiveAmount;
      state.processingFee = processingFee;
      state.serviceFee = serviceFee / localExchangeRate;
    },
    changeCurrency: (state, action) => {
      const selectedCurrency = action.payload;
      state.selectedCurrency = selectedCurrency;
      state.targetCurrency = selectedCurrency.label;
    },
    changePaymentOption: (state, action) => {
      const selectedPaymentOption = action.payload;
      state.selectedPaymentOption = selectedPaymentOption;
      state.paymentMethod = selectedPaymentOption;
    },
    updateSendAmount: (state, action) => {
      const sendAmount = action.payload;
      state.sendAmount = sendAmount;
    },
    updateReceiveAmount: (state, action) => {
      const receiveAmount = action.payload;
      state.receiveAmount = receiveAmount;
    }
  },
  extraReducers: builder => {
    {
      builder
        .addCase(getExchangeRate.pending, state => {
          state.fetchingExchangeRate = "pending";
        })
        .addCase(getExchangeRate.fulfilled, (state, { payload }: any) => {
          state.fetchingExchangeRate = "idle";
          state.exchangeRates = payload;
        })
        .addCase(getExchangeRate.rejected, (state, action) => {
          state.fetchingExchangeRate = "idle";
          state.error = action;
        });
    }
  }
});

export const {
  changePaymentOption,
  changeCurrency,
  updateSendAmount,
  updateReceiveAmount,
  sendAmountChanged,
  receiveAmountChanged,
  initialiseCalculator,
  initialiseExchangeRate
} = calculator.actions;

const reducer = calculator.reducer;

export default reducer;
