/**
 * @name generateLink
 *
 * @param {String} address
 * @param {Number|String} amount
 */
export default function generateLink(address, amount) {
  if (!address) throw new Error("`account` is required");

  if (amount) {
    return `${window.location.origin}/contacts?vouchFor=${address}&trust=${amount}`;
  }
  return `${window.location.origin}/contacts?vouchFor=${address}`;
}
