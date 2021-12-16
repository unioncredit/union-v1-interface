import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";
import useUserContract from "hooks/contracts/useUserContract";

const getMaxBorrow = (_, contract) => {
  return contract.maxStakeAmount();
};

export default function useMaxStakeAmount() {
  const readProvider = useReadProvider();
  const userManager = useUserContract(readProvider);

  const shouldFetch = !!userManager;

  return useSWR(shouldFetch ? ["MaxStake", userManager] : null, getMaxBorrow);
}
