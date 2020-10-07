import { useWeb3React } from "@web3-react/core";
import { GOV_ABI, GOV_ADDRESS } from "constants/governance";
import useContract from "../useContract";

export default function useGovernanceContract() {
  const { chainId } = useWeb3React();

  return useContract(GOV_ADDRESS[chainId], GOV_ABI);
}

const TOKEN = {
  address: {
    1: "0xc00e94cb662c3520282e6f5717214004a7f26888",
    42: "0x61460874a7196d6a22d1ee4922473664b3e95270",
  },
  abi: [
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "getCurrentVotes",
      outputs: [
        {
          internalType: "uint96",
          name: "",
          type: "uint96",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
      signature: "0xb4b5ea57",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
      signature: "0x18160ddd",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
      signature: "0x70a08231",
    },
  ],
};

export function useGovernanceTokenContract() {
  const { chainId } = useWeb3React();

  return useContract(TOKEN.address[chainId], TOKEN.abi);
}
