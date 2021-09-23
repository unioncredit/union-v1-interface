import useReadProvider from "hooks/useReadProvider";
import useUserContract from "hooks/contracts/useUserContract";
import useLogs from "./useLogs";
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
    hash: log.transactionHash,
    type: "RegisterMember",
    blockNumber: log.blockNumber,
  };
};

const parseActivityLog =
  (provider, userManagerContract, filters) => async (logs) => {
    const [updateTrustFilter, cancelVouchFilter, registerMemberFilter] =
      filters;

    const data = await Promise.all(
      logs
        .map((log) => {
          if (log.topics[0] === updateTrustFilter.topics[0]) {
            return parseUpdateTrust(provider, userManagerContract)(log);
          } else if (log.topics[0] === cancelVouchFilter.topics[0]) {
            return parseCancelVouch(provider, userManagerContract)(log);
          } else if (log.topics[0] === registerMemberFilter.topics[0]) {
            return parseRegisterMember(provider, userManagerContract)(log);
          }
          return false;
        })
        .filter(Boolean)
    );

    return data;
  };

export default function useAccountHistory(address) {
  const readProvider = useReadProvider();
  const userManagerContract = useUserContract();

  const updateTrustFilter =
    userManagerContract?.filters.LogUpdateTrust(address);
  const cancelVouchFilter =
    userManagerContract?.filters.LogCancelVouch(address);
  const registerMemberFilter =
    userManagerContract?.filters.LogRegisterMember(address);

  const filters = [updateTrustFilter, cancelVouchFilter, registerMemberFilter];

  const parser = parseActivityLog(readProvider, userManagerContract, filters);

  const data = address && userManagerContract && useLogs(filters, parser);

  return data || {};
}
