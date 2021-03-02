import { BigNumber } from "@ethersproject/bignumber";
import { Contract, EventFilter, Event } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import useUserContract from "hooks/contracts/useUserContract";
import useUTokenContract from "hooks/contracts/useUTokenContract";
import useDAIDecimals from "hooks/useDAIDecimals";
import { string } from "prop-types";
import useSWR from "swr";

declare type borrowerStakerPair = {
  borrower: string;
  staker: string;
};

const getDefaultedAmount = (
  uTokenContract: Contract,
  userContract: Contract
) => async (_: any, decimals: BigNumber) => {
  const eventFilter: EventFilter = uTokenContract.filters.LogBorrow();
  const eventList: Array<Event> = await uTokenContract.queryFilter(eventFilter);

  const borrowerList: Array<string> = eventList.map(
    (event) => event.args.account
  );
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
  const uTokenContract: Contract = useUTokenContract();
  const userContract: Contract = useUserContract();
  const { data: decimals } = useDAIDecimals();
  const shouldFetch = !!uTokenContract && !!userContract;

  return useSWR(
    shouldFetch ? ["totalDefaultedAmount", decimals] : null,
    getDefaultedAmount(uTokenContract, userContract)
  );
}
