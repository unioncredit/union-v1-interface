/**
 * @name roundUp
 * @param {String|Number} number
 */
export const roundUp = (number) =>
  Number(Math.ceil(Number(number) * 100) / 100);
