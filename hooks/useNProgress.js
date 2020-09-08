import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";

export default function useNProgress() {
  const router = useRouter();

  function onRouteChangeStart() {
    NProgress.start();
  }

  function onRouteChangeComplete() {
    NProgress.done();
  }

  useEffect(() => {
    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", onRouteChangeComplete);
    router.events.on("routeChangeError", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", onRouteChangeComplete);
      router.events.off("routeChangeError", onRouteChangeComplete);
    };
  }, []);
}
