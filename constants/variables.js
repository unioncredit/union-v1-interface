export const AddressZero = "0x0000000000000000000000000000000000000000";

export const BLOCKS_PER_YEAR = {
  1: 2102400,
  4: 2102400,
  42: 2102400,
  137: 15768000,
  80001: 15768000,
};

// due to block range restriction on polygon rpc
export const EVENT_START_BLOCK = {
  1: 0,
  4: 0,
  42: 0,
  1337: 0,
  80001: 14734890,
};

// due to block range restriction on polygon rpc
export const EVENT_BLOCK_INTERVAL = {
  1: 10000000,
  4: 10000000,
  42: 10000000,
  1337: 10000000,
  80001: 10000000,
};

export const ASSET_AND_ADAPTER_PROXY_ADMIN_ADDRESS = {
  1: AddressZero,
  4: AddressZero,
  42: "0x672760099f9752631655dbc6fdf2b88f4890378b",
  137: AddressZero,
  80001: "0xb6AFb3F5ADc5601e43870c4B42276D959915eb13",
};

export const ASSET_MANAGER_ADDRESSES = {
  1: AddressZero,
  4: "0xd0493c674156566f363ff3B6980c1E64742EEde8",
  42: "0x1c73d973dE8FcE3Ae2A072d0d15C9060A2ddbd7B",
  137: AddressZero,
  80001: "0x42D1544386741AB383ab19174BEb266ec48D64Fb",
};

export const MARKET_REGISTRY_ADDRESSES = {
  1: AddressZero,
  4: "0xf7D7d933e10947Ea17d8439795a5acbCC34afd0e",
  42: "0x4F68CcFE005750F6a39504b71B02076cF8Fc68cC",
  137: AddressZero,
  80001: "0x24EA593EDF0e838d76070dA4341c578214aCA0F3",
};

export const USER_MANAGER_ADDRESSES = {
  1: AddressZero,
  4: "0x601d3E70F74744913Ad10Abb81F8118D78B9F901",
  42: "0xb31718904B5ed1FD2912Fa18957568f38845cC0f",
  137: AddressZero,
  80001: "0x29Cd3C6c21e74d038451cee58d11FEd4B1EF18f8",
};

export const UNION_TOKEN_ADDRESSES = {
  1: AddressZero,
  4: "0xc16C4B33538261a80fcd2eE74EBD26fd7f4d2D89",
  42: "0x502f559143548ac80BE6c5Df46e1bDA7f2B812ae",
  137: AddressZero,
  80001: "0x9B0A13e29F3E0c60Cc3E626720a7446d36c9dC79",
};

export const COMPTROLLER_ADDRESSES = {
  1: AddressZero,
  4: "0x62Eb8d3Df9F63ef580392a8536036C8F3A9BF319",
  42: "0xD869611a8A6d468A0113d0D48639D6fE33c56b27",
  137: AddressZero,
  80001: "0xf14CD73f04518D8cC0a52bF6E5A6AF66f3E01E1e",
};

export const U_TOKEN_ADDRESSES = {
  1: AddressZero,
  4: "0x286dc33F2fE0D3C4368cc00b2643945249F6555A",
  42: "0x1474DDc49655794A479947aA9b3B3563CeaA2e19",
  137: AddressZero,
  80001: "0xfe87F3f6651f1Da184d65B95D0d6081cFB249134",
};

export const GOLDEN_TICKET_NFT_ADDRESS = {
  1: AddressZero,
  4: AddressZero,
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
};

export const RESERVOIR_1_ADDRESSES = {
  1: AddressZero,
  4: "0x8c6149A463212A9f388D83e61d724c36b8E5dd12",
  42: "0xe70c89F37598e6a3B9DB48b7706998Fd18aC9Be0",
  137: AddressZero,
  80001: AddressZero,
};

export const RESERVOIR_2_ADDRESSES = {
  1: AddressZero,
  4: "0xb8396845897588A45E3653e9EFd4098C218EC89D",
  42: "0x421e4F40977F724Ca15d1dD1a3F9f893dB4883De",
  137: AddressZero,
  80001: AddressZero,
};

export const GOVERNOR_ADDRESSES = {
  1: AddressZero,
  4: "0x51658ff9283BdFAFF845F99Fe693a1Dc0bDF44a7",
  42: "0x9045476cCAf43457D8246F1821A340D0E333E15B",
  137: AddressZero,
  80001: "0x578F3e7281247b90C8e4646bbFCb8dE42B835D7D",
};

export const TIMELOCK_ADDRESSES = {
  1: AddressZero,
  4: "0x9815370e9950fc0fbAc50A32F38edaD9cef06429",
  42: "0x733Cf6612f2b208344EdA8fbbD7Ede87D01Fd46F",
  137: AddressZero,
  80001: "0x536764507865CBB2b1Db488903A3C0e1B2C0D694",
};

export const FIXED_INTEREST_RATE_MODEL_ADDRESSES = {
  1: AddressZero,
  4: "0xa1a54f34e210101B2663AEe505E020488DaED0D5",
  42: "0xb7F122E01A2eB8c94f93b5cFA6853768c06f686B",
  137: AddressZero,
  80001: "0x68EC1F75045Ca3634609401AD22fd30b0d54D3CE",
};

export const COMPOUND_ADAPTER_ADDRESSES = {
  1: AddressZero,
  4: "0x5522371babA983a6ECd1f04bA2077d5F97F73283",
  42: "0xaf7bbAc0284a3b5D7472c10dDF37Cc23c4c20EAC",
  137: AddressZero,
  80001: AddressZero,
};

export const PURE_TOKEN_ADAPTER_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  42: "0x4aa4B980C67F5A482046E0309333130cA7bFC483",
  137: AddressZero,
  80001: "0x83c5760B31DaA564310fCc6e09CD2b255258E2D2",
};

export const SCALE = 10 ** 18;

export const BLOCK_SPEED = {
  1: 12,
  4: 12,
  42: 7,
  137: 2,
  80001: 2,
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
  137: {
    DAI: AddressZero,
    UNION: AddressZero,
  },
  80001: {
    DAI: "0xBB103524f478e06422Db7b8A831a50063F4B24b1",
    UNION: "0x9B0A13e29F3E0c60Cc3E626720a7446d36c9dC79",
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
