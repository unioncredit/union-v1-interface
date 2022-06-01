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

  // TODO:
  const query = null;

  useEffect(() => {
    const isGetStarted = pathname === "/";

    async function load() {
      // TODO
      // if (!Object.prototype.hasOwnProperty.call(query, "development")) {
      if (!isMember && !isGetStarted) {
        navigate("/");
      } else if (isMember && isGetStarted) {
        navigate("/credit");
      }
      // }

      setIsLoading(false);
    }

    account && typeof isMember !== "undefined" && load();
  }, [pathname, isMember, account]);

  return { isLoading, isMember };
}
