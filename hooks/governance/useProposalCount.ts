import type { Contract } from "@ethersproject/contracts";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useSWR from "swr";

const getProposalCount = (contract: Contract) => async () => {
  console.log("getProposalCount start", new Date().getTime() / 1000);
  const res = await contract.proposalCount();
  console.log("getProposalCount end", new Date().getTime() / 1000);
  console.log("proposalCount", res);
  return parseInt(res);
};

export default function useProposalCount() {
  const contract = useGovernanceContract();

  const shouldFetch = Boolean(contract);

  return useSWR(
    shouldFetch ? ["ProposalCount"] : null,
    getProposalCount(contract),
    {
      shouldRetryOnError: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
