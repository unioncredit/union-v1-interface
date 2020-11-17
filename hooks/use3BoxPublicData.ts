import useSWR from "swr";

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

const fetcher = async (address: string): Promise<Profile> => {
  const res = await fetch("https://ipfs.3box.io/profile?address=" + address);

  if (res.ok) {
    return res.json();
  }

  const { message } = await res.json();

  throw new Error(message);
};

export default function use3BoxPublicData(address: string) {
  const shouldFetch = typeof address === "string";

  return useSWR(shouldFetch ? address : null, fetcher, {
    shouldRetryOnError: false,
    refreshWhenHidden: false,
    revalidateOnFocus: false,
  });
}
