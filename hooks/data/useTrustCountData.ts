import { isAddress } from "@ethersproject/address";
import type { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useUserContract from "../contracts/useUserContract";
import useCurrentToken from "../useCurrentToken";

const getTrustCount = (contract: Contract) => async (
  _: any,
  account: string,
  tokenAddress: string
) => {
  let count = 0;

  const addresses: string[] = await contract.getStakerAddresses(
    account,
    tokenAddress
  );

  await Promise.all(
    addresses.map(async (stakerAddress) => {
      try {
        const trustAmount: number = await contract.getVouchingAmount(
          stakerAddress,
          account,
          tokenAddress
        );
        const isMember: boolean = await contract.checkIsMember(stakerAddress);

        if (trustAmount > 0 && isMember) count++;
      } catch (error) {
        console.log(error);
      }
    })
  );

  return count;
};

export default function useTrustCountData() {
  const { account } = useWeb3React();
  const memberContract = useUserContract();
  const curToken = useCurrentToken();

  const shouldFetch =
    !!memberContract && typeof account === "string" && isAddress(curToken);

  return useSWR(
    shouldFetch ? ["TrustCount", account, curToken] : null,
    getTrustCount(memberContract)
  );
}
