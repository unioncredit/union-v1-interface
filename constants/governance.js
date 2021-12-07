import GOVERNOR_ABI from "./abis/governor.json";
import {
  U_TOKEN_ADDRESSES,
  USER_MANAGER_ADDRESSES,
  ASSET_MANAGER_ADDRESSES,
  COMPOUND_ADAPTER_ADDRESSES,
  PURE_TOKEN_ADAPTER_ADDRESSES,
  FIXED_INTEREST_RATE_MODEL_ADDRESSES,
  GOVERNOR_ADDRESSES,
  AAVE_ADAPTER_ADDRESSES,
} from "./variables";

export const GOV_ADDRESS = GOVERNOR_ADDRESSES;

export const GOV_ABI = GOVERNOR_ABI;

export const TARGETS = {
  4: {
    UToken: {
      address: U_TOKEN_ADDRESSES[4],
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
      address: USER_MANAGER_ADDRESSES[4],
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
      address: U_TOKEN_ADDRESSES[42],
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
      address: USER_MANAGER_ADDRESSES[42],
      actions: [
        {
          signature: "setNewMemberFee(uint256)",
          params: ["uint256"],
        },
      ],
    },
    AssetManager: {
      address: ASSET_MANAGER_ADDRESSES[42],
      actions: [
        {
          signature: "upgradeTo(address)",
          params: ["address"],
        },
        {
          signature: "overwriteAdapters(address[])",
          params: ["address[]"],
        },
        {
          signature: "changeWithdrawSequence(uint256[])",
          params: ["uint256[]"],
        },
        {
          signature: "newAdmin (address)",
          params: ["address"],
        },
      ],
    },
    CompoundAdapter: {
      address: COMPOUND_ADAPTER_ADDRESSES[42],
      actions: [
        {
          signature: "upgradeTo(address)",
          params: ["address"],
        },
        {
          signature: "setFloor(address,uint256)",
          params: ["address", "uint256"],
        },
        {
          signature: "setCeiling(address,uint256)",
          params: ["address", "uint256"],
        },
        {
          signature: "newAdmin (address)",
          params: ["address"],
        },
      ],
    },
    PureTokenAdapter: {
      address: PURE_TOKEN_ADAPTER_ADDRESSES[42],
      actions: [
        {
          signature: "upgradeTo(address)",
          params: ["address"],
        },
        {
          signature: "setFloor(address,uint256)",
          params: ["address", "uint256"],
        },
        {
          signature: "setCeiling(address,uint256)",
          params: ["address", "uint256"],
        },
        {
          signature: "newAdmin (address)",
          params: ["address"],
        },
      ],
    },
    FixedInterestRate: {
      address: FIXED_INTEREST_RATE_MODEL_ADDRESSES[42],
      actions: [
        {
          signature: "setInterestRate(uint256)",
          params: ["uint256"],
        },
      ],
    },
  },
  137: {
    UToken: {
      address: U_TOKEN_ADDRESSES[137],
      actions: [
        {
          signature: "setOriginationFee(uint256)",
          params: ["uint256"],
        },
      ],
    },
    AaveAdapter: {
      address: AAVE_ADAPTER_ADDRESSES[137],
      actions: [
        {
          signature: "setFloor(address,uint256)",
          params: ["address", "uint256"],
        },
        {
          signature: "setCeiling(address,uint256)",
          params: ["address", "uint256"],
        },
      ],
    },
    PureTokenAdapter: {
      address: PURE_TOKEN_ADAPTER_ADDRESSES[137],
      actions: [
        {
          signature: "setFloor(address,uint256)",
          params: ["address", "uint256"],
        },
        {
          signature: "setCeiling(address,uint256)",
          params: ["address", "uint256"],
        },
      ],
    },
  },
  80001: {
    FixedInterestRate: {
      address: FIXED_INTEREST_RATE_MODEL_ADDRESSES[80001],
      actions: [
        {
          signature: "setInterestRate(uint256)",
          params: ["uint256"],
        },
      ],
    },
  },
};
