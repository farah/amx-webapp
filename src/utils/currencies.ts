import { PaymentTypes } from 'model/order';

let currencies = [
  {
    header: "Available currencies"
  },
  {
    value: "USD",
    label: "USD",
    note: "United States Dollar",
    currency: "usd",
    searchable: "Hong Kong, Saudi Arabia"
  },
  {
    value: "ETB",
    label: "ETB",
    note: "Ethiopian Birr",
    currency: "etb",
    searchable: "Ethiopia"
  },
  {
    value: "KES",
    label: "KES",
    note: "Kenayn Shilling",
    currency: "kes",
    searchable: "Kenya"
  }
];
export const options = [
  {
    header: "Payment methods"
  },
  {
    value: 1,
    label: "Bank transfer",
    type: PaymentTypes.BANK_TRANSFER
  },
  {
    value: 2,
    label: "POLi",
    type: PaymentTypes.PAY_ID
  },
  {
    value: 3,
    label: "PayId",
    type: PaymentTypes.PAY_ID
  },
  {
    value: 4,
    label: "Debit card",
    type: PaymentTypes.DEBIT_CARD
  },
  {
    value: 5,
    label: "Credit card",
    type: PaymentTypes.CREDIT_CARD
  }
];
export default currencies;
