import { useWeb3React } from "@web3-react/core";
import useMemberContract from "./useMemberContract";

const getTotalMemberCount = async (memberContract, library) => {
  const signer = library.getSigner();

  const addMemberFilter = memberContract.filters.LogAddMember();
  addMemberFilter.fromBlock = 0;
  const addMemberLogs = await signer.provider.getLogs(addMemberFilter);

  const applyMemberFilter = memberContract.filters.LogApplyMember();
  applyMemberFilter.fromBlock = 0;
  const applyMemberLogs = await signer.provider.getLogs(applyMemberFilter);

  return addMemberLogs.length + applyMemberLogs.length;
};

export default function useTotalMemberCount() {
  const { library } = useWeb3React();
  const memberContract = useMemberContract();

  return getTotalMemberCount(memberContract, library);
}
