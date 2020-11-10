import { useWeb3React } from "@web3-react/core";
import { injected } from "lib/connectors";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useEagerConnect() {
  const { pathname } = useRouter();

  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    async function handleEagerConnect() {
      if (typeof window !== "undefined") {
        await import("cookie-store");
      }

      const eagerConnect = await window?.cookieStore?.get("eager_connect");

      if (
        pathname !== "/" &&
        pathname !== "/waitlist" &&
        Boolean(eagerConnect)
      ) {
        const isAuthorized = await injected.isAuthorized();

        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      } else {
        setTried(true);
      }
    }

    handleEagerConnect();
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
