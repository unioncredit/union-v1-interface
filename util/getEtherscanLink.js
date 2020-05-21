const ETHERSCAN_PREFIXES = {
  1: "",
  3: "ropsten.",
  4: "rinkeby.",
  5: "goerli.",
  42: "kovan.",
};

/**
 * @name getEtherscanLink
 *
 * @param {(1|3|4|5|42)} networkId The chain id of the network to link to
 * @param {String} data The hash of the transaction or address
 * @param {("TRANSACTION"|"ADDRESS")} type
 *
 * @returns {String}
 */
export default function getEtherscanLink(networkId, data, type) {
  const prefix = `https://${
    ETHERSCAN_PREFIXES[networkId] || ETHERSCAN_PREFIXES[1]
  }etherscan.io`;

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
