import { useLocation } from "react-router-dom";
import { Box, ToggleMenu } from "@unioncredit/ui";

import { TabLink, OverdueAlert } from "components-ui";
import useIsMobile from "hooks/useIsMobile";

export function View({ children, tabItems }) {
  const isMobile = useIsMobile();

  const { pathname } = useLocation();

  const tabItemLinks =
    tabItems?.length > 0
      ? tabItems.map((item) => ({ ...item, as: TabLink }))
      : [];

  const initialTab = tabItemLinks.findIndex((item) => item.href === pathname);

  return (
    <>
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
