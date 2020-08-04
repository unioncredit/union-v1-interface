import { isAddress } from "@ethersproject/address";

export default async function validateAddress(address) {
  if (!isAddress(address)) return "Please input a valid Ethereum address";

  try {
    const res = await fetch(`https://api.cryptoscamdb.org/v1/check/${address}`);
    const body = await res.json();

    if (body.success === true && body.result.status === "blocked") {
      return "This address is associated with a known scam";
    }

    return true;
  } catch (err) {
    console.error(err.message);
    return true;
  }
}
