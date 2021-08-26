import { BigNumberish } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { TransactionResponse } from "@ethersproject/providers";

export const makeTxWithGasEstimate = async (
  contract: Contract,
  func: string,
  params: Array<string | number | BigNumberish>,
  fallbackLimit?: number,
  avoidFallback?: boolean
): Promise<TransactionResponse> => {
  let gasLimit: BigNumberish
  try {
    const estimateGas = await contract.estimateGas[func](...params);
    gasLimit = (parseFloat(estimateGas.toString()) * 1.1).toFixed(0);
  } catch (err) {
    if (avoidFallback) {
      throw err;
    }
    gasLimit = fallbackLimit || 800000;
  }

  return contract[func](...params, { gasLimit });
}
