import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";

/**
 * @name getContract
 *
 * @param {String} address The address of the deployed contract
 * @param {import("@ethersproject/contracts").ContractInterface} ABI The ABI itself
 * @param {import("@ethersproject/abstract-signer").Signer} provider The Web3 Provider
 */
export async function getContract(address, ABI, provider) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, provider);
}
