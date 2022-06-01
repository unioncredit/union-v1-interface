import { formatUnits } from "@ethersproject/units";
import useUnionContract from "hooks/contracts/useUnionContract";
import useReadProvider from "hooks/useReadProvider";
import useSWR from "swr";

const getVotingWalletData = (governanceTokenContract) => async (_, address) => {
  const balanceOf = await governanceTokenContract.balanceOf(address);

  const currentVotes = await governanceTokenContract.getCurrentVotes(address);

  const delegates = await governanceTokenContract.delegates(address);

  return {
    balanceOf: parseFloat(formatUnits(balanceOf, 18)),
    currentVotes: parseFloat(formatUnits(currentVotes, 18)),
    delegates: delegates,
  };
};

export default function useVotingWalletData(address) {
  const readProvider = useReadProvider();
  const contract = useUnionContract(readProvider);

  const shouldFetch = typeof address === "string" && !!contract;

  return useSWR(
    shouldFetch ? ["VotingWalletData", address] : null,
    getVotingWalletData(contract)
  );
}
