import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";

import { MaxUint256 } from "@ethersproject/constants";
import useContract from "hooks/useContract";
import { TOKENS } from "constants/variables";
import ABI from "constants/abis/erc20Detailed.json";
import { formatEther } from "@ethersproject/units";
import { useCallback } from "react";

const getDaiAllowance = (contract) => async (_, account, address) => {
  const resp = await contract.allowance(account, address);
  return formatEther(resp);
};

export default function useDaiAllowance(address) {
  const { account, chainId } = useWeb3React();

  const contract = useContract(TOKENS[chainId]?.DAI, ABI);

  const shouldFetch =
    !!contract && typeof account === "string" && typeof chainId === "number";

  const { data } = useSWR(
    shouldFetch ? ["DaiAllowance", account, address] : null,
    getDaiAllowance(contract)
  );

  const approve = useCallback(() => {
    contract.approve(address, MaxUint256);
  }, []);

  return { data, approve };
}
