import { BigNumber } from "@ethersproject/bignumber";
import { parseEther } from "@ethersproject/units";

export const ZERO = BigNumber.from("0");

export const WAD = BigNumber.from("1000000000000000000");

export const AddressZero = "0x0000000000000000000000000000000000000000";

export const MIN_REPAY = parseEther("0.01");

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
  1: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
  4: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
  5: "0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e",
  42: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
  137: "0x275617327c958bD06b5D6b871E7f491D76113dd8",
  80001: "0xe9939e7Ea7D7fb619Ac57f648Da7B1D425832631",
  42161: "0x7a7443f8c577d537f1d8cd4a629d40a3148dd7ee",
  421611: AddressZero,
  421613: AddressZero,
};

export const ASSET_MANAGER_ADDRESSES = {
  1: "0xb91a874D9AA8fF7E478bA61286ECc77c1A3E384d",
  4: "0x50A288FB03Cfd701E801F19C48e0ec6e9788e47c",
  5: "0x8B6559057C5206F6c7B19c348834Fc41067a52EB",
  42: "0xB944F1f7B603Aca87B73592ce9267E0BA375f4c9",
  137: "0x64ADBC200cE099B2B029FDF59a5E86Facb751911",
  80001: "0x7ebdbE9E8636dedbB5EfC62111b672484Fe8B385",
  42161: "0x7Aecd107Cb022e1DFd42cC43E9BA94C38BC83275",
  421611: "0xC20d73F59708fF69179A6c759687862E83827850",
  421613: "0x6C4a35A96c1E7CD590292f1a7be578044dAd2837",
};

export const MARKET_REGISTRY_ADDRESSES = {
  1: "0x1ddB9a1F6Bc0dE1d05eBB0FDA61A7398641ae6BE",
  4: "0xF0719b80843D7a694f5ABfB5Da33CA0D6A27c596",
  5: "0xF440eC63091A5cdaff6f8dE19CFcD2b25DE01232",
  42: "0x15B12b8dB6665B31E15Da26275fD54590f2E989c",
  137: "0x8090733bBE6004B54c92284142568A32df56d97A",
  80001: "0x7141B571b5100533Bc3a73dB9160Af743e5802fe",
  42161: "0x82c7cA392644a6c66fcaF9d4efF89e6d875D58D9",
  421611: "0x29882381C17c50B2f2bf8a377B59358b01f7A026",
  421613: "0x7F0856E16a01eE0690406fa3fDDB12B972F22073",
};

export const USER_MANAGER_ADDRESSES = {
  1: "0x49c910Ba694789B58F53BFF80633f90B8631c195",
  4: "0xBB7c70F1dA3C9C324122bFdAE2e6765F06eAD410",
  5: "0xba25eb32f42B1A4c31711B3d4967e4D74561C37B",
  42: "0x391fDb669462FBAA5a7e228f3857281BeCf235EE",
  137: "0xd99ccdb6E05937e53EFDb099eeAe33D559b20F90",
  80001: "0x3635d6F0fE995B2C7aC1A8EF681478f2Dc0dD844",
  42161: "0xb71F3D4342AaE0b8D531E14D2CF2F45d6e458A5F",
  421611: "0xbbEc82D7a37ef0e04671b27Bd1fd8CE952AB589E",
  421613: "0x066Acb6Fc27bd05AB8e8A9C5bAE4f585B9e82d06",
};

export const UNION_TOKEN_ADDRESSES = {
  1: "0x5Dfe42eEA70a3e6f93EE54eD9C321aF07A85535C",
  4: "0xC7071B73D019aE9F5CC00ac9b506643b8A6a2b05",
  5: "0x23B0483E07196c425d771240E81A9c2f1E113D3A",
  42: "0x08AF898e65493D8212c8981FAdF60Ff023A91150",
  137: "0x7c009F092395C35BDD87C74D2a907B0E3115026a",
  80001: "0xB24cEE3786114bcFBc71E48d574a58E2367bEBFf",
  42161: "0x6DBDe0E7e563E34A53B1130D6B779ec8eD34B4B9",
  421611: "0xb371fe920071F73ca81b4D57C72639480F3886a7",
  421613: "0x804FB9d2B0f3310bC20D91B958D33F40fA87ee5a",
};

