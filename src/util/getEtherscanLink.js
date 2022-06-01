const urls = {
  1: "https://etherscan.io",
  137: "https://polygonscan.com",
  42: "https://kovan.etherscan.io",
  42161: "https://arbiscan.io",
  421611: "https://arbiscan.io",
};

/**
 * @name getEtherscanLink
 *
 * @param {(1|3|4|5|42|137|80001)} networkId The chain id of the network to link to
 * @param {String} data The hash of the transaction or address
 * @param {("TRANSACTION"|"ADDRESS")} type
 *
 * @returns {String}
 */
export default function getEtherscanLink(networkId, data, type) {
  let prefix = urls[networkId] || urls[1];

  switch (type) {
    case "TRANSACTION": {
      return `${prefix}/tx/${data}`;
    }
    case "ADDRESS":
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}
