/**
 * @name roundUp
 * @param {String|Number} number
 */
export const roundUp = (number) =>
  Number(Math.ceil(Number(number) * 100) / 100);

/**
 * @name roundDown
 * @param {String|Number} number
 */
export const roundDown = (number) => Number(Math.floor(number * 100) / 100);

/**
 * @name toPercent
 * @param {String|Number} number
 * @param {Number} digits
 */
export const toPercent = (number, digits = 0) =>
  Number(number).toLocaleString(undefined, {
    style: "percent",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
