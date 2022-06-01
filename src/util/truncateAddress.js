import { isAddress } from "@ethersproject/address";

/**
 * @name truncateAddress
 *
 * @param {String} address The address to truncate
 * @param {Number} digits The length to shorten
 *
 * @returns {String}
 */
export default function truncateAddress(address, digits = 4) {
  if (!isAddress(address))
    throw new Error(`Invalid 'address' parameter '${address}'.`);

  return `${address.slice(0, digits + 2)}...${address.slice(-digits)}`;
}
