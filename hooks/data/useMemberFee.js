import useSWR from "swr";
import parseRes from "util/parseRes";
import useUserContract from "../contracts/useUserContract";

const getMemberFee = (contract) => async () =>
  contract.newMemberFee().then((res) => parseRes(res));

export default function useMemberFee() {
  const contract = useUserContract();

  const shouldFetch = !!contract;

  return useSWR(shouldFetch ? ["MemberFee"] : null, getMemberFee(contract), {
    refreshInterval: 10 * 1000,
  });
}
