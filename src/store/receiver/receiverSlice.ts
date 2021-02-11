import { AnyAction, PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FeatureKey } from "utils/featureKey";
import { Receiver } from "model/receiver";
import { deleteRecipient, updateRecipient, getRecipients, createRecipient } from "api/receiver";

interface ReceiverState {
  receivers: Receiver[];
  currentRequestId: string;
  selectedRecipient: string;
  selectedOrder: string;
  fetchingReceivers: string;
  creatingReceiver: string;
  updatingReceiver: string;
  deletingReceiver: string;
  error: any;
}

const initialState: ReceiverState = {
  receivers: null,
  currentRequestId: null,
  selectedRecipient: null,
  selectedOrder: null,
  fetchingReceivers: "idle",
  creatingReceiver: "idle",
  updatingReceiver: "idle",
  deletingReceiver: "idle",
  error: null
};

const fakeWait = async ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchRecipients = createAsyncThunk<Receiver[], string>(
  `${FeatureKey.RECEIVER}/fetch`,
  async (userId: string, { rejectWithValue }) => {
    let data;
    try {
      data = await getRecipients(userId);
    } catch (err) {
      rejectWithValue(err);
    }
    return data;
  }
);

export const createReceiver = createAsyncThunk<Receiver, { userId: string; receiver: Receiver }>(
  `${FeatureKey.RECEIVER}/create`,
  async (payload, { rejectWithValue }) => {
    let receiver;
    try {
      receiver = await createRecipient(payload);
    } catch (err) {
      rejectWithValue(err);
    }
    
    return receiver;
  }
);

export const updateReceiver = createAsyncThunk<Receiver, { userId: string; receiver: Receiver }>(
  `${FeatureKey.RECEIVER}/update`,
  async (payload, { rejectWithValue }) => {
    let data;
    try {
      data = await updateRecipient(payload);
      await fakeWait(1000);
    } catch (err) {
      rejectWithValue(err);
    }
    return payload.receiver;
  }
);

export const deleteReceiver = createAsyncThunk<void, { userId: string; receiverId: string }>(
  `${FeatureKey.RECEIVER}/delete`,
  async (payload, { rejectWithValue }) => {
    
    try {
      await deleteRecipient(payload);
      await fakeWait(1000);
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

function isSelectRecipientAction(action: AnyAction): action is PayloadAction<any> {
  return action.type === `${FeatureKey.ORDER}/fetch/fulfilled`;
}

const receivers = createSlice({
  name: FeatureKey.RECEIVER,
  initialState,
  reducers: {
    addReceiver: (state, action: PayloadAction<Receiver>) => {
      const receiver = action.payload;
      state.receivers = state.receivers.concat(receiver);
    },
    filterReceivers: (state, action: PayloadAction<string>) => {
      const term = action.payload;
      state.receivers.forEach((receiver, index) => {
        const { id, secretWord, visible, ...facets } = receiver;
        Object.keys(facets).some(key => {
          if (receiver[key].toLowerCase().includes(term.toLowerCase())) {
            state.receivers[index].visible = true;
            return true;
          }
          state.receivers[index].visible = false;
          return false;
        });
      });
    },
    selectRecipient: (state, action: PayloadAction<string>) => {
      state.selectedRecipient = action.payload;
    }
  },
  extraReducers: builder => {
    {
      builder
        .addCase(fetchRecipients.pending, (state, { meta }) => {
          state.fetchingReceivers = "pending";
          state.currentRequestId = meta.requestId;
        })
        .addCase(fetchRecipients.fulfilled, (state, { payload, meta }) => {
          state.fetchingReceivers = "idle";
          state.receivers = payload;
          state.currentRequestId = null;
        })
        .addCase(fetchRecipients.rejected, (state, { error, meta }) => {
          state.fetchingReceivers = "idle";
          state.error = error;
          state.currentRequestId = null;
        })
        .addCase(createReceiver.pending, state => {
          state.creatingReceiver = "pending";
          state.currentRequestId = null;
        })
        .addCase(createReceiver.fulfilled, (state, { payload }) => {
          state.creatingReceiver = "idle";
          
          state.receivers = [...state.receivers, payload];
        })
        .addCase(createReceiver.rejected, (state, { error, meta }) => {
          state.creatingReceiver = "idle";
          state.error = error;
        })
        .addCase(deleteReceiver.pending, state => {
          state.deletingReceiver = "pending";
        })
        .addCase(deleteReceiver.fulfilled, state => {
          state.deletingReceiver = "idle";
          const index = state.receivers.findIndex(receiver => receiver.id === state.selectedRecipient);
          state.receivers.splice(index, 1);
        })
        .addCase(deleteReceiver.rejected, (state, { error }) => {
          state.deletingReceiver = "idle";
          state.error = error;
        })
        .addCase(updateReceiver.pending, state => {
          state.updatingReceiver = "pending";
        })
        .addCase(updateReceiver.fulfilled, (state, { payload }) => {
          state.updatingReceiver = "idle";
          state.receivers.forEach((receiver, index) => {
            if (receiver.id === payload.id) {
              state.receivers[index] = payload;
              return;
            }
          });
        })
        .addCase(updateReceiver.rejected, (state, { error }) => {
          state.updatingReceiver = "idle";
          state.error = error;
        })
        .addMatcher(isSelectRecipientAction, (state, action) => {
          const payload = action.payload;

          state.selectedRecipient = payload.receiverId;
        });
    }
  }
});

export const { filterReceivers, addReceiver, selectRecipient } = receivers.actions;

const reducer = receivers.reducer;

export default reducer;
