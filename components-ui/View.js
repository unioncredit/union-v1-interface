import {
  Layout,
  Box,
  Grid,
  Row,
  Col,
  LoadingSpinner,
  ContextMenu,
  ToggleMenu,
  Button,
} from "union-ui";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { Wallet, TabLink, Navigation, Link } from "components-ui";
import { useClaimModal, ClaimModal } from "components-ui/modals";
import useInactiveListener from "hooks/useInactiveListener";
import useMemberCheck from "hooks/useMemberCheck";
import useIsMobile from "hooks/useIsMobile";
import { contextMenuItems, navItems } from "constants/app";

export function View({children, tabItems}) {
	const isMobile = useIsMobile();


  const router = useRouter();
  const { account } = useWeb3React();

	const tabItemLinks =
    tabItems?.length > 0
      ? tabItems.map((item) => ({ ...item, as: TabLink }))
      : [];

  const navItemLinks = navItems.map((item) => ({
    ...item,
    as: Link,
    href: item.id === "profile" ? `/profile/${account}` : item.pathname,
  }));

  const initialTab = tabItemLinks.findIndex(
    (item) => item.href === router.pathname
  );

  const activeNavItem = navItemLinks.find(
    (item) => item.pathname === router.pathname
  );

	return <><Box justify={isMobile && "space-between"} fluid={isMobile}>
                    {isMobile && (
                      <ContextMenu
                        items={navItemLinks.slice(1)}
                        button={(toggleOpen) => (
                          <Button
                            onClick={toggleOpen}
                            label={activeNavItem?.label || "Menu"}
                            variant="secondary"
                            icon="dropdown-arrow"
                            iconPosition="end"
                          />
                        )}
                      />
                    )}
                    {tabItemLinks?.length > 0 && (
                      <ToggleMenu
                        className="wrapper-toggle-menu"
                        items={tabItemLinks}
                        initialActive={~initialTab ? initialTab : 0}
                      />
                    )}
                  </Box>
                  {children}</>
}