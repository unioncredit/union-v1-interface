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

// https://stackoverflow.com/questions/1685680/how-to-avoid-scientific-notation-for-large-numbers-in-javascript
export function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
}
