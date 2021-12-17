import { BigNumber } from "@ethersproject/bignumber";
import { Contract, EventFilter } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import useUserContract from "hooks/contracts/useUserContract";
import useUTokenContract from "hooks/contracts/useUTokenContract";
import useDAIDecimals from "hooks/useDAIDecimals";
import useSWR from "swr";
import { getLogs } from "lib/logs";
import { useWeb3React } from "@web3-react/core";
import useChainId from "hooks/useChainId";

declare type borrowerStakerPair = {
  borrower: string;
  staker: string;
};

const getDefaultedAmount =
  (uTokenContract: Contract, userContract: Contract) =>
  async (_: any, decimals: BigNumber, chainId: number, provider: any) => {
    const eventFilter: EventFilter = uTokenContract.filters.LogBorrow();
    const logList = await getLogs(provider, chainId, eventFilter);

    const borrowerList: Array<string> = logList.map((log) => {
      const event = uTokenContract.interface.parseLog(log);
      return event.args.account;
    });

    const uniqueBorrowerList: Array<string> = Array.from(new Set(borrowerList));

    const overdueBorrowerList: Array<string> = [];
    await Promise.all(
      uniqueBorrowerList.map(async (borrower) => {
        const isOverdue = await uTokenContract.checkIsOverdue(borrower);
        if (isOverdue) {
          overdueBorrowerList.push(borrower);
        }
      })
    );

    const overdueBSList: Array<borrowerStakerPair> = [];
    await Promise.all(
      overdueBorrowerList.map(async (borrower) => {
        const stakers = await userContract.getStakerAddresses(borrower);
        stakers.forEach((staker) => {
          overdueBSList.push({ borrower, staker });
        });
      })
    );

    const defaultedAmountList: Array<BigNumber> = await Promise.all(
      overdueBSList.map(async (bs) => {
        return userContract.getLockedStake(bs.staker, bs.borrower);
      })
    );

    const totalDefaulted = defaultedAmountList.reduce((sum, num) => {
      return sum.add(num);
    }, BigNumber.from(0));

    return formatUnits(totalDefaulted, decimals);
  };

export function useDefaultedAmount() {
  const { library } = useWeb3React();
  const uTokenContract: Contract = useUTokenContract();
  const userContract: Contract = useUserContract();
  const { data: decimals } = useDAIDecimals();
  const chainId = useChainId();

  const shouldFetch =
    !!uTokenContract && !!userContract && !!chainId && !!library;

  return useSWR(
    shouldFetch ? ["totalDefaultedAmount", decimals, chainId, library] : null,
    getDefaultedAmount(uTokenContract, userContract)
  );
}
