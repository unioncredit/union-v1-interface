import { isAddress } from "@ethersproject/address";
import { InfuraProvider } from "@ethersproject/providers";

export default async function reverse(req, res) {
  const { address } = req.query;

  const provider = new InfuraProvider(
    "homestead",
    process.env.NEXT_PUBLIC_INFURA_KEY
  );

  try {
    if (!address || !isAddress(address))
      throw new Error("Parameter 'address' is malformed or missing");

    let name = await provider.lookupAddress(address);

    res.status(200).send(name);
  } catch (e) {
    res.status(400).send(e.message);
  }
}
