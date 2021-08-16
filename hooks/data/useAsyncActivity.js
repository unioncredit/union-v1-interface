import { useWeb3React } from "@web3-react/core";
import useReadProvider from "hooks/useReadProvider";
import useUserContract from "hooks/contracts/useUserContract";
import useAsyncLogs from "./useAsyncLogs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { formatUnits } from "@ethersproject/units";

dayjs.extend(relativeTime);

const parseUpdateTrust = (provider, userManagerContract) => async (log) => {
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
    blockNumber: log.blockNumber,
  };
};

const parseCancelVouch = (provider, userManagerContract) => async (log) => {
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
    blockNumber: log.blockNumber,
  };
};

const parseRegisterMember = (provider) => async (log) => {
  const block = await provider.getBlock(log.blockNumber);

  return {
    ts: block.timestamp * 1000,
    date: dayjs(block.timestamp * 1000).fromNow(),
    hash: log.transactionHash,
    type: "RegisterMember",
    blockNumber: log.blockNumber,
  };
};

const logsFilter = (account) => (log) => {
  if (log.type === "UpdateTrust") {
    return log.staker === account || log.borrower === account;
  } else if (log.type === "CancelVouch") {
    return log.borrower === account;
  }
  return Boolean(log);
};

const parseActivityLog =
  (provider, userManagerContract, filters, account) => async (logs) => {
    const [updateTrustFilter, cancelVouchFilter, registerMemberFilter] =
      filters;

    const data = await Promise.all(
      logs.map((log) => {
        if (log.topics[0] === updateTrustFilter.topics[0]) {
          return parseUpdateTrust(provider, userManagerContract)(log);
        } else if (log.topics[0] === cancelVouchFilter.topics[0]) {
          return parseCancelVouch(provider, userManagerContract)(log);
        } else if (log.topics[0] === registerMemberFilter.topics[0]) {
          return parseRegisterMember(provider, userManagerContract)(log);
        }
        return false;
      })
    );

    return data.filter(logsFilter(account));
  };

export default function useAsyncActivity() {
  const { account } = useWeb3React();
  const readProvider = useReadProvider();
  const userManagerContract = useUserContract();

  const updateTrustFilter = userManagerContract.filters.LogUpdateTrust();
  const cancelVouchFilter = userManagerContract.filters.LogCancelVouch();
  const registerMemberFilter =
    userManagerContract.filters.LogRegisterMember(account);

  const filters = [updateTrustFilter, cancelVouchFilter, registerMemberFilter];

  const parser = parseActivityLog(
    readProvider,
    userManagerContract,
    filters,
    account
  );

  return account && userManagerContract && useAsyncLogs(filters, parser);
}
