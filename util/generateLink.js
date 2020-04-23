/**
 * @name generateLink
 *
 * @param {String} address
 * @param {Number|String} amount
 */
export default function generateLink(address, amount) {
  if (!address) throw new Error("`account` is required");

  if (amount)
    return `${window.location.origin}/stake?address=${address}&trust=${amount}`;

  return `${window.location.origin}/stake?address=${address}`;
}
