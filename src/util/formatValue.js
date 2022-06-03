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

  if (num && num < 10000) {
    if (!num) return "0." + Array(digits).fill("0").join();
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

  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });

  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

export function formatScaled(num, digits, scale = 18) {
  return format(formatUnits(num, scale), digits);
}
