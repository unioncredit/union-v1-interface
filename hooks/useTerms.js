import { useLocalStorage } from "react-use";
import useSWR from "swr";

const TERM_KEY = "union:terms_and_conditions";

const fetcher = () => {
  const raw = localStorage.getItem(TERM_KEY);
  return JSON.parse(raw);
};

export default function useTerms() {
  const { data, mutate, revalidate } = useSWR("terms_and_conditions", fetcher);

  const [, setValue] = useLocalStorage(TERM_KEY, false);

  /**
   * @name setLabel
   * @param {String} address
   * @param {String} label
   */
  const setConfirmTerms = async (value) => {
    setValue(value);
    await mutate(value);
    await revalidate();
  };

  return { data, setConfirmTerms };
}
