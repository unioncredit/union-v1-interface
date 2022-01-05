import useSWR from "swr";

// https://twitter.com/frolic <- what a legend
const apiUrl = "https://api.ensideas.com/ens/resolve/";

async function fetchENS(_, address) {
  const resp = await fetch(apiUrl + address);
  const json = await resp.json();

  return json;
}

export default function useENS(address) {
  const resp = useSWR(address ? ["ENS", address] : null, fetchENS, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return resp.data || {};
}
