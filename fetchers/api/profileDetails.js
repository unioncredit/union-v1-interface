import { JsonRpcProvider } from "@ethersproject/providers";
import truncateAddress from "util/truncateAddress";
import ENS, { getEnsAddress } from "@ensdomains/ensjs";
import { RPC_URLS } from "lib/connectors";
import fetchMemberApplication from "./profileMemberSince";

const ensProvider = new JsonRpcProvider(RPC_URLS["1"]);
const ens = new ENS({
  provider: ensProvider,
  ensAddress: getEnsAddress("1"),
});

async function getProfileDetails(address) {
  const ethereumRpc = new JsonRpcProvider(
    `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
  );

  const ensName = await ethereumRpc.lookupAddress(address);

  const image = await ens.name(ensName).getText("avatar");

  const memberSince = await fetchMemberApplication(address);

  return {
    image,
    address,
    name: ensName || truncateAddress(address),
    memberSince,
  };
}

module.exports = getProfileDetails;
