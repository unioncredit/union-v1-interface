import { OFAC_SANCTIONED } from "../constants/variables";
import useSWR from "swr";
import { useMemo } from "react";

const API_KEY = process.env.NEXT_PUBLIC_IPAPI_KEY;

const ENDPOINT = `https://api.ipapi.com/check?access_key=${API_KEY}&fields=country_code`;

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
  const { data, error } = useSWR(ENDPOINT, fetcher);

  if (!!error) {
    console.log("Error");
    console.log(error);
  }

  console.log(JSON.stringify(data, null, 2));

  let isSanctioned = false;

  if (!!data) {
    if (OFAC_SANCTIONED.includes(data.country_code)) {
      console.log("SANCTIONED");

      isSanctioned = true;
    }
  }

  return isSanctioned;
}
