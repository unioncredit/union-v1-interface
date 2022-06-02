import useSWR from "swr";
import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";

import { roundUp } from "util/numbers";
import { formatDueDate } from "util/formatDueDate";
import useToken from "hooks/useToken";
import useMarketRegistry from "hooks/contracts/useMarketRegistry";
import U_TOKEN_ABI from "constants/abis/uToken.json";
import { BLOCKS_PER_YEAR, BLOCK_SPEED } from "constants/variables";

const getPaymentDue = async (account, chainId, contract, library) => {
  const isOverdue = await contract.checkIsOverdue(account);

  if (isOverdue) {
    return "Overdue";
  }

  const lastRepayRes = await contract.getLastRepay(account);
  const lastRepay = parseInt(lastRepayRes.toString());

  const overdueBlocksRes = await contract.overdueBlocks();
  const overdueBlocks = parseInt(overdueBlocksRes.toString());

  const curBlock = await library.getBlockNumber();
  const block = await library.getBlock(curBlock);
  const resp = await library.provider.send("eth_getTransactionReceipt", [
    block.transactions[0],
  ]);

  // Supports ARBITRUM which returns L1 blockNumber as `l1BlockNumber`
  const blockNumber = resp.result.l1BlockNumber || resp.result.blockNumber;

  if (lastRepay === 0) {
    return "No Payment Due";
  }

  const seconds =
    (lastRepay + overdueBlocks - blockNumber) * BLOCK_SPEED[chainId];

  return formatDueDate(seconds);
};

const getCreditLimit =
  (contract) => async (_, account, tokenAddress, chainId, library) => {
    const res = await contract.tokens(tokenAddress);
    const uTokenAddress = res.uToken;

    const uTokenContract = new Contract(
      uTokenAddress,
      U_TOKEN_ABI,
      library.getSigner()
    );

    const apr = await uTokenContract.borrowRatePerBlock();

    const borrowed = await uTokenContract.getBorrowed(account);

    const fee = await uTokenContract.originationFee();

    const interest = await uTokenContract.calculatingInterest(account);

    const overdueBlocks = await uTokenContract.overdueBlocks();

    const isOverdue = await uTokenContract.checkIsOverdue(account);

    const paymentDueDate = await getPaymentDue(
      account,
      chainId,
      uTokenContract,
      library
    );

    const paymentPeriod = formatDueDate(
      overdueBlocks.mul(BLOCK_SPEED[chainId]).toNumber()
    );

    return {
      apr: Number(formatUnits(apr, 18)) * BLOCKS_PER_YEAR[chainId],
      borrowedRounded: roundUp(
        Number(formatUnits(borrowed, 18)) + Number(formatUnits(interest, 18))
      ),
      borrowedRaw:
        Number(formatUnits(borrowed, 18)) + Number(formatUnits(interest, 18)),
      fee: Number(formatUnits(fee, 18)),
      interest: Number(formatUnits(interest, 18)),
      paymentDueDate,
      paymentPeriod,
      isOverdue,
    };
  };

export default function useBorrowData(address) {
  const { account: connectedAccount, library, chainId } = useWeb3React();
  const curToken = useToken("DAI");

  const account = address || connectedAccount;

  const marketRegistryContract = useMarketRegistry();

  const shouldFetch =
    !!marketRegistryContract &&
    typeof account === "string" &&
    typeof chainId === "number" &&
    isAddress(curToken) &&
    !!library;

  return useSWR(
    shouldFetch ? ["CreditLimit", account, curToken, chainId, library] : null,
    getCreditLimit(marketRegistryContract)
  );
}
