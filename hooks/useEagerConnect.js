import { injected } from "@lib/connectors";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const { query, pathname } = useRouter();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (pathname.includes("/stake") && Object.keys(query).length > 0) {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      });
    }
  }, [query, pathname]);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
