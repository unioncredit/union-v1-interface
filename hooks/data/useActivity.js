import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useSWR from "swr";
import useCurrentToken from "../useCurrentToken";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";
import useReadProvider from "hooks/useReadProvider";
import { getLogs } from "lib/logs";

dayjs.extend(relativeTime);

const getActivity = (marketRegistryContract) => async (
  _,
  account,
  provider,
  chainId,
  tokenAddress
) => {
  const res = await marketRegistryContract.tokens(tokenAddress);
  const userManagerAddress = res.userManager;
  const userManagerContract = new Contract(
    userManagerAddress,
    USER_MANAGER_ABI,
    provider
  );

  /**
   * UpdateTrust Logs
   */

  const updateTrustFilter = userManagerContract.filters.LogUpdateTrust();
  const updateTrustLogs = await getLogs(provider, chainId, updateTrustFilter);
  const parseUpdateTrustLogs = await Promise.all(
    updateTrustLogs.map(async (log) => {
      const block = await provider.getBlock(log.blockNumber);
      const logData = userManagerContract.interface.parseLog(log);
      const { borrower, staker, trustAmount } = logData.args;
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
    (log) => log.staker === account || log.borrower === account
  );

  /**
   * RegisterMember Logs
   */

  const registerMemberFilter = userManagerContract.filters.LogRegisterMember(
    account
  );

  const registerMemberLogs = await getLogs(
    provider,
    chainId,
    registerMemberFilter
  );

  const parseRegisterMemberLogs = await Promise.all(
    registerMemberLogs.map(async (log) => {
      const block = await provider.getBlock(log.blockNumber);

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

  const cancelVouchLogs = await getLogs(provider, chainId, cancelVouchFilter);

  const parseCancelVouchLogs = await Promise.all(
    cancelVouchLogs.map(async (log) => {
      const block = await provider.getBlock(log.blockNumber);

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
  const { account, chainId } = useWeb3React();
  const readProvider = useReadProvider();
  const curToken = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();

  const shouldFetch =
    !!marketRegistryContract &&
    typeof account === "string" &&
    !!readProvider &&
    !!chainId;

  return useSWR(
    shouldFetch ? ["Activity", account, readProvider, chainId, curToken] : null,
    getActivity(marketRegistryContract)
  );
}
