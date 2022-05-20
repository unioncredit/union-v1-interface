import * as Fathom from "fathom-client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { networkAppUrlsProd } from "lib/connectors";

const domains = Object.values(networkAppUrlsProd).map((url: string) =>
  url.replace("https://", "")
);

export default function useFathom() {
  const router = useRouter();

  useEffect(() => {
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_ID, {
      includedDomains: ["*.union.finance", ...domains],
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
