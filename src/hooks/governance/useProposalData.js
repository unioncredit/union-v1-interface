import useProposals from "./useProposals";

export default function useProposalData(hash) {
  const { data } = useProposals();
  return data?.find((p) => p.hash === hash);
}
