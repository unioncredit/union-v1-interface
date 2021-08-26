import type { BigNumber } from "@ethersproject/bignumber";
import type { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import useUnionContract from "hooks/contracts/useUnionContract";
import useSWR from "swr";

const getVotingWalletData =
  (governanceTokenContract: Contract) => async (_: any, address: string) => {
    const balanceOf: BigNumber = await governanceTokenContract.balanceOf(
      address
    );

    const currentVotes: BigNumber =
      await governanceTokenContract.getCurrentVotes(address);

    const delegates: string = await governanceTokenContract.delegates(address);

    return {
      balanceOf: parseFloat(formatUnits(balanceOf, 18)),
      currentVotes: parseFloat(formatUnits(currentVotes, 18)),
      delegates: delegates,
    };
  };

export default function useVotingWalletData(address: string) {
  const contract = useUnionContract();

  const shouldFetch = typeof address === "string" && !!contract;

  return useSWR(
    shouldFetch ? ["VotingWalletData", address] : null,
    getVotingWalletData(contract),
    {
      refreshInterval: 10 * 1000,
      dedupingInterval: 10 * 1000,
    }
  );
}
