import { SUPPORTED_WALLETS } from "lib/connectors";

export const isMetaMask =
  typeof window !== "undefined" &&
  !!(window.ethereum && window.ethereum.isMetaMask)
    ? true
    : false;

export const getWalletIcon = (name) =>
  name === "Injected" && isMetaMask
    ? SUPPORTED_WALLETS.MetaMask.icon
    : SUPPORTED_WALLETS[name].icon;

export const getWalletName = (name) =>
  name === "Injected" && isMetaMask
    ? SUPPORTED_WALLETS.MetaMask.name
    : SUPPORTED_WALLETS[name].name;

export const getWalletDescription = (name) =>
  name === "Injected" && isMetaMask
    ? SUPPORTED_WALLETS.MetaMask.description
    : SUPPORTED_WALLETS[name].description;
