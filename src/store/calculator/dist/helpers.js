"use strict";
// Copyright (c) 2018-present Amal Express, Inc. All Rights Reserved.
exports.__esModule = true;
exports.getCommission = exports.getProcessingFee = exports.getServiceFee = void 0;
var order_1 = require("model/order");
exports.getServiceFee = function (amount, targetCurrency) {
    var commissionRate = exports.getCommission(amount, targetCurrency);
    var serviceFee = amount * commissionRate;
    return serviceFee;
};
exports.getProcessingFee = function (amount, paymentMethod) {
    var processingFee;
    if (paymentMethod === order_1.PaymentTypes.BANK_TRANSFER) {
        processingFee = 0;
    }
    if (paymentMethod === order_1.PaymentTypes.POLI_PAY) {
        processingFee = amount * 0.01;
        if (processingFee > 3) {
            processingFee = 3;
        }
    }
    if (paymentMethod == order_1.PaymentTypes.CREDIT_CARD) {
        processingFee = amount * 0.019;
    }
    if (paymentMethod == order_1.PaymentTypes.DEBIT_CARD) {
        processingFee = amount * 0.019;
    }
    if (paymentMethod == order_1.PaymentTypes.PAY_ID) {
        processingFee = 0;
    }
    return processingFee;
};
exports.getCommission = function (amount, targetCurrency) {
    var baseComission = 0.05;
    if (amount >= 1000) {
        baseComission = 0.04;
    }
    if (amount >= 2000) {
        baseComission = 0.03;
    }
    if (targetCurrency === "ETB") {
        baseComission = baseComission - 0.01;
    }
    return baseComission;
};
