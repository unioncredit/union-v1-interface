import useSWR from "swr";

const fetcher = async (address) => {
  const res = await fetch("https://ipfs.3box.io/profile?address=" + address);

  if (res.ok) {
    return res.json();
  }

  const { message } = await res.json();
  throw new Error(message);
};

export default function use3BoxPublicData(address) {
  const shouldFetch = typeof address === "string";

  return useSWR(shouldFetch ? address : null, fetcher);
}
