import { useWeb3React } from "@web3-react/core";
import { useAutoCallback } from "hooks.macro";
import { injected } from "lib/connectors";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";

export default function useEagerConnect() {
  const cookies = parseCookies();

  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (cookies.eagerConnect) {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      });
    } else {
      setTried(true);
    }
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useLogin() {
  return useAutoCallback(() => {
    setCookie(null, "eagerConnect", true, {
      maxAge: 30 * 24 * 60 * 60,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
    });
  });
}

export function useLogout() {
  return useAutoCallback(() => {
    destroyCookie(null, "eagerConnect");
  });
}
