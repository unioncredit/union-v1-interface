import useSWR from "swr";
import { formatUnits } from "@ethersproject/units";

import useGovernance from "hooks/contracts/useGovernance";

async function fetchQuorum(_, gov) {
  const res = await gov.quorumVotes();
  return formatUnits(res, 18);
}

export default function useProposalQuorum() {
  const gov = useGovernance();

  const shouldFetch = !!gov;

  return useSWR(shouldFetch ? ["useProposalQuorum", gov] : null, fetchQuorum);
}
