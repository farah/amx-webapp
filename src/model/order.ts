
export interface Order {
    id?: string;
    orderId: string;
    transactionId?: string;
    processingId?: string;
    receiverId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    mobile: string;
    city: string;
    country: string;
    secretWord?: string;
    senderId: string;
    exchangeRate: number;
    targetCurrency: string;
    sendExactly: boolean;
    sendAmount: number;
    receiveAmount: number;
    commission?: number;
    serviceFee: number;
    processingFee: number;
    paymentMethod: string;
    completed: boolean;
    paid: boolean;
    cancelled: boolean;
    markSent: boolean;
    orderDate: Date;
    paidDate: Date;
    sentDate: Date;
    senderEmail: string;
    senderName: string;
    emailSent: boolean;
    status: string;
  } 

  type Progress =
    | "started"
    | "pending"
    | "complete";

  export const PaymentTypes = {
    CREDIT_CARD: "CREDIT_CARD",
    DEBIT_CARD: "DEBIT_CARD",
    BANK_TRANSFER: "BANK_TRANSFER",
    POLI_PAY: "POLI_PAY",
    PAY_ID: "PAY_ID"
  };