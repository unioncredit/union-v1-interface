import useSWR from "swr";
import useBox from "./useBox";

const getSpace = (box) => async (key) => await box.openSpace(key);

export default function useSpace() {
  const box = useBox();

  const shouldFetch = !!box;

  const { data = null } = useSWR(shouldFetch ? "union" : null, getSpace(box), {
    dedupingInterval: 15 * 1000,
    refreshInterval: 30 * 1000,
    refreshWhenHidden: false,
    revalidateOnFocus: false,
    refreshWhenOffline: false,
    revalidateOnReconnect: false,
  });

  return data;
}
