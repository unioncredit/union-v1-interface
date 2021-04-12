import GOVERNOR_ABI from "./abis/governor.json";
import { AddressZero } from "./variables";

export const GOV_ADDRESS = {
  1: AddressZero,
  4: AddressZero,
  42: "0x9045476cCAf43457D8246F1821A340D0E333E15B",
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
      address: "0x1474DDc49655794A479947aA9b3B3563CeaA2e19",
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
      address: "0xb31718904B5ed1FD2912Fa18957568f38845cC0f",
      actions: [
        {
          signature: "setNewMemberFee(uint256)",
          params: ["uint256"],
        },
      ],
    },
    FixedInterestRate: {
      address: "0xb7F122E01A2eB8c94f93b5cFA6853768c06f686B",
      actions: [
        {
          signature: "setInterestRate(uint256)",
          params: ["uint256"],
        },
      ],
    },
  },
};
