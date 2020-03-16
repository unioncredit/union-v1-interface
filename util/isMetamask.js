/**
 * @name isMetaMask
 * @description Determines whether MetaMask is available
 */
export default isMetaMask =
  typeof window !== "undefined" &&
  !!(window.ethereum && window.ethereum.isMetaMask)
    ? true
    : false;
