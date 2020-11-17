import { isAddress } from "@ethersproject/address";
import type { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useUserContract from "../contracts/useUserContract";
import useCurrentToken from "../useCurrentToken";

const getCreditLimit = (userContract: Contract) => async (
  _: any,
  account: string,
  tokenAddress: string
) => {
  const res = await userContract.getCreditLimit(tokenAddress, account);

  return Number(formatUnits(res, 18));
};

export default function useCreditLimit() {
  const { account, library } = useWeb3React();
  const curToken = useCurrentToken();

  const userContract = useUserContract();

  const shouldFetch =
    !!userContract &&
    typeof account === "string" &&
    isAddress(curToken) &&
    !!library;

  return useSWR(
    shouldFetch ? ["CreditLimit", account, curToken] : null,
    getCreditLimit(userContract)
  );
}