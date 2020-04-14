import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { AddressZero } from "@constants/";

/**
 * @name getContract
 *
 * @param {String} address The address of the deployed contract
 * @param {import("@ethersproject/contracts").ContractInterface} ABI The ABI itself
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's Signer
 */
export async function getContract(address, ABI, signer) {
  if (!isAddress(address) || address === AddressZero) {
    throw new Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, signer);
}
