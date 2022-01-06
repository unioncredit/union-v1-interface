import useSWRImmutable from "swr/immutable";

// https://twitter.com/frolic <- what a legend
const apiUrl = "https://api.ensideas.com/ens/resolve/";

async function fetchENS(_, address) {
  const resp = await fetch(apiUrl + address);
  const json = await resp.json();

  return json;
}

export default function useENS(address) {
  address = address && address.toLowerCase && address.toLowerCase();
  const resp = useSWRImmutable(address ? ["ENS", address] : null, fetchENS, {
    dedupingInterval: 100000,
  });

  return resp.data || {};
}
