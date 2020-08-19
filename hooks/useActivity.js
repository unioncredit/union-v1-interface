import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useMemberContract from "hooks/useMemberContract";
import useSWR from "swr";

dayjs.extend(relativeTime);

const getActivity = (contract) => async (_, account, library) => {
  const signer = library.getSigner();

  const updateTrustFilter = contract.filters.LogUpdateTrust();
  updateTrustFilter.fromBlock = 0;

  const updateTrustLogs = await signer.provider.getLogs(updateTrustFilter);

  const parseUpdateTrustLogs = await Promise.all(
    updateTrustLogs.map(async (log) => {
      const block = await signer.provider.getBlock(log.blockNumber);

      const logData = contract.interface.parseLog(log);

      const [borrower, staker, , trustAmount] = logData.args;

      return {
        borrower,
        date: dayjs(block.timestamp * 1000).fromNow(),
        hash: log.transactionHash,
        staker,
        trustAmount: formatUnits(trustAmount, 18),
        type: "UpdateTrust",
      };
    })
  );

  const personalUpdateTrustLogs = parseUpdateTrustLogs.filter(
    (log) => log.staker === account
  );

  const applyMemberFilter = contract.filters.LogApplyMember(account);
  applyMemberFilter.fromBlock = 0;

  const applyMemberLogs = await signer.provider.getLogs(applyMemberFilter);

  const parseApplyMemberLogs = await Promise.all(
    applyMemberLogs.map(async (log) => {
      const block = await signer.provider.getBlock(log.blockNumber);

      return {
        date: dayjs(block.timestamp * 1000).fromNow(),
        hash: log.transactionHash,
        type: "ApplyMember",
      };
    })
  );

  return [...personalUpdateTrustLogs, ...parseApplyMemberLogs];
};

export default function useActivity() {
  const { account, library } = useWeb3React();
  const memberManagerContract = useMemberContract();

  const shouldFetch =
    !!memberManagerContract && typeof account === "string" && !!library;

  return useSWR(
    shouldFetch ? ["Activity", account, library] : null,
    getActivity(memberManagerContract)
  );
}
