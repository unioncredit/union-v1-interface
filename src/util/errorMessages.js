import { commify } from "@ethersproject/units";

const errorMessages = {
  required: "Please fill out this field",
  notVouchSelf: "You can't vouch for yourself",
  notEnoughCredit: "Not enough available credit",
  notEnoughStake: "Insufficient withdrawable stake",
  notEnoughBalanceDAI: "Not enough DAI in your wallet",
  stakeLimitHit: "Cannot stake more than limit",
  notEnoughPoolDAI: "Not enough DAI in the reserves",
  overdueBalance: "You cannot borrow with an overdue balance",
  maxBorrow: (max) =>
    `The maximum borrow is ${commify(Number(max).toFixed(2))} DAI`,
  minDAIBorrow: (min) =>
    `The minimum borrow is ${commify(Number(min).toFixed(2))} DAI`,
  minVouch: "The minimum vouch is 1.00 DAI",
  minValuePointZeroOne: "Value must be greater than 0.01",
  minValueOnePointZero: "Value must be greater than or equal to 1.00",
  minValueZero: "Value must be greater than 0.00",
  validEmail: "Please enter a valid email",
  knownScam: "This address is associated with a known scam",
  validAddress: "Please input a valid Ethereum address",
  validAddressOrEns: "Please input a valid ENS or Ethereum address",
  cantRemoveStake: "You can't remove used stake",
  notANumber: "Please input a valid number",
  maxWriteOff: "You can't write off more than debt",
  notOverDue: "Borrower is not overdue",
};

export default errorMessages;
