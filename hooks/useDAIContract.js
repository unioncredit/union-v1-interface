import { useWeb3React } from "@web3-react/core";
import useContract from "./useContract";

const DAI = {
  ADDRESS: {
    4: "0xc7ad46e0b8a400bb3c915120d284aafba8fc4735",
    42: "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
  },
  ABI: [
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "holder",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "nonce",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "expiry",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "allowed",
          type: "bool",
        },
        {
          internalType: "uint8",
          name: "v",
          type: "uint8",
        },
        {
          internalType: "bytes32",
          name: "r",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "s",
          type: "bytes32",
        },
      ],
      name: "permit",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

export default function useDAIContract() {
  const { chainId } = useWeb3React();

  return useContract(DAI.ADDRESS[chainId], DAI.ABI);
}
