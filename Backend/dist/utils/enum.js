"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionTypeEnum = void 0;
var TransactionTypeEnum;
(function (TransactionTypeEnum) {
    TransactionTypeEnum["DEPOSIT"] = "DEPOSIT";
    TransactionTypeEnum["TRANSFER"] = "TRANSFER";
    TransactionTypeEnum["EXTERNAL_PAYMENT"] = "EXTERNAL_PAYMENT";
    TransactionTypeEnum["WITHDRAWAL"] = "WITHDRAWAL";
    TransactionTypeEnum["REFUND"] = "REFUND";
    TransactionTypeEnum["OTHER"] = "OTHER";
})(TransactionTypeEnum || (exports.TransactionTypeEnum = TransactionTypeEnum = {}));
