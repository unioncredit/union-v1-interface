import { Box, ContextMenu, ToggleMenu, Button } from "union-ui";
import DropdownArrow from "union-ui/lib/icons/dropdownArrow.svg";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { TabLink, Link } from "components-ui";
import useIsMobile from "hooks/useIsMobile";
import { navItems } from "constants/app";

export function View({ children, tabItems }) {
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

  return (
    <>
      <Box justify={isMobile && "space-between"} fluid={isMobile}>
        {isMobile && (
          <ContextMenu
            items={navItemLinks.slice(1)}
            button={(toggleOpen) => (
              <Button
                onClick={toggleOpen}
                label={activeNavItem?.label || "Menu"}
                variant="secondary"
                icon={DropdownArrow}
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
      {children}
    </>
  );
}
