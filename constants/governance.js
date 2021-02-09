import GOVERNOR_ABI from "./abis/governor.json";
import { AddressZero } from "./variables";

export const GOV_ADDRESS = {
  1: AddressZero,
  4: AddressZero,
  42: "0x9d8C41bd1e0B2d7dCCa7E3F765459bDa8C3FFb85",
};

export const GOV_ABI = GOVERNOR_ABI;

export const TARGETS = {
  4: {
    UToken: {
      address: "0x567781ecC20da0fd0bA7ff219fBDaE0275c3Ad7f",
      actions: [
        {
          signature: "setOriginationFee(uint256)",
          params: ["uint256"],
        },
        {
          signature: "setDebtCeiling(uint256)",
          params: ["uint256"],
        },
      ],
    },
    UserManager: {
      address: "0x2634854c37C412C63085ACCD10fB0e64b0992357",
      actions: [
        {
          signature: "setNewMemberFee(uint256)",
          params: ["uint256"],
        },
      ],
    },
  },
  42: {
    UToken: {
      address: "0x439923A9B60C90B7C11a12bBB8A4e9D7DbD315cB",
      actions: [
        {
          signature: "setOriginationFee(uint256)",
          params: ["uint256"],
        },
        {
          signature: "setDebtCeiling(uint256)",
          params: ["uint256"],
        },
      ],
    },
    UserManager: {
      address: "0x485c6a9e364008458853AF0160960C34aC05bebE",
      actions: [
        {
          signature: "setNewMemberFee(uint256)",
          params: ["uint256"],
        },
      ],
    },
    FixedInterestRate: {
      address: "0x5f39644341fed87bcF551b2C09d63a9990de338b",
      actions: [
        {
          signature: "setInterestRate(uint256)",
          params: ["uint256"],
        },
      ],
    },
  },
};
