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

export function formatDetailed(number = 0, decimals = 4) {
  const fullNumber = Number(number);
  const fixedNumber = Number(fullNumber.toFixed(decimals));
  const integerPart = Number(fullNumber.toFixed(0));
  const fixedDecimalPart = fixedNumber - integerPart;
  const fullDecimalPart = fullNumber - integerPart;

  let result = fixedNumber;
  // if the decimal part is being rounded to zero then set lowest decimal as 1
  if (fixedDecimalPart == 0 && fullDecimalPart > 0) {
    result += Math.pow(10, -1 * decimals);
  }

  return commify(result);
}
