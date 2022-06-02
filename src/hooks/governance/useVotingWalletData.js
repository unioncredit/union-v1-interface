import { formatUnits } from "@ethersproject/units";
import useUnionToken from "hooks/contracts/useUnionToken";
import useSWR from "swr";

async function fetchVotingWalletData(_, unionToken, address) {
  const balanceOf = await unionToken.balanceOf(address);
  const currentVotes = await unionToken.getCurrentVotes(address);
  const delegates = await unionToken.delegates(address);

  return {
    balanceOf: parseFloat(formatUnits(balanceOf, 18)),
    currentVotes: parseFloat(formatUnits(currentVotes, 18)),
    delegates: delegates,
  };
}

export default function useVotingWalletData(address) {
  const unionToken = useUnionToken();

  const shouldFetch = unionToken && address;

  return useSWR(
    shouldFetch ? ["useVotingWalletData", unionToken, address] : null,
    fetchVotingWalletData
  );
}
