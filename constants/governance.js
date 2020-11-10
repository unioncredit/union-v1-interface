import GOVERNOR_ABI from "./abis/governor.json";
import { AddressZero } from "./variables";

export const GOV_ADDRESS = {
  1: AddressZero,
  4: AddressZero,
  42: "0xfDc7E087395c8ba7EfFc9f888eD52379dB235023",
};

export const GOV_ABI = GOVERNOR_ABI;

export const TARGETS = {
  4: {
    LendingMarket: {
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
    LendingMarket: {
      address: "0xf98bC4c21096b35EF0f7DE3f80349c39E54C12C3",
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
      address: "0x9BFf08164fD83F6349c347Dc755Ea5549f88410b",
      actions: [
        {
          signature: "setNewMemberFee(uint256)",
          params: ["uint256"],
        },
      ],
    },
  },
};
