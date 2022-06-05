import useSWR from "swr";

import useGovernance from "hooks/contracts/useGovernance";

function fetchQuorum(_, gov) {
  return gov.quorumVotes();
}

export default function useProposalQuorum() {
  const gov = useGovernance();

  const shouldFetch = !!gov;

  return useSWR(shouldFetch ? ["useProposalQuorum", gov] : null, fetchQuorum);
}
