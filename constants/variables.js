export const AddressZero = "0x0000000000000000000000000000000000000000";

export const BLOCKS_PER_YEAR = {
  1: 2407328,
  4: 2102400,
  42: 5744262,
  137: 15768000,
  80001: 15768000,
};

// due to block range restriction on polygon rpc
export const EVENT_START_BLOCK = {
  1: 0,
  4: 0,
  42: 0,
  137: 16642085,
  80001: 15129900,
};

// due to block range restriction on polygon rpc
export const EVENT_BLOCK_INTERVAL = {
  1: 100000,
  42: 100000,
  137: 100000,
  80001: 10000000,
};

export const ASSET_MANAGER_ADDRESSES = {
  1: "0xb91a874D9AA8fF7E478bA61286ECc77c1A3E384d",
  4: "0x6aB155b8947b0067b88C1371C674559A502dDE32",
  42: "0xB944F1f7B603Aca87B73592ce9267E0BA375f4c9",
  137: "0x64ADBC200cE099B2B029FDF59a5E86Facb751911",
  80001: "0x7ebdbE9E8636dedbB5EfC62111b672484Fe8B385",
};

export const MARKET_REGISTRY_ADDRESSES = {
  1: "0x1ddB9a1F6Bc0dE1d05eBB0FDA61A7398641ae6BE",
  4: "0x2a9AABCD709Dd5e57DD5D2d06BEF7878698aCBeB",
  42: "0x15B12b8dB6665B31E15Da26275fD54590f2E989c",
  137: "0x8090733bBE6004B54c92284142568A32df56d97A",
  80001: "0x7141B571b5100533Bc3a73dB9160Af743e5802fe",
};

export const USER_MANAGER_ADDRESSES = {
  1: "0x49c910Ba694789B58F53BFF80633f90B8631c195",
  4: "0xaD2209F2c21756c548724E7F19eD522F48Fe64F0",
  42: "0x391fDb669462FBAA5a7e228f3857281BeCf235EE",
  137: "0xd99ccdb6E05937e53EFDb099eeAe33D559b20F90",
  80001: "0x3635d6F0fE995B2C7aC1A8EF681478f2Dc0dD844",
};

export const UNION_TOKEN_ADDRESSES = {
  1: "0x5Dfe42eEA70a3e6f93EE54eD9C321aF07A85535C",
  4: "0xBd3a3c823A7442193BE5Ca8005D98F0599Cc8bD5",
  42: "0x08AF898e65493D8212c8981FAdF60Ff023A91150",
  137: "0x7c009F092395C35BDD87C74D2a907B0E3115026a",
  80001: "0xB24cEE3786114bcFBc71E48d574a58E2367bEBFf",
};

export const COMPTROLLER_ADDRESSES = {
  1: "0x216dE4089dCdD7B95BC34BdCe809669C788a9A5d",
  4: "0x491337330Fd30cAfFC93015F0f9C83419d96B413",
  42: "0x85FD0fA5Cc2f0B3A12C146C5B5A37d9e269b3Ba8",
  137: "0x749D7D8bc289805aED3e5B55A7A38292596DE389",
  80001: "0x10D58077807a010CC179CA6cf936d03F6c6a197f",
};

export const U_TOKEN_ADDRESSES = {
  1: "0x954F20DF58347b71bbC10c94827bE9EbC8706887",
  4: "0x5F17893aFabbcC7E63b486807660CB727BE5E557",
  42: "0x1bAa7FC92A86768D5F0Dd6Ff3AD7155eCD8cB293",
  137: "0xA0e739fF8E0F56346EDc0eb99Bb1478173Ee73ad",
  80001: "0x80987e8f1E0EDBb241482b69B0aD445B8872152e",
};

export const TREASURY_VESTOR_ADDRESSES = {
  1: "0x641DD6258cb3E948121B10ee51594Dc2A8549fe1",
  4: "0x76a00ca4B0a5e44D4745CE9C3C229b395a57ccc0",
  42: "0x137698a81E9384175Ab5A7D715E5df62DF5E6c16",
  137: "0x7f9BA3c7F0DE073cb2B9D394F913E0c114B0cF02",
  80001: AddressZero,
};

export const RESERVOIR_1_ADDRESSES = {
  1: "0x6DBDe0E7e563E34A53B1130D6B779ec8eD34B4B9",
  4: "0x7103C2Ef543De2258F1e6a0a5637331d2C5C29b9",
  42: "0x28d1999FDC8a5396b11E86F8fd247a85d4d4D7F9",
  137: "0x70967Acb0b0474747C34905588CD2f56572Cc618",
  80001: AddressZero,
};

export const RESERVOIR_2_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
};

