export const AddressZero = "0x0000000000000000000000000000000000000000";

export const BLOCKS_PER_YEAR = {
  1: 2102400,
  4: 2102400,
  42: 2102400,
};

export const ASSET_MANAGER_ADDRESSES = {
  1: AddressZero,
  4: "0x850faD3B4d21e822a0463BF8f347e15a286542FD",
  42: "0x7A8e9527dc1365c0B28A82bEc9Cd0FaD2411Cb46",
};

export const MARKET_REGISTRY_ADDRESSES = {
  1: AddressZero,
  4: "0x0D6449C959c1Db36a25861aAF007e650B45E672a",
  42: "0x2a8b766440A51657cCa10ADe45e6b29cA4a004c4",
};

export const USER_MANAGER_ADDRESSES = {
  1: AddressZero,
  4: "0x2634854c37C412C63085ACCD10fB0e64b0992357",
  42: "0x9BFf08164fD83F6349c347Dc755Ea5549f88410b",
};

export const UNION_TOKEN_ADDRESSES = {
  1: AddressZero,
  4: "0xCBf3Bf007eEcb7F2a412c15B8327942572894Be2",
  42: "0x667242C6d755c302e753D31C16BC8d693b426127",
};

export const GOLDEN_TICKET_NFT_ADDRESS = {
  1: AddressZero,
  4: AddressZero,
  42: AddressZero,
};

export const SCALE = 10 ** 18;

export const BLOCK_SPEED = {
  1: 12,
  4: 12,
  42: 4,
};

export const TOKENS = {
  1: {
    DAI: AddressZero,
    UNION: AddressZero,
  },
  4: {
    DAI: "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
    UNION: "0xCBf3Bf007eEcb7F2a412c15B8327942572894Be2",
  },
  42: {
    DAI: "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    UNION: "0x667242C6d755c302e753D31C16BC8d693b426127",
  },
};

export const REPAY_MARGIN = 1.000011;

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
