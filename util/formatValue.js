import { commify } from "@ethersproject/units";

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
    return commify(num.toFixed(digits).toString());
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

export function formatDetailed(number, unit = null, decimals = 4) {
  if (number === null || number === undefined) return "NaN";
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

  return commify(result) + (unit ? " " + unit : "");
}
