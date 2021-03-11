import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useSWR from "swr";
import useCurrentToken from "../useCurrentToken";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";

dayjs.extend(relativeTime);

const getActivity = (marketRegistryContract) => async (
  _,
  account,
  library,
  tokenAddress
) => {
  const signer = library.getSigner();
  const res = await marketRegistryContract.tokens(tokenAddress);
  const userManagerAddress = res.userManager;
  const userManagerContract = new Contract(
    userManagerAddress,
    USER_MANAGER_ABI,
    signer
  );

  /**
   * UpdateTrust Logs
   */

  const updateTrustFilter = userManagerContract.filters.LogUpdateTrust();
  updateTrustFilter.fromBlock = 0;

  const updateTrustLogs = await signer.provider.getLogs(updateTrustFilter);

  const parseUpdateTrustLogs = await Promise.all(
    updateTrustLogs.map(async (log) => {
      const block = await signer.provider.getBlock(log.blockNumber);

      const logData = userManagerContract.interface.parseLog(log);

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
   * RegisterMember Logs
   */

  const registerMemberFilter = userManagerContract.filters.LogRegisterMember(
    account
  );
  registerMemberFilter.fromBlock = 0;

  const registerMemberLogs = await signer.provider.getLogs(
    registerMemberFilter
  );

  const parseRegisterMemberLogs = await Promise.all(
    registerMemberLogs.map(async (log) => {
      const block = await signer.provider.getBlock(log.blockNumber);

      return {
        ts: block.timestamp * 1000,
        date: dayjs(block.timestamp * 1000).fromNow(),
        hash: log.transactionHash,
        type: "RegisterMember",
      };
    })
  );

  /**
   * CancelVouch Logs
   */

  const cancelVouchFilter = userManagerContract.filters.LogCancelVouch();
  cancelVouchFilter.fromBlock = 0;

  const cancelVouchLogs = await signer.provider.getLogs(cancelVouchFilter);

  const parseCancelVouchLogs = await Promise.all(
    cancelVouchLogs.map(async (log) => {
      const block = await signer.provider.getBlock(log.blockNumber);

      const logData = userManagerContract.interface.parseLog(log);

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
    ...parseRegisterMemberLogs,
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
  const curToken = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();

  const shouldFetch =
    !!marketRegistryContract && typeof account === "string" && !!library;

  return useSWR(
    shouldFetch ? ["Activity", account, library, curToken] : null,
    getActivity(marketRegistryContract)
  );
}
