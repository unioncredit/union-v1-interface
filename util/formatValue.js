import { commify } from "@ethersproject/units";
import toK from "./toK";

/**
 * @name format
 * @description Takes in a string or number value and either returns K-formatted or with commas
 *
 * @param {string|number} number
 * @param {number} decimals
 */
export default function format(number, decimals = 2) {
  if (String(number).length > 8) return toK(number, true, 2);

  return commify(Number(number).toFixed(decimals));
}
