// Copyright (c) 2018-present Amal Express, Inc. All Rights Reserved.

import { PaymentTypes } from 'model/order';

export const getServiceFee = (amount, targetCurrency) => {
  const commissionRate = getCommission(amount, targetCurrency);
  const serviceFee = amount * commissionRate;
  return serviceFee;
};

export const getProcessingFee = (amount, paymentMethod) => {
  let processingFee;
  if (paymentMethod === PaymentTypes.BANK_TRANSFER) {
    processingFee = 0;
  }
  if (paymentMethod === PaymentTypes.POLI_PAY) {
    processingFee = amount * 0.01;
    if (processingFee > 3) {
      processingFee = 3;
    }
  }
  if (paymentMethod == PaymentTypes.CREDIT_CARD) {
    processingFee = amount * 0.019;
  }

  if (paymentMethod == PaymentTypes.DEBIT_CARD) {
    processingFee = amount * 0.019;
  }
  if (paymentMethod == PaymentTypes.PAY_ID) {
    processingFee = 0;
  }

  return processingFee;
};

export const getCommission = (amount, targetCurrency) => {
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

  if (targetCurrency === "ETB") {
    baseComission = baseComission - 0.01;
  }

  return baseComission;
};
