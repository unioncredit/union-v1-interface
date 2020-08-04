import * as Fathom from "fathom-client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SITE_ID = "GMOFVKBP";

export default function useFathom() {
  const router = useRouter();

  useEffect(() => {
    Fathom.load(SITE_ID, {
      includedDomains: [
        "beta.union.finance",
        "kovan.beta.union.finance",
        "union.finance",
      ],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);
}
