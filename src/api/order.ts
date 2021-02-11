
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {
  QuerySnapshot
} from "@firebase/firestore-types";
import { FirestoreDataConverter } from "@firebase/firestore-types";
import { Order } from 'model/order';
import { Poli } from 'pages/transferFlow/pay/paymentMethods';
export interface OrderRecord extends Order {
}

const orderConverter: FirestoreDataConverter<OrderRecord> = {
  toFirestore(order: OrderRecord): firebase.firestore.DocumentData {
    return order;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<OrderRecord>,
    options: firebase.firestore.SnapshotOptions
  ): OrderRecord {
    const data = snapshot.data(options);
    return data;
  }
};

export async function createOrder(payload: { userId: string; order: Order }) {
  const { userId, order } = payload;
  let docRef;

  try {
    docRef = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("Orders")
      .doc();
    
    docRef.withConverter(orderConverter).set({
      ...order,
      id: docRef.id
      
    });
  } catch (e) {
    throw e;
  }
  return {...order, id: docRef.id};
}

export async function getOrders(payload: { userId: string }) {
  const { userId } = payload;
  let querySnapshot: QuerySnapshot<Order>;
  let orders: Order[];

  try {
    querySnapshot = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("Orders")
      .withConverter(orderConverter)
      .get();

  } catch (e) {
    console.log('e', e)
    throw e;
  }
  
  orders = querySnapshot.docs.map(doc => doc.data());
  
  return orders;
}

export async function getOrderByOrderId(payload: { userId: string; orderId: string }) {
  const { userId, orderId } = payload;
  let snapshot;

  try {
    snapshot = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("Orders")
      .where("orderId", "==", orderId)
      .limit(1)
      .get()
  } catch (e) {
    console.log('e', e)
    throw e;
  }
  
  const order = snapshot.docs[0].data();
  
  return order;
}

export async function updateOrder(payload: { userId: string; order: Partial<Order> }) {
  const { userId, order } = payload;
  
  try {
    const docRef = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("Orders")
      .doc(order.id);
    docRef.withConverter(orderConverter).update({ ...order });
  } catch (e) {
    throw e;
  }

  return
}
