import { useLocalStorage } from "react-use";

export default function useAddressLabels() {
  const [value, setValue] = useLocalStorage("labels", {});

  /**
   * @name setLabel
   * @param {String} address
   * @param {String} label
   */
  const setLabel = (address, label) => {
    const key = address.toLowerCase();

    setValue((current) => ({ ...current, [key]: label }));
  };

  /**
   * @name getLabel
   * @param {String} address
   * @returns {String|undefined}
   */
  const getLabel = (address) => {
    const key = address.toLowerCase();

    return value[key];
  };

  return { labels: value, setLabel, getLabel };
}
