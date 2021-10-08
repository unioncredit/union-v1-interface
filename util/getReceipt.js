import { addToast, FLAVORS } from "../hooks/useToast";

/**
 * @name getReceipt
 *
 * @param {String} hash
 * @param {import("@ethersproject/providers").Provider} library
 */
export default async function getReceipt(hash, library, messages = {}) {
  const { hide: hidePending } = addToast(
    FLAVORS.TX_PENDING(hash, messages.pending)
  );

  const receipt = await library.waitForTransaction(hash);

  hidePending();

  if (receipt.status !== 1) {
    throw new Error(receipt.transactionHash);
  }

  addToast(FLAVORS.TX_SUCCESS(hash, messages.success));

  return receipt;
}
