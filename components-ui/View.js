import { useMemo } from "react";
import { Box, ToggleMenu, TabNav } from "union-ui";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { TabLink, Link, OverdueAlert } from "components-ui";
import useIsMobile from "hooks/useIsMobile";
import { navItems } from "constants/app";
import useIsMember from "hooks/data/useIsMember";

import styles from "./view.module.css";

export function View({ children, tabItems }) {
  const isMobile = useIsMobile();

  const router = useRouter();
  const { account } = useWeb3React();
  const { data: isMember } = useIsMember();

  const tabItemLinks =
    tabItems?.length > 0
      ? tabItems.map((item) => ({ ...item, as: TabLink }))
      : [];

  const navItemLinks = useMemo(() => {
    if (typeof isMember !== "boolean") {
      return [];
    }

    if (!isMember) {
      return navItems.filter((x) =>
        ["get-started", "governance"].includes(x.id)
      );
    }

    return navItems.slice(1).map((item) => ({
      ...item,
      as: Link,
      active: item.pathname === router.pathname,
      href: item.id === "profile" ? `/profile/${account}` : item.pathname,
    }));
  }, [isMember]);

  const initialTab = tabItemLinks.findIndex(
    (item) => item.href === router.pathname
  );

  const isGetStarted = router.pathname === "/";

  return (
    <>
      {isMobile && !isGetStarted && (
        <div className={styles.tabNavWrapper}>
          <TabNav items={navItemLinks} />
        </div>
      )}
      <OverdueAlert />
      {tabItemLinks?.length > 0 && (
        <Box justify="center">
          <ToggleMenu
            fluid={isMobile}
            className="wrapper-toggle-menu"
            items={tabItemLinks}
            initialActive={~initialTab ? initialTab : 0}
          />
        </Box>
      )}
      {children}
    </>
  );
}
