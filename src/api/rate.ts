import * as firebase from "firebase/app";
import { FirestoreDataConverter } from "@firebase/firestore-types";
import { ExchangeRates } from 'model/rates';

const exchangeRateConverter: FirestoreDataConverter<ExchangeRates> = {
  toFirestore(exchangeRates: ExchangeRates): firebase.firestore.DocumentData {
    return exchangeRates;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<ExchangeRates>,
    options: firebase.firestore.SnapshotOptions
  ): ExchangeRates {
    const data = snapshot.data(options);
    return data;
  }
};

export async function getRates() {
  let snapshot;

  try {
    snapshot = await firebase
      .firestore()
      .collection("exchange")
      .withConverter(exchangeRateConverter)
      .doc("rates")
      .get();
  } catch (e) {
    throw e;
  }

  let data = snapshot.data();
  let x = data;

  return data;
}
