import { Web3Provider } from "@ethersproject/providers";

/**
 * @name getLibrary
 *
 * @param {import("@ethersproject/providers").AsyncSendable} provider
 */
export default function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}
