import { BigNumber } from "@ethersproject/bignumber";
import { parseEther } from "@ethersproject/units";
import { ethers } from "ethers";

export const ZERO = BigNumber.from("0");

export const WAD = BigNumber.from("1000000000000000000");

export const AddressZero = ethers.constants.AddressZero;

export const MIN_REPAY = parseEther("0.1");

export const REPAY_MARGIN = BigNumber.from("1000300000000000000");

export const BLOCKS_PER_YEAR = {
  1: 2407328,
  4: 2102400,
  5: 2407328,
  42: 5744262,
  137: 15768000,
  80001: 15768000,
  42161: 2407328,
  421611: 2407328,
  421613: 2407328,
};

// due to block range restriction on polygon rpc
export const EVENT_START_BLOCK = {
  1: 0,
  4: 0,
  5: 7384200,
  42: 0,
  137: 16642085,
  80001: 15129900,
  421613: 93200,
};

// due to block range restriction on polygon rpc
export const EVENT_BLOCK_INTERVAL = {
  1: 100000,
  5: 100000,
  42: 100000,
  137: 100000,
  80001: 10000000,
  421613: 100000,
};

export const MULTICALL_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: "0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e",
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const UNION_LENS_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: "0xdF6C38f795300C40F102d933980076dF24295895",
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const ASSET_MANAGER_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: "0x0Fb3B58Dc75647A4c5224B0e1eC3f710110fDC45",
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const MARKET_REGISTRY_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: "0x1317467564ce1eEaFD1760eF2d80DC7E71fb9c55",
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const USER_MANAGER_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: "0xB2499C1D140cBFD499a4d29Da7d61d9a70462842",
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const UNION_TOKEN_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: "0x23B0483E07196c425d771240E81A9c2f1E113D3A",
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const UNION_WRAPPED_TOKEN_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: AddressZero,
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const COMPTROLLER_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: "0x5A571c18AB1B21797be988D38d3e08402c03a984",
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const U_TOKEN_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: "0x68d089D45035a2da0d1F60a47B21Dd2e9C26F8fe",
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const TREASURY_VESTOR_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: AddressZero,
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const RESERVOIR_1_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: AddressZero,
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const RESERVOIR_2_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
};

export const GOVERNOR_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: AddressZero,
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const TIMELOCK_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: AddressZero,
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const FIXED_INTEREST_RATE_MODEL_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: "0xAe930fb9EcE01458C49e35b30091f1456b1A2ee4",
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const COMPOUND_ADAPTER_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: AddressZero,
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const PURE_TOKEN_ADAPTER_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: "0xd0bd1e60Bc3b64fE07e76A12424b22b8b51dBB2D",
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const AAVE_ADAPTER_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  5: AddressZero,
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const SCALE = 10 ** 18;

export const BLOCK_SPEED = {
  1: 13, //13.1,
  4: 12,
  5: 12,
  42: 5, //5.49,
  137: 2,
  80001: 2,
  42161: 13,
  421611: 13,
  421613: 13,
};

export const TOKENS = {
  1: {
    DAI: AddressZero,
    UNION: UNION_TOKEN_ADDRESSES[1],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[1],
  },
  4: {
    DAI: AddressZero,
    UNION: UNION_TOKEN_ADDRESSES[4],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[4],
  },
  5: {
    DAI: "0xdc31ee1784292379fbb2964b3b9c4124d8f89c60",
    UNION: UNION_TOKEN_ADDRESSES[5],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[5],
  },
  42: {
    DAI: AddressZero,
    UNION: UNION_TOKEN_ADDRESSES[42],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[42],
  },
  137: {
    DAI: AddressZero,
    UNION: UNION_TOKEN_ADDRESSES[137],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[137],
  },
  80001: {
    DAI: AddressZero,
    UNION: UNION_TOKEN_ADDRESSES[80001],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[80001],
  },
  42161: {
    DAI: AddressZero,
    UNION: UNION_TOKEN_ADDRESSES[42161],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[42161],
  },
  421611: {
    DAI: AddressZero,
    UNION: UNION_TOKEN_ADDRESSES[421611],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[421611],
  },
  421613: {
    DAI: AddressZero,
    UNION: UNION_TOKEN_ADDRESSES[421613],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[421613],
  },
};

export const MESSAGE = `Hello from the Union team. Please verify your email and wallet ownership by signing this message. This doesn't cost anything and your email won't be publicly visible.`;

export const OFAC_SANCTIONED = [
  /* Belarus */
  "BY",
  /* Code D'Ivoire */
  "CI",
  /* Cuba */
  "CU",
  /* Congo */
  "CD",
  /* Iran */
  "IR",
  /* Iraq */
  "IQ",
  /* Liberia */
  "LR",
  /* Myanmar (Burma) */
  "MM",
  /* North Korea */
  "KP",
  /* Sudan */
  "SD",
  /* South Sudan */
  "SS",
  /* Syria */
  "SY",
  /* Zimbabwe */
  "ZW",
];

export const GRAPHQL_URLS = {
  137: {
    user: "https://api.thegraph.com/subgraphs/name/unioncredit/union-user",
    gov: "https://api.thegraph.com/subgraphs/name/unioncredit/union-gov",
    rewards:
      "https://api.thegraph.com/subgraphs/name/unioncredit/union-rewards",
    utoken: "https://api.thegraph.com/subgraphs/name/unioncredit/union-utoken",
  },
  42: {
    user: "https://api.thegraph.com/subgraphs/name/geraldhost/union-kovan",
    gov: "https://api.thegraph.com/subgraphs/name/geraldhost/union-kovan",
    rewards: "https://api.thegraph.com/subgraphs/name/geraldhost/union-kovan",
    utoken: "https://api.thegraph.com/subgraphs/name/geraldhost/union-kovan",
  },
  1: {
    user: "https://api.thegraph.com/subgraphs/name/geraldhost/union",
    gov: "https://api.thegraph.com/subgraphs/name/geraldhost/union",
    rewards: "https://api.thegraph.com/subgraphs/name/geraldhost/union",
    utoken: "https://api.thegraph.com/subgraphs/name/geraldhost/union",
  },
  42161: {
    user: "https://api.thegraph.com/subgraphs/name/geraldhost/union-arbitrum",
    // governance uses L1 subgraph
    gov: "https://api.thegraph.com/subgraphs/name/geraldhost/union",
    rewards:
      "https://api.thegraph.com/subgraphs/name/geraldhost/union-arbitrum",
    utoken: "https://api.thegraph.com/subgraphs/name/geraldhost/union-arbitrum",
  },
  4: {
    user: "",
    gov: "https://api.thegraph.com/subgraphs/id/Qmdz8GznZw2A8LKMn6gYpjLh7q4gUtA79M2GTwVo2n5gva",
    rewards: "",
    utoken: "",
  },
  5: {
    user: "",
    gov: "",
    rewards: "",
    utoken: "",
  },
};
