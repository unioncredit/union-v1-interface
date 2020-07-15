import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";

let box = null;

async function openBox(address, provider) {
  const Box = (await import("3box")).default;
  if (!Box) throw new Error("Box library is not available");

  box = await Box.openBox(address, provider);
  await box.syncDone;
}

let space = null;

export async function openSpace() {
  if (!box) throw new Error("Box is not open yet");

  space = await box.openSpace("union");
}

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
