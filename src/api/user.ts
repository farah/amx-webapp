import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { FirestoreDataConverter } from "@firebase/firestore-types";
import { User } from 'model/user';
import { Receiver } from 'model/receiver';
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

export async function getUserInfo(uid: string) {
  let snapshot;

  try {
    snapshot = await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .withConverter(userConverter)
      .get();
  } catch (e) {
    throw e;
  }
  
  if (!snapshot.exists) {
    return null
    

  }
  
  const user = snapshot.data();

  return user;
}

export async function updateUserInfo(uid: string, user: Partial<User>) {
  
  try {
    const snapshot = await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set(user, { merge: true });

    return snapshot;
  } catch (e) {
    throw e;
  }
  
}

export async function checkExistingMobile({ uid, mobile }) {
  let snapshot;

  try {
    snapshot = await firebase
      .firestore()
      .collection("users")
      .withConverter(userConverter)
      .doc(uid)
      .get();
  } catch (e) {
    throw e;
  }

  const user = snapshot.data();
  const exists = user.isExistingCustomer;
  return exists;
}
