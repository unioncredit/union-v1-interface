import useUTokenContract from "hooks/contracts/useUTokenContract";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { BLOCKS_PER_YEAR } from "constants/variables";
import useSWR from "swr";
import useChainId from "hooks/useChainId";
import useReadProvider from "hooks/useReadProvider";

const getInterestRate = (uTokenContract) => async (_, chainId) => {
  const borrowRatePerBlock = await uTokenContract.borrowRatePerBlock();
  const decimals = BigNumber.from(18);
  return formatUnits(
    borrowRatePerBlock.mul(BLOCKS_PER_YEAR[chainId]),
    decimals
  );
};

export default function useInterestRate() {
  const readProvider = useReadProvider();
  const uTokenContract = useUTokenContract(readProvider);
  const chainId = useChainId();
  const shouldFetch = !!uTokenContract && !!chainId;

  return useSWR(
    shouldFetch ? ["interestRate", chainId] : null,
    getInterestRate(uTokenContract)
  );
}
