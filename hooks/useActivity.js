import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useUserContract from "hooks/useUserContract";
import useSWR from "swr";

dayjs.extend(relativeTime);

const getActivity = (contract) => async (_, account, library) => {
  const signer = library.getSigner();

  /**
   * UpdateTrust Logs
   */

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
        ts: block.timestamp * 1000,
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

  /**
   * ApplyMember Logs
   */

  const applyMemberFilter = contract.filters.LogApplyMember(account);
  applyMemberFilter.fromBlock = 0;

  const applyMemberLogs = await signer.provider.getLogs(applyMemberFilter);

  const parseApplyMemberLogs = await Promise.all(
    applyMemberLogs.map(async (log) => {
      const block = await signer.provider.getBlock(log.blockNumber);

      return {
        ts: block.timestamp * 1000,
        date: dayjs(block.timestamp * 1000).fromNow(),
        hash: log.transactionHash,
        type: "ApplyMember",
      };
    })
  );

  /**
   * CancelVouch Logs
   */

  const cancelVouchFilter = contract.filters.LogCancelVouch();
  cancelVouchFilter.fromBlock = 0;

  const cancelVouchLogs = await signer.provider.getLogs(cancelVouchFilter);

  const parseCancelVouchLogs = await Promise.all(
    cancelVouchLogs.map(async (log) => {
      const block = await signer.provider.getBlock(log.blockNumber);

      const logData = contract.interface.parseLog(log);

      const [account, borrower] = logData.args;

      return {
        ts: block.timestamp * 1000,
        date: dayjs(block.timestamp * 1000).fromNow(),
        hash: log.transactionHash,
        type: "CancelVouch",
        account,
        borrower,
      };
    })
  );

  const personalCancelVouchLogs = parseCancelVouchLogs.filter(
    (log) => log.borrower === account
  );

  /**
   * Compiled Logs
   */
  const logs = [
    ...personalUpdateTrustLogs,
    ...parseApplyMemberLogs,
    ...personalCancelVouchLogs,
  ];

  /**
   * Sort logs by timestamp
   */
  const sortedLogs = logs.sort((a, b) => b.ts - a.ts);

  return sortedLogs;
};

export default function useActivity() {
  const { account, library } = useWeb3React();
  const memberManagerContract = useUserContract();

  const shouldFetch =
    !!memberManagerContract && typeof account === "string" && !!library;

  return useSWR(
    shouldFetch ? ["Activity", account, library] : null,
    getActivity(memberManagerContract)
  );
}
