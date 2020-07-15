import { useLocalStorage } from "react-use";
import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";

const fetcher = async (_, account, library) => {
  const Box = (await import("3box")).default;

  const box = await Box.openBox(account, library.provider);

  await box.syncDone;

  const space = await box.openSpace("union");

  const labels = await space.private.get("labels");

  return JSON.parse(labels);
};

export default function useAddressLabels() {
  const { account, library } = useWeb3React();

  // const space = useSpace();

  // useEffect(() => {
  //   (async () => {
  //     // await space.private.set("labels", JSON.stringify({}));

  //     const labels = await (await space).private.get("labels");

  //     console.log(labels);
  //   })();
  // }, []);

  const { data, mutate, revalidate } = useSWR(
    ["Labels", account, library],
    fetcher
  );

  const [, setValue] = useLocalStorage("labels", {});

  /**
   * @name setLabel
   * @param {String} address
   * @param {String} label
   */
  const setLabel = async (address, label) => {
    const key = address.toLowerCase();

    setValue((current) => ({ ...current, [key]: label }));

    await mutate({ ...data, [key]: label });
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
