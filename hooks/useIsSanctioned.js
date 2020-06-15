import { OFAC_SANCTIONED } from "../constants/variables";
import useSWR from "swr";
import { useMemo } from "react";

const API_KEY = process.env.NEXT_PUBLIC_IPAPI_KEY;

const ENDPOINT = `http://api.ipapi.com/check?access_key=${API_KEY}&fields=country_code`;

const fetcher = async (...args) => {
  const res = await fetch(...args);
  return res.json();
};

/*
 * @name useIsSanctioned
 * Returns 'true' or 'false' whether or not the current
 *   user's IP is located in an OFAC sanctioned country.
 */
export default function useIsSanctioned() {
  const { data } = useSWR(ENDPOINT, fetcher);

  let isSanctioned = false;

  if (!!data) {
    typeof window !== "undefined" && window.alert(data.country_code);

    if (OFAC_SANCTIONED.includes(data.country_code)) {
      isSanctioned = true;
    }
  }

  return isSanctioned;
}
