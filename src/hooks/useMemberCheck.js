import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import useIsMember from "hooks/data/useIsMember";
import { useLocation, useNavigate } from "react-router-dom";

export default function useMemberCheck() {
  const [isLoading, setIsLoading] = useState(true);
  const { account } = useWeb3React();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: isMember } = useIsMember();

  useEffect(() => {
    const isGetStarted = pathname === "/get-started";

    async function load() {
      if (!window.location.href.includes("development")) {
        if (!isMember && !isGetStarted) {
          navigate("/get-started");
        } else if (isMember && isGetStarted) {
          navigate("/credit");
        }
      }

      setIsLoading(false);
    }

    account && typeof isMember !== "undefined" && load();
  }, [pathname, isMember, account]);

  return { isLoading, isMember };
}
