import { OFAC_SANCTIONED } from "../constants/variables";
import uswSWR from "swr";

const API_KEY = process.env.NEXT_PUBLIC_IPAPI_KEY;

const ENDPOINT = `http://api.ipapi.com/check?access_key=${API_KEY}&fields=country_code`;

/*
 * @name useIsSanctioned
 * Returns 'true' or 'false' whether or not the current
 *   user's IP is located in an OFAC sanctioned country.
 */
export default function useIsSanctioned() {
  const { data } = useSWR(ENDPOINT);

  const country = data?.country_code;

  if (OFAC_SANCTIONED.includes(country)) return true;

  return false;
}
