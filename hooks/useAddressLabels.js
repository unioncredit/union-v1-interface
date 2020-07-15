import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";

const getBox = async (_, account, library) => {
  let box;

  const Box = (await import("3box")).default;

  box = await Box.openBox(account, library);

  await box.syncDone;

  return box;
};

export function useBox() {
  const { account, library } = useWeb3React();

  const shouldFetch = typeof account === "string" && !!library;

  const { data = null } = useSWR(
    shouldFetch ? ["Box", account, library] : null,
    getBox,
    {
      dedupingInterval: 15 * 1000,
      refreshInterval: 30 * 1000,
      refreshWhenHidden: false,
      revalidateOnFocus: false,
      refreshWhenOffline: false,
      revalidateOnReconnect: false,
    }
  );

  return data;
}

const getSpace = (box) => async (key) => await box.openSpace(key);

export function useSpace() {
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

let space = null;

export async function setSpacePrivate(key, value) {
  if (!space) throw new Error("Space is not open yet");
  if (typeof value !== "string") value = JSON.stringify(value);

  await space.private.set(key, value);
}

export async function getSpacePrivate(key) {
  if (!space) throw new Error("Space is not open yet");

  let result = await space.private.get(key);
  try {
    result = JSON.parse(result);
  } catch (error) {
    // ignore error
  }

  return result;
}

export async function removeSpacePrivate(key) {
  if (!space) throw new Error("Space is not open yet");

  await space.private.remove(key);
}

const fetcher = async (_, account, library) => {
  await openBox(account, library);
  await openSpace();

  return getSpacePrivate("labels");
};

export default function useAddressLabels() {
  const { account, library } = useWeb3React();

  const { data, mutate, revalidate } = useSWR(
    ["Labels", account, library],
    fetcher
  );

  /**
   * @name setLabel
   * @param {String} address
   * @param {String} label
   */
  const setLabel = async (address, label) => {
    const key = address.toLowerCase();

    await setSpacePrivate("labels", {
      ...data,
      [key]: label,
    });

    await mutate({
      ...data,
      [key]: label,
    });
  };

  /**
   * @name getLabel
   * @param {String} address
   * @returns {String|undefined}
   */
  const getLabel = (address) => {
    const key = address.toLowerCase();
    if (data && data.hasOwnProperty(key)) return data[key];
    return undefined;
  };

  return { labels: data, setLabel, getLabel, revalidate };
}
