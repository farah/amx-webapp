import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {
  QuerySnapshot,
  FirestoreDataConverter
} from "@firebase/firestore-types";
import { Receiver } from 'model/receiver';

const receiverConverter: FirestoreDataConverter<Receiver> = {
  toFirestore(receiver: Receiver): firebase.firestore.DocumentData {
    return receiver;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<Receiver>,
    options: firebase.firestore.SnapshotOptions
  ): Receiver {
    const data = snapshot.data(options);
    return data;
  }
};

export async function createRecipient(payload: { userId: string; receiver: Receiver }) {
  const { userId, receiver } = payload;

  let docRef;

  try {
    docRef = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("Receivers")
      .doc();

    docRef.withConverter(receiverConverter).set({ ...receiver, id: docRef.id });
  } catch (e) {
    throw e;
  }
  const r = { ...receiver, id: docRef.id };
  return r;
}

export async function updateRecipient(payload: { userId: string; receiver: Receiver }) {
  const { userId, receiver } = payload;

  let docRef;
  try {
    docRef = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("Receivers")
      .doc(receiver.id);
    docRef.withConverter(receiverConverter).update({ ...receiver });
  } catch (e) {
    throw e;
  }

  return receiver;
}

export async function getRecipients(id: string) {
  let querySnapshot: QuerySnapshot<Receiver>;
  let receivers: Receiver[];

  try {
    querySnapshot = await firebase
      .firestore()
      .collection("users")
      .doc(id)
      .collection("Receivers")
      .withConverter(receiverConverter)
      .get();

    receivers = querySnapshot.docs.map(doc => doc.data());
  } catch (e) {
    throw e;
  }
  return receivers;
}

export async function deleteRecipient(payload: { userId: string; receiverId: string }) {
  const { userId, receiverId } = payload;
  try {
    await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("Receivers")
      .doc(receiverId).update({visible: false})

  } catch (e) {
    throw e;
  }
  return;
}
