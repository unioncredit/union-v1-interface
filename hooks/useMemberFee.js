import useSWR from "swr";
import parseRes from "util/parseRes";
import useMemberContract from "./contracts/useMemberContract";

const getMemberFee = (contract) => async () =>
  contract.newMemberFee().then((res) => parseRes(res));

export default function useMemberFee() {
  const contract = useMemberContract();

  const shouldFetch = !!contract;

  return useSWR(shouldFetch ? ["MemberFee"] : null, getMemberFee(contract), {
    dedupingInterval: 15 * 1000,
    refreshInterval: 30 * 1000,
  });
}
