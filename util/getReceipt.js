import { addToast, FLAVORS } from "../hooks/useToast";

/**
 * @name getReceipt
 *
 * @param {String} hash
 * @param {import("@ethersproject/providers").Provider} library
 */
export default async function getReceipt(hash, library) {
  const { hide: hidePending } = addToast(FLAVORS.TX_PENDING(hash));

  const receipt = await library.waitForTransaction(hash);

  hidePending();

  if (receipt.status !== 1) {
    throw new Error(receipt.transactionHash);
  }

  addToast(FLAVORS.TX_SUCCESS(hash));

  return receipt;
}
