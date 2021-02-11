// Copyright (c) 2018-present Amal Express, Inc. All Rights Reserved.

import { PaymentTypes } from "model/order";

export const getServiceFee = (amount, targetCurrencyLabel) => {
  const commissionRate = getCommission(amount, targetCurrencyLabel);
  const serviceFee = amount * commissionRate;
  return serviceFee;
};

export const getProcessingFee = (amount, paymentMethod) => {
  let processingFee;

  switch (paymentMethod) {
    case PaymentTypes.BANK_TRANSFER: {
      processingFee = 0;
      return processingFee
    }
    case PaymentTypes.POLI_PAY: {
      processingFee = amount * 0.01;
      if (processingFee > 3) {
        processingFee = 3;
      }
      return processingFee 
    }
    case PaymentTypes.PAY_ID: {
      processingFee = amount * 0.019;
      return processingFee
    }
    case PaymentTypes.CREDIT_CARD: {
      processingFee = amount * 0.019;
      return processingFee
    }
    case PaymentTypes.DEBIT_CARD: {
      processingFee = amount * 0.019;
      return processingFee
    }
    default:
      break;
  }

  return processingFee;
};

export const getCommission = (amount, targetCurrencyLabel) => {
  let baseComission = 0.05;

  if (amount >= 1000) {
    baseComission = 0.04;
  }
  if (amount >= 2000) {
    baseComission = 0.03;
  }
  if (amount >= 5000) {
    baseComission = 0.02;
  }

  if (targetCurrencyLabel === "ETB") {
    baseComission = baseComission - 0.01;
  }

  return baseComission;
};
