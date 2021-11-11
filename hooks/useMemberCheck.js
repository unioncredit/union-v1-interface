import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import useIsMember from "hooks/data/useIsMember";
import { useRouter } from "next/router";
import { newRidgeState } from "react-ridge-state";

const memberLoadingState = newRidgeState(true);

export function useIsMemberLoading() {
  return memberLoadingState.useValue();
}

export default function useMemberCheck() {
  const isLoading = useIsMemberLoading();
  const { account } = useWeb3React();
  const router = useRouter();
  const { data: isMember } = useIsMember();

  const pathname = router.pathname;

  useEffect(() => {
    const isGetStarted = pathname === "/";

    async function load() {
      if (!Object.prototype.hasOwnProperty.call(router.query, "development")) {
        if (!isMember && !isGetStarted) {
          await router.push("/");
        } else if (isMember && isGetStarted) {
          await router.push("/credit");
        }
      }

      memberLoadingState.set(false);
    }

    account && typeof isMember !== "undefined" && load();
  }, [pathname, isMember, account]);

  return { isLoading };
}
