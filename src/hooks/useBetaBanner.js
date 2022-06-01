import { useState, useEffect } from "react";

const BETA_BANNER_KEY = "union:beta_banner_key";

export default function useBetaBanner() {
  const [state, setState] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(BETA_BANNER_KEY) !== "false") {
      setState(true);
    }
  }, []);

  const hideBanner = () => {
    setState(false);
    localStorage.setItem(BETA_BANNER_KEY, "false");
  };

  return [state, hideBanner];
}
