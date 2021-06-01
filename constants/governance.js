import GOVERNOR_ABI from "./abis/governor.json";
import {
  AddressZero,
  U_TOKEN_ADDRESSES,
  USER_MANAGER_ADDRESSES,
  ASSET_MANAGER_ADDRESSES,
  COMPOUND_ADAPTER_ADDRESSES,
  PURE_TOKEN_ADAPTER_ADDRESSES,
  ASSET_AND_ADAPTER_PROXY_ADMIN_ADDRESS,
} from "./variables";

export const GOV_ADDRESS = {
  1: AddressZero,
  4: AddressZero,
  42: "0x9045476cCAf43457D8246F1821A340D0E333E15B",
  137: "",
  80001: "0x58A0cb6a8a0F0d01690136b87b0870e611038B1a",
};

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
    assetAndAdapterProxyAdmin: {
      address: ASSET_AND_ADAPTER_PROXY_ADMIN_ADDRESS[42],
      actions: [
        {
          signature: "changeProxyAdmin(address,address)",
          params: ["address", "address"],
        },
        {
          signature: "upgrade(address,address)",
          params: ["address", "address"],
        },
      ],
    },
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
      address: "0xb7F122E01A2eB8c94f93b5cFA6853768c06f686B",
      actions: [
        {
          signature: "setInterestRate(uint256)",
          params: ["uint256"],
        },
      ],
    },
  },
  137: {},
  80001: {},
};