export const GOVERNOR_ADDRESSES = {
  1: "0x011e5846975c6463a8c6337EECF3cbF64e328884",
  4: "0x0f991cD13a3D4e384fc303355e4f09913eEd3023",
  42: "0x2aB13c159c2A2c001910239698Da970f56A4D1Aa",
  137: "0x7e376e9eccD105CA47f2d7EdE8e106A6F72F4C9B",
  // 80001: "0xcFc4Ce89564C6498F006Ec40533919EC806358aB", // alpha
  80001: "0x02fc8f9dd8cfc9af89a2d772b7e5daaa291be1cc", // bravo
};

export const TIMELOCK_ADDRESSES = {
  1: "0xBBD3321f377742c4b3fe458b270c2F271d3294D8",
  4: "0xd1B972Af3eeF8620f2cE33a467c99eB41E90b52F",
  42: "0x107e3811900A93940cE8694fF9C6217Be900faAF",
  137: "0x978E4a6B2D6FC7D3abb0f26c4A4DFaaEF132C4Af",
  // 80001: "0x32bA27718d351409353f9352E374Be412B2C597B", // alpha
  80001: "0x8605b7dcfec98fd218e8c561a52838af4d1d569d", // bravo
};

export const FIXED_INTEREST_RATE_MODEL_ADDRESSES = {
  1: "0xfDd998ce04AB8f48B473cE4C9af1C2F8F8E264Eb",
  4: AddressZero,
  42: "0x9D00479921d36273774D53640FB36248d4de91E3",
  137: "0x75B3B799a80d36EE3E85E0216062313f623D3515",
  80001: "0xF2C4aD00F716F451cf5D333201980Cba36b5dE77",
};

export const COMPOUND_ADAPTER_ADDRESSES = {
  1: "0x303CbdADF370F6bBa79651f680498E829cB860D5",
  4: "0xa7f64787603eb4fcaE868AF13146BC900F09541F",
  42: "0xD3FfB854C11096e0d5EFD6Ba6d3c1BeF4B89add9",
  137: AddressZero,
  80001: AddressZero,
};

export const PURE_TOKEN_ADAPTER_ADDRESSES = {
  1: "0x62DD06026F5f8e874eEfF362b1280CD9A2057b7d",
  4: "0x97E92f00144D3C5B5d365147e0A44962d9E57f15",
  42: "0x48941f5Ad4E6b313cC691e088c7E241617C5a9B2",
  137: "0x2F4076c06bB4b5933D8c9E45F2298C45e61139EB",
  80001: "0x9476234cb7c4DadFAe92F89Bdc1f9c1f00608332",
};

export const AAVE_ADAPTER_ADDRESSES = {
  1: "0xE8c77A541c933Aa1320Aa2f89a61f91130e4012d",
  4: AddressZero,
  42: AddressZero,
  137: "0x601b9399eccf091cD5EC4CdB58A835bfbCe19C4E",
  80001: "0xbBEc291424fB4ce2Dc0d95Bc3316Ec07CB4c2C7D",
};

export const SCALE = 10 ** 18;

export const BLOCK_SPEED = {
  1: 13, //13.1,
  4: 12,
  42: 5, //5.49,
  137: 2,
  80001: 2,
};

export const TOKENS = {
  1: {
    DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
    UNION: UNION_TOKEN_ADDRESSES[1],
  },
  4: {
    DAI: "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
    UNION: UNION_TOKEN_ADDRESSES[4],
  },
  42: {
    DAI: "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    UNION: UNION_TOKEN_ADDRESSES[42],
  },
  137: {
    DAI: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    UNION: UNION_TOKEN_ADDRESSES[137],
  },
  80001: {
    DAI: "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F",
    UNION: UNION_TOKEN_ADDRESSES[80001],
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

export const GRAPHQL_URLS = {
  137: {
    user: "https://api.thegraph.com/subgraphs/name/unioncredit/union-user",
    gov: "https://api.thegraph.com/subgraphs/name/unioncredit/union-gov",
    rewards:
      "https://api.thegraph.com/subgraphs/name/unioncredit/union-rewards",
    utoken: "https://api.thegraph.com/subgraphs/name/unioncredit/union-utoken",
  },
  42: {
    user: "https://api.thegraph.com/subgraphs/name/geraldhost/union-user-kovan",
    gov: "https://api.thegraph.com/subgraphs/name/geraldhost/union-gov-kovan",
    rewards:
      "https://api.thegraph.com/subgraphs/name/geraldhost/union-rewards-kovan",
    utoken:
      "https://api.thegraph.com/subgraphs/name/geraldhost/union-utoken-kovan",
  },
  1: {
    user: "https://api.thegraph.com/subgraphs/name/geraldhost/union-user-mainnet",
    gov: "https://api.thegraph.com/subgraphs/name/geraldhost/union-gov-mainnet",
    rewards:
      "https://api.thegraph.com/subgraphs/name/geraldhost/union-rewards-mainnet",
    utoken:
      "https://api.thegraph.com/subgraphs/name/geraldhost/union-utoken-mainnet",
  },
};
