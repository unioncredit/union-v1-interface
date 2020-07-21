import useSWR from "swr";
import parseRes from "util/parseRes";
import useMemberContract from "./useMemberContract";

const getMemberFee = (contract) => async () =>
  contract.newMemberFee().then((res) => parseRes(res));

export default function useMemberFee() {
  const contract = useMemberContract();

  const shouldFetch = !!contract;

  return useSWR(shouldFetch ? ["MemberFee"] : null, getMemberFee(contract), {
    refreshInterval: 10 * 1000,
  });
}
