import type { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import useSWR from "swr";
import useUserContract from "../contracts/useUserContract";

const getMemberFee = (contract: Contract) => async () => {
  const res = await contract.newMemberFee();

  return Number(formatUnits(res, 18));
};

export default function useMemberFee() {
  const contract = useUserContract();

  const shouldFetch = !!contract;

  return useSWR(shouldFetch ? ["MemberFee"] : null, getMemberFee(contract), {
    refreshInterval: 10 * 1000,
  });
}
