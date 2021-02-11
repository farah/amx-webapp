import { createSlice, createAsyncThunk, PayloadAction, unwrapResult } from "@reduxjs/toolkit";
import { getUserInfo, updateUserInfo } from "api/user";
import { FeatureKey } from "utils/featureKey";
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { FirestoreDataConverter } from "@firebase/firestore-types";
import { Receiver } from "model/receiver";

export interface Address {
  formattedAddress: string;
  postcode: string;
  suburb: string;
  state: string;
}
interface UserState {
  userProfile: User;
  loading: "idle" | "pending";
  updatingUser: "idle" | "pending";
  error: any;
}
export interface User {
  userId: string;
  email?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  mobile: string;
  birthdate: string;
  address: Address;
  verified: boolean;
  isExistingCustomer: boolean;
  userInfoComplete: boolean;
}

export interface UserRecord extends User {
  authUser: User;
  receivers: Receiver[];
}

const userConverter: FirestoreDataConverter<UserRecord> = {
  toFirestore(exchangeRates: UserRecord): firebase.firestore.DocumentData {
    return exchangeRates;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<UserRecord>,
    options: firebase.firestore.SnapshotOptions
  ): UserRecord {
    const data = snapshot.data(options);

    return data;
  }
};

export const fetchUser = createAsyncThunk<User, string>(
  `${FeatureKey.USER}/fetch`,
  async (userId: string, { rejectWithValue }) => {
    try {
      let user;
      user = await getUserInfo(userId);

      if (!user) {
        return null;
      }

      return user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const checkExistingCustomer = createAsyncThunk<User, { uid: string; mobile: string }>(
  `${FeatureKey.USER}/checkExistingUSer`,
  async (payload, { rejectWithValue }) => {
    let snapshot;
    try {
      snapshot = await firebase
        .firestore()
        .collection("users")
        .withConverter(userConverter)
        .doc(payload.uid)
        .get();
    } catch (err) {
      return rejectWithValue(err);
    }

    const user = snapshot.data();

    return user;
  }
);

export const updateUser = createAsyncThunk<Partial<User>, { uid: string; user: Partial<User> }>(
  `${FeatureKey.USER}/update`,
  async (payload, { rejectWithValue }) => {
    const { uid, user } = payload;
    
    try {
      await updateUserInfo(uid, user);
    } catch (e) {
      return rejectWithValue(e);
    }
    return user;
  }
);

const initialState: UserState = {
  userProfile: {
    userId: "",
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    mobile: "",
    birthdate: "",
    address: {
      formattedAddress: "",
      postcode: "",
      suburb: "",
      state: ""
    },
    verified: false,
    isExistingCustomer: false,
    userInfoComplete: false
  },
  loading: "idle",
  updatingUser: "idle",
  error: null
};

const user2 = createSlice({
  name: FeatureKey.USER,
  initialState,
  reducers: {
    completeVerification: (state, action: PayloadAction<any>) => {
      const receiver = action.payload;
    }
  },
  extraReducers: builder => {
    {
      builder
        .addCase(fetchUser.pending, state => {
          state.loading = "pending";
        })
        .addCase(fetchUser.fulfilled, (state, { payload }: PayloadAction<User>) => {
          state.loading = "idle";

          state.userProfile = payload;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.loading = "idle";
          state.error = action;
        })
        .addCase(updateUser.pending.type, state => {
          state.updatingUser = "pending";
        })
        .addCase(updateUser.fulfilled, (state, { payload }: PayloadAction<any>) => {
          state.updatingUser = "idle";
          state.userProfile = payload;
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.updatingUser = "idle";
          state.error = action;
        });
    }
  }
});

export const { completeVerification } = user2.actions;

const reducer = user2.reducer;

export default reducer;
