import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FeatureKey } from "utils/featureKey";
import { createPoliLink, getTransaction} from "api/payments";
interface PoliState {
  currentRequestId: string;
  creatingPoliLink: string;
  fetchingPoliTransaction: string;
  poliTransaction: any;
  error: any;
}

const initialState: PoliState = {
  currentRequestId: null,
  creatingPoliLink: "idle",
  fetchingPoliTransaction: "idle",
  poliTransaction: null,
  error: null
};

type PoliCreateLinkResponse = {
  ErrorCode: number;
  ErrorMessage: string;
  NavigateURL: string;
  Success: boolean;
  TransactionRefNo: string;
}

export const getPoliTransaction = createAsyncThunk<any, { transactionToken: string, userId: string, orderId: string }>(
  `${FeatureKey.POLI}/fetch`,
  async (payload, { rejectWithValue }) => {
    let result
    try {
     result =  await getTransaction(payload);
    } catch (err) {
      console.log(err)
      rejectWithValue(err)
    }
    return true
  }
 
);

  export const createPoliPaymentLink = createAsyncThunk<PoliCreateLinkResponse, { sendAmount: number, orderId: string }>(
    `${FeatureKey.POLI}/create`,
    async (payload, { rejectWithValue }) => {
      let data
      try {
        data = await createPoliLink(payload);
      } catch (err) {
        console.log('err', err)
        rejectWithValue(err)
      }
      return data;
    }
  );

  const poli = createSlice({
    name: FeatureKey.POLI,
    initialState,
    reducers: {
    },
    extraReducers: builder => {
      {
        builder
          .addCase(getPoliTransaction.pending, (state) => {
            state.fetchingPoliTransaction = "pending";
            state.currentRequestId = null
          })
          .addCase(getPoliTransaction.fulfilled, (state, { payload }) => {
            state.fetchingPoliTransaction = "idle";
            
            state.poliTransaction = payload
          })
          .addCase(getPoliTransaction.rejected, (state, { error, meta }) => {
            state.fetchingPoliTransaction = "idle";
            state.error = error;
          })
          .addCase(createPoliPaymentLink.pending, (state) => {
            state.creatingPoliLink = "pending";
            state.currentRequestId = null
          })
          .addCase(createPoliPaymentLink.fulfilled, (state, { payload }) => {
            state.creatingPoliLink = "idle";
          })
          .addCase(createPoliPaymentLink.rejected, (state, { error, meta }) => {
            state.creatingPoliLink = "idle";
            state.error = error;
          })
      }
    }
  });

  const reducer = poli.reducer;
  export default reducer;
