import { useLocalStorage } from "react-use";
import useSWR from "swr";

const fetcher = () => {
  const raw = localStorage.getItem("labels");
  return JSON.parse(raw);
};

export default function useAddressLabels() {
  const { data, mutate } = useSWR("labels", fetcher);

  const [, setValue] = useLocalStorage("labels", {});

  /**
   * @name setLabel
   * @param {String} address
   * @param {String} label
   */
  const setLabel = async (address, label) => {
    if (!address) return;

    const key = address.toLowerCase();

    if (!label) {
      setValue((current) => {
        let cur = current;
        delete cur[key];
        return cur;
      });

      let curData = data;
      delete curData[key];
      await mutate(curData);
    } else {
      setValue((current) => ({ ...current, [key]: label }));

      await mutate({ ...data, [key]: label });
    }

    await mutate();
  };

  /**
   * @name getLabel
   * @param {String} address
   * @returns {String|undefined}
   */
  const getLabel = (address) => {
    if (!address) return;

    const key = address.toLowerCase();
    if (data && Object.prototype.hasOwnProperty.call(data, key))
      return data[key];
    return undefined;
  };

  return { labels: data, setLabel, getLabel };
}
