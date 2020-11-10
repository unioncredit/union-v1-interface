import governorAlpha from "./abis/governorAlpha.json";
import comp from "./abis/comp.json";

export const GOV_ADDRESS = {
  1: "0xc0da01a04c3f3e0be433606045bb7017a7323e38",
  42: "0xfDc7E087395c8ba7EfFc9f888eD52379dB235023",
};

export const GOV_ABI = governorAlpha;

export const GOV_TOKEN_ADDRESS = {
  1: "0xc00e94cb662c3520282e6f5717214004a7f26888",
  42: "0x667242C6d755c302e753D31C16BC8d693b426127",
};

export const GOV_TOKEN_ABI = comp;

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
