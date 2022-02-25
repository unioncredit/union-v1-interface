import { networkAppUrls } from "lib/connectors";

/**
 * @name generateLink
 *
 * @param {String} address
 * @param {Number|String} amount
 */
export default function generateLink(address, chainId = 1) {
  if (!address) throw new Error("`account` is required");

  const baseUrl = networkAppUrls[chainId] || window.location.origin;

  return `${baseUrl}/contacts?address=${address}`;
}

const SHARE_MESSAGE = `Please vouch for me on Union!`;

export const generateTwitterLink = (shareLink) =>
  `https://twitter.com/intent/tweet?text=${SHARE_MESSAGE}&url=${encodeURIComponent(
    shareLink
  )}&via=unionprotocol`;

export const generateTelegramLink = (shareLink) =>
  `https://telegram.me/share/url?text=${SHARE_MESSAGE}&url=${encodeURIComponent(
    shareLink
  )}`;
