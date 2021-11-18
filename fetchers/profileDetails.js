import { JsonRpcProvider } from "@ethersproject/providers";
import ENS, { getEnsAddress } from "@ensdomains/ensjs";
import truncateAddress from "../util/truncateAddress";
import fetchMemberApplication from "./profileMemberSince";

const ethereumRpcUrl = `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
const ensProvider = new JsonRpcProvider(ethereumRpcUrl);
const ens = new ENS({
  provider: ensProvider,
  ensAddress: getEnsAddress("1"),
});

async function getProfileDetails(address) {
  try {
    const ethereumRpc = new JsonRpcProvider(ethereumRpcUrl);

    const ensName = await ethereumRpc.lookupAddress(address);

    const image = await ens.name(ensName).getText("avatar");

    const memberSince = await fetchMemberApplication(address);

    return {
      image,
      address,
      name: ensName || truncateAddress(address),
      memberSince,
    };
  } catch (_) {
    return {
      address,
      name: truncateAddress(address),
      memberSince: false,
    };
  }
}

module.exports = getProfileDetails;
