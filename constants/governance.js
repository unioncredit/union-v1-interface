import governorAlpha from "./abis/governorAlpha.json";
import comp from "./abis/comp.json";
import { AddressZero } from "./variables";

export const GOV_ADDRESS = {
  1: AddressZero,
  4: AddressZero,
  42: "0xfDc7E087395c8ba7EfFc9f888eD52379dB235023",
};

export const GOV_ABI = governorAlpha;

export const GOV_TOKEN_ADDRESS = {
  1: AddressZero,
  4: AddressZero,
  42: "0x667242C6d755c302e753D31C16BC8d693b426127",
};

export const GOV_TOKEN_ABI = comp;
