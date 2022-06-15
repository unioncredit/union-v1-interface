import { formatUnits } from "@ethersproject/units";

/**
 * @name format
 * @description Takes in a string or number value and either returns K-formatted or with commas
 *
 * @param {string|number} number
 * @param {number} decimals
 */
export default function format(num, digits) {
  num = Number(num);
  num = num <= 0 ? 0 : num;

  if (!num) return "0";
  const numStr = Number(num).toLocaleString("en", {
    useGrouping: false,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

  const parts = numStr.split(".");
  const lhs = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (digits > 0 && parts[1]) {
    return `${lhs}.${parts[1]}`;
  }
  return lhs;
}

export function formatScaled(num, digits, scale = 18) {
  return format(formatUnits(num, scale), digits);
}
