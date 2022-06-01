import { isAddress } from "@ethersproject/address";
import errorMessages from "util/errorMessages";

export default function validateAddress(address) {
  if (!isAddress(address)) return errorMessages.validAddress;

  // TODO: for whatever reason this is not working
  // try {
  //   const res = await fetch(`https://api.cryptoscamdb.org/v1/check/${address}`);
  //   const body = await res.json();

  //   if (body.success === true && body.result.status === "blocked") {
  //     return errorMessages.knownScam;
  //   }

  //   return true;
  // } catch (err) {
  //   console.error(err.message);
  //   return true;
  // }
  return true;
}
