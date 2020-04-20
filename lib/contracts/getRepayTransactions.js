import dayjs from "dayjs";

import { getContract } from "@util/getContract";
import ABI from "@constants/abis/lendingMarket.json";
import { getMarketAddress } from "@lib/contracts/getMarketAddress";

const WAD = 1e18;

/**
 * @name getRepayTransactions
 *
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getRepayTransactions(tokenAddress, signer, chainId) {
  if (!String(tokenAddress)) {
    throw new Error("`tokenAddress` is a required parameter.");
  }

  try {
    const marketAddress = await getMarketAddress(tokenAddress, signer, chainId);

    /**
     * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
     */
    const contract = await getContract(marketAddress, ABI, signer);

    const account = await signer.getAddress();
    const filter = contract.filters.LogRepay(account);
    filter.fromBlock = 0;

    let transacitons = [];
    const logs = await signer.provider.getLogs(filter);
    const promises = logs.map(async (log) => {
      const block = await signer.provider.getBlock(log.blockNumber);
      let obj = {
        blockNumber: log.blockNumber,
        date: dayjs(block.timestamp * 1000).format("YYYY-MM-DD HH:mm"),
        type: "repay",
      };

      const data = contract.interface.parseLog(log);
      obj["account"] = data.args[0];
      obj["amount"] = parseFloat(data.args[1] / WAD);
      transacitons.push(obj);
    });
    await Promise.all(promises);

    return transacitons;
  } catch (err) {
    throw err;
  }
}
