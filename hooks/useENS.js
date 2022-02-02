import useSWRImmutable from "swr/immutable";
import { fetchENS as fetchEnsData } from "fetchers/fetchEns";

function fetchENS(_, address) {
  return fetchEnsData(address);
}

export default function useENS(address) {
  address = address && address.toLowerCase && address.toLowerCase();
  const resp = useSWRImmutable(address ? ["ENS", address] : null, fetchENS, {
    dedupingInterval: 100000,
  });

  return resp.data || {};
}
