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

export function Wrapper({ children, tabItems }) {
  useInactiveListener();

  const router = useRouter();
  const isMobile = useIsMobile();
  const { account } = useWeb3React();

  const { isOpen: isClaimModalOpen, open: openClaimModal } = useClaimModal();

  const { isLoading } = useMemberCheck();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <LoadingSpinner size={30} />
      </div>
    );
  }

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
      <Layout>
        <Layout.Main>
          <Grid style={{ display: "flex", flexGrow: 1 }}>
            <Row style={{ width: "100%", margin: 0 }}>
              <Col>
                <Layout.Header align="center">
                  <Navigation />
                  <Box align="center">
                    <Box mr="8px">
                      <Wallet mr="8px" />
                    </Box>
                    <ContextMenu
                      position="left"
                      items={contextMenuItems}
                      after={
                        <Button
                          fluid
                          size="small"
                          label="Claim UNION"
                          onClick={openClaimModal}
                        />
                      }
                    />
                  </Box>
                </Layout.Header>
                <Box
                  fluid
                  align="center"
                  direction="vertical"
                  className="inner-wrapper"
                >
                  <Box justify={isMobile && "space-between"} fluid={isMobile}>
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
                  {children}
                </Box>
              </Col>
            </Row>
          </Grid>
          <Box mb="40px" />
        </Layout.Main>
      </Layout>
      {isClaimModalOpen && <ClaimModal />}
    </>
  );
}
