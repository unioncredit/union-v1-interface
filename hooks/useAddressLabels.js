import { useLocalStorage } from "react-use";
import useSWR from "swr";

const fetcher = () => {
  const raw = localStorage.getItem("labels");
  return JSON.parse(raw);
};

export default function useAddressLabels() {
  const { data, mutate, revalidate } = useSWR("labels", fetcher);

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
    return data[key];
  };

  return { labels: data, setLabel, getLabel, revalidate };
}
