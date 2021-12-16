import useSWR from "swr";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import useUserContract from "hooks/contracts/useUserContract";
import useReadProvider from "hooks/useReadProvider";

const getMemberFee = (userManager: Contract) => async (_: any) => {
  const fee = await userManager.newMemberFee();
  return fee;
};

export default function useMemberFee() {
  const readProvider = useReadProvider();
  const userManager = useUserContract(readProvider);

  const shouldFetch = !!userManager;

  return useSWR(shouldFetch ? "MemberFee" : null, getMemberFee(userManager), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}
