export const AddressZero = "0x0000000000000000000000000000000000000000";

export const BLOCKS_PER_YEAR = {
  1: 2102400,
  4: 2102400,
  42: 2102400,
};

export const ASSET_MANAGER_ADDRESSES = {
  1: AddressZero,
  4: "0xd0493c674156566f363ff3B6980c1E64742EEde8",
  42: "0x1c73d973dE8FcE3Ae2A072d0d15C9060A2ddbd7B",
};

export const MARKET_REGISTRY_ADDRESSES = {
  1: AddressZero,
  4: "0xf7D7d933e10947Ea17d8439795a5acbCC34afd0e",
  42: "0x4F68CcFE005750F6a39504b71B02076cF8Fc68cC",
};

export const USER_MANAGER_ADDRESSES = {
  1: AddressZero,
  4: "0x601d3E70F74744913Ad10Abb81F8118D78B9F901",
  42: "0xb31718904B5ed1FD2912Fa18957568f38845cC0f",
};

export const UNION_TOKEN_ADDRESSES = {
  1: AddressZero,
  4: "0xc16C4B33538261a80fcd2eE74EBD26fd7f4d2D89",
  42: "0x502f559143548ac80BE6c5Df46e1bDA7f2B812ae",
};

export const COMPTROLLER_ADDRESSES = {
  1: AddressZero,
  4: "0x62Eb8d3Df9F63ef580392a8536036C8F3A9BF319",
  42: "0xD869611a8A6d468A0113d0D48639D6fE33c56b27",
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
  42: 7,
};

export const TOKENS = {
  1: {
    DAI: AddressZero,
    UNION: AddressZero,
  },
  4: {
    DAI: "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
    UNION: "0xc16C4B33538261a80fcd2eE74EBD26fd7f4d2D89",
  },
  42: {
    DAI: "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    UNION: "0x502f559143548ac80BE6c5Df46e1bDA7f2B812ae",
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
