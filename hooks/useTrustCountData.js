import { isAddress } from "@ethersproject/address";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useCurrentToken from "./useCurrentToken";
import useUserContract from "./useUserContract";

const getTrustCount = (contract) => async (_, account, tokenAddress) => {
  let count = 0;
  const addresses = await contract.getStakerAddresses(account, tokenAddress);
  const promises = addresses.map(async (stakerAddress) => {
    const isEffective = await contract.isEffectiveStaker(
      stakerAddress,
      account,
      tokenAddress
    );
    if (isEffective) count++;
  });
  await Promise.all(promises);
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
