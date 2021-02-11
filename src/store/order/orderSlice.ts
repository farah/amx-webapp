import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders, getOrderByOrderId, updateOrder, createOrder } from "api/order";
import { FeatureKey } from "utils/featureKey";
import { Order } from 'model/order';

interface OrderState {
  orders: Order[];
  selectedOrder: string | null;
  fetchingOrder: string;
  creatingOrder: string;
  updatingOrder: string;
  fetchingOrders: string;
  error: any;
}

const initialState: OrderState = {
  orders: null,
  selectedOrder: null,
  fetchingOrder: "idle",
  creatingOrder: "idle",
  updatingOrder: "idle",
  fetchingOrders: "idle",
  error: null
};

// Simulate loading indicate for UX purposes
const fakeWait = async ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchOrderAction = createAsyncThunk<Order, { userId: string; orderId: string }>(
  `${FeatureKey.ORDER}/fetch`,
  async (payload, { rejectWithValue }) => {
    let data
    try {
      await fakeWait(1000);
      data = await getOrderByOrderId(payload);
    } catch(err) {
      return rejectWithValue(err)
    }
    return data;
  }
);

export const fetchOrdersAction = createAsyncThunk<Order[], { userId: string }>(
  `${FeatureKey.ORDERS}/fetch`,
  async (payload, { rejectWithValue }) => {
    let data
    try {
      data = await getOrders(payload);
      
    } catch(err) {
      return rejectWithValue(err)
    }
    return data;
  }
);

export const createOrderAction = createAsyncThunk<Order, { userId: string; order: Order } >(
  `${FeatureKey.ORDER}/create`,
  async (payload: { userId: string; order: Order }, { rejectWithValue }) => {
    
    const data = await createOrder(payload);
    return data;
  }
);

export const updateOrderAction = createAsyncThunk<Order, { userId: string; order: Order }>(
  `${FeatureKey.ORDER}/update`,
    async (payload, { rejectWithValue }) => {
    try {
      await fakeWait(1000);
      await updateOrder(payload);
      await fakeWait(2000);
    } catch (err) {
      rejectWithValue(err)
    }

    return payload.order;
  }
);

const orders = createSlice({
  name: FeatureKey.ORDER,
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    { builder
    .addCase(fetchOrderAction.pending, (state) => {
      state.fetchingOrder = "pending";
    })
    .addCase(fetchOrderAction.fulfilled, (state, { payload }) => {
      state.fetchingOrder = "idle";
      
      state.selectedOrder = payload.id;
    })
    .addCase(fetchOrderAction.rejected, (state, { payload }) => {
      state.fetchingOrder = "idle";
      state.error = payload;
    })

    .addCase(fetchOrdersAction.pending, (state) => {
      state.fetchingOrders = "pending";
    })
    .addCase(fetchOrdersAction.fulfilled, (state, { payload }) => {
      
      state.fetchingOrders = "idle";
      
      state.orders = payload;
    })
    .addCase(fetchOrdersAction.rejected, (state, { payload }) => {
      state.fetchingOrders = "idle";
      state.error = payload;
    })
  
    .addCase(createOrderAction.pending, (state) => {
      state.creatingOrder = "pending";
    })
    .addCase(createOrderAction.fulfilled, (state, { payload }) => {
      state.creatingOrder = "idle";
        
      state.orders.push(payload)
    })
    .addCase(createOrderAction.rejected, (state, { payload }) => {
      state.creatingOrder = "idle";
      state.error = payload;
    })
    .addCase(updateOrderAction.pending, (state) => {
      state.updatingOrder = "pending";
    })
    .addCase(updateOrderAction.fulfilled, (state, { payload }) => {
      state.updatingOrder = "idle";
      state.orders.forEach((receiver, index) => {
        if (receiver.id === payload.id) {
          state.orders[index] = payload;
          return;
        }
      });
      //state.orders = payload;
    })
    .addCase(updateOrderAction.rejected, (state, { payload }) => {
      state.updatingOrder = "idle";
      state.error = payload;
    })}
  }
});

const reducer = orders.reducer;

export default reducer;
