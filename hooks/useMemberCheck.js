import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import useIsMember from "hooks/data/useIsMember";
import { useRouter } from "next/router";

export default function useMemberCheck() {
  const [isLoading, setLoading] = useState(true);
  const { account } = useWeb3React();
  const router = useRouter();
  const { data: isMember } = useIsMember();

  const pathname = router.pathname;

  useEffect(() => {
    const isGetStarted = pathname.startsWith("/get-started");

    async function load() {
      if (!isMember && !isGetStarted) {
        await router.push("/get-started");
      } else if (isMember && isGetStarted) {
        await router.push("/credit");
      }
      setLoading(false);
    }

    account && typeof isMember !== "undefined" && load();
  }, [pathname, isMember, account]);

  return { isLoading };
}