export const UNION_WRAPPED_TOKEN_ADDRESSES = {
  1: "0x20c375e822b6264E22941B74943F940A1CfE5F25",
  4: "0x4616b36Fb1c70a4aB05afb53eDA6E9d09efd1dC9",
  5: "0xbf723c4641800a5878654ca9384145D70721f9E8",
  42: AddressZero,
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const COMPTROLLER_ADDRESSES = {
  1: "0x216dE4089dCdD7B95BC34BdCe809669C788a9A5d",
  4: "0x925397DC3327Ade045Db18AB7881FFdDbC821d70",
  5: "0x68c44b8f51F199a02094f5a04dB3A6B8CfCd0722",
  42: "0x85FD0fA5Cc2f0B3A12C146C5B5A37d9e269b3Ba8",
  137: "0x749D7D8bc289805aED3e5B55A7A38292596DE389",
  80001: "0x10D58077807a010CC179CA6cf936d03F6c6a197f",
  42161: "0x641DD6258cb3E948121B10ee51594Dc2A8549fe1",
  421611: "0xB9A7e04e6c75C718904F0De0F5Cc6a2728a3F50C",
  421613: "0x1fF6c719a652Bb3dF9EE2740fD0E9524dBdd331c",
};

export const U_TOKEN_ADDRESSES = {
  1: "0x954F20DF58347b71bbC10c94827bE9EbC8706887",
  4: "0x8162c1a505Cfd5F36032d6B1fB78070A2bbdC1fd",
  5: "0xe3686Dad4E4bd2203051D605C160c9a3f5D3dA04",
  42: "0x1bAa7FC92A86768D5F0Dd6Ff3AD7155eCD8cB293",
  137: "0xA0e739fF8E0F56346EDc0eb99Bb1478173Ee73ad",
  80001: "0x80987e8f1E0EDBb241482b69B0aD445B8872152e",
  42161: "0x954F20DF58347b71bbC10c94827bE9EbC8706887",
  421611: "0x08f2F2C68f203a71a119E2293cB3854261EFAE3d",
  421613: "0x7A3a24B010C53307eD736CB08524bD24378d1b51",
};

export const TREASURY_VESTOR_ADDRESSES = {
  1: "0x641DD6258cb3E948121B10ee51594Dc2A8549fe1",
  4: "0x2d8EBac420169dd73CD4712A6C2d15fcE3af3525",
  5: "0x0D25131E098DfB65746ecC3C527865A7bBA71886",
  42: "0x137698a81E9384175Ab5A7D715E5df62DF5E6c16",
  137: "0x7f9BA3c7F0DE073cb2B9D394F913E0c114B0cF02",
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const RESERVOIR_1_ADDRESSES = {
  1: "0x6DBDe0E7e563E34A53B1130D6B779ec8eD34B4B9",
  4: "0xC3FdB85912a2f64FC5eDB0f6c775B33B22317F89",
  5: "0xc124047253c87EF90aF9f4EFC12C281b479c4769",
  42: "0x28d1999FDC8a5396b11E86F8fd247a85d4d4D7F9",
  137: "0x70967Acb0b0474747C34905588CD2f56572Cc618",
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
  1: "0xe1b3F07a9032F0d3deDf3E96c395A4Da74130f6e",
  4: "0x30CE06AE0D282F25Ee8AFDf1536229bc48B0Bac8",
  5: "0x88fBf51538dB90b04809f9853a42c764fdFbE888",
  42: "0x2aB13c159c2A2c001910239698Da970f56A4D1Aa",
  137: "0x7e376e9eccD105CA47f2d7EdE8e106A6F72F4C9B",
  // 80001: "0xcFc4Ce89564C6498F006Ec40533919EC806358aB", // alpha
  80001: "0x02fc8f9dd8cfc9af89a2d772b7e5daaa291be1cc", // bravo
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const TIMELOCK_ADDRESSES = {
  1: "0xBBD3321f377742c4b3fe458b270c2F271d3294D8",
  4: "0x5C388efD55D13775ac99CcBa1395EF1ef17372b2",
  5: "0x90dfc868784f5e684Bb8650Ab218775fc9F28860",
  42: "0x107e3811900A93940cE8694fF9C6217Be900faAF",
  137: "0x978E4a6B2D6FC7D3abb0f26c4A4DFaaEF132C4Af",
  // 80001: "0x32bA27718d351409353f9352E374Be412B2C597B", // alpha
  80001: "0x8605b7dcfec98fd218e8c561a52838af4d1d569d", // bravo
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const FIXED_INTEREST_RATE_MODEL_ADDRESSES = {
  1: "0xfDd998ce04AB8f48B473cE4C9af1C2F8F8E264Eb",
  4: "0x44Ad105260b844774A601cD2029Ebd43A329D4AB",
  5: "0xE7d93b94eAC2d3E49bFcc222d07a39e44EbBe934",
  42: "0x9D00479921d36273774D53640FB36248d4de91E3",
  137: "0x75B3B799a80d36EE3E85E0216062313f623D3515",
  80001: "0xF2C4aD00F716F451cf5D333201980Cba36b5dE77",
  42161: "0x051e2514E3fE8da88CaA2951442a21042BCe99Ea",
  421611: "0xf26b3151508b6a7DfDD95bA5d5099F5E78D7bC62",
  421613: "0xcC78D0B12B93c93Ab459b0f304aF24a8E30797D4",
};

export const COMPOUND_ADAPTER_ADDRESSES = {
  1: "0x303CbdADF370F6bBa79651f680498E829cB860D5",
  4: "0x4900Cd09F6497977CB0629C9E9A549961BE1117d",
  5: AddressZero,
  42: "0xD3FfB854C11096e0d5EFD6Ba6d3c1BeF4B89add9",
  137: AddressZero,
  80001: AddressZero,
  42161: AddressZero,
  421611: AddressZero,
  421613: AddressZero,
};

export const PURE_TOKEN_ADAPTER_ADDRESSES = {
  1: "0x62DD06026F5f8e874eEfF362b1280CD9A2057b7d",
  4: "0x2A881eBE038cA2b6d2A74b03a07D7819029EF087",
  5: "0xFE73569bB837D24076B40a4fd244ddaeE90F0f09",
  42: "0x48941f5Ad4E6b313cC691e088c7E241617C5a9B2",
  137: "0x2F4076c06bB4b5933D8c9E45F2298C45e61139EB",
  80001: "0x9476234cb7c4DadFAe92F89Bdc1f9c1f00608332",
  42161: "0xdC3c984f2Ecb7Ee2540bb0B9EfE9540204cdAB57",
  421611: "0xEC5f6355D6e4695dE32d2633608EeCdDB185c52a",
  421613: "0x792ACBbF38Df3A60ABa14851fC518620C7AE386c",
};

export const AAVE_ADAPTER_ADDRESSES = {
  1: "0xE8c77A541c933Aa1320Aa2f89a61f91130e4012d",
  4: AddressZero,
  5: "0x71c103E1e4fD29f737D36a6bD8149d73EA573d18",
  42: AddressZero,
  137: "0x601b9399eccf091cD5EC4CdB58A835bfbCe19C4E",
  80001: "0xbBEc291424fB4ce2Dc0d95Bc3316Ec07CB4c2C7D",
  42161: AddressZero,
  421611: AddressZero,
  421613: "0xF293AE13b1d58Cf1fC22070e34D884B44B930483",
};

export const SCALE = 10 ** 18;

export const BLOCK_SPEED = {
  1: 12, //12 seconds,
  4: 12,
  5: 12,
  42: 5, //5.49,
  137: 2,
  80001: 2,
  42161: 12,
  421611: 12,
  421613: 12,
};

export const TOKENS = {
  1: {
    DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
    UNION: UNION_TOKEN_ADDRESSES[1],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[1],
  },
  4: {
    DAI: "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
    UNION: UNION_TOKEN_ADDRESSES[4],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[4],
  },
  5: {
    DAI: "0xDF1742fE5b0bFc12331D8EAec6b478DfDbD31464",
    UNION: UNION_TOKEN_ADDRESSES[5],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[5],
  },
  42: {
    DAI: "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    UNION: UNION_TOKEN_ADDRESSES[42],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[42],
  },
  137: {
    DAI: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    UNION: UNION_TOKEN_ADDRESSES[137],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[137],
  },
  80001: {
    DAI: "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F",
    UNION: UNION_TOKEN_ADDRESSES[80001],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[80001],
  },
  42161: {
    DAI: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    UNION: UNION_TOKEN_ADDRESSES[42161],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[42161],
  },
  421611: {
    DAI: "0x5364Dc963c402aAF150700f38a8ef52C1D7D7F14",
    UNION: UNION_TOKEN_ADDRESSES[421611],
    WRAPPED_UNION: UNION_WRAPPED_TOKEN_ADDRESSES[421611],
  },
  421613: {
    DAI: "0x7e752bC77eBE2225B327e6ebF09fAD7801873931",
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
    user: "https://api.thegraph.com/subgraphs/name/geraldhost/union-goerli",
    gov: "https://api.thegraph.com/subgraphs/name/geraldhost/union-goerli",
    rewards: "https://api.thegraph.com/subgraphs/name/geraldhost/union-goerli",
    utoken: "https://api.thegraph.com/subgraphs/name/geraldhost/union-goerli",
  },
};
