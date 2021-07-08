import useSWR from "swr";
import Ceramic from "@ceramicnetwork/http-client";
import { IDX } from "@ceramicstudio/idx";
import useChainId from "hooks/useChainId";

const ceramic = new Ceramic("https://gateway-clay.ceramic.network");
const idx = new IDX({ ceramic });

export interface IPFSImage {
  "@type": "ImageObject";
  contentUrl: {
    "/": string;
  };
}

interface Profile {
  collectiblesFavorites: [{ address: string; token_id: string }];
  proof_did: string;
  image: [IPFSImage];
  memberSince: string;
  website: string;
  location: string;
  name: string;
  proof_twitter: string;
}

const fetcher = async (address: string, chainId: number): Promise<Profile> => {
  try {
    return idx.get(
      "basicProfile",
      address.toLowerCase() + "@eip155:" + chainId
    );
  } catch (error) {
    console.error(error);
  }
};

export default function use3BoxPublicData(address: string) {
  const chainId = useChainId();
  const shouldFetch = typeof address === "string";

  return useSWR(shouldFetch ? [address, chainId] : null, fetcher, {
    shouldRetryOnError: false,
    refreshWhenHidden: false,
    revalidateOnFocus: false,
  });
}
