import { Layout, Box, Grid, Row, Col, ContextMenu, Button } from "union-ui";
import { useWeb3React } from "@web3-react/core";
import { Wallet, Navigation } from "components-ui";
import { useClaimModal, ClaimModal } from "components-ui/modals";
import useInactiveListener from "hooks/useInactiveListener";
import { contextMenuItems } from "constants/app";

export function Wrapper({ children }) {
  useInactiveListener();

  const { account } = useWeb3React();

  const { isOpen: isClaimModalOpen, open: openClaimModal } = useClaimModal();

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
                    {account && (
                      <Box mr="8px">
                        <Wallet mr="8px" />
                      </Box>
                    )}
                    <ContextMenu
                      position="left"
                      items={contextMenuItems}
                      after={
                        account && (
                          <Button
                            fluid
                            size="small"
                            label="Claim UNION"
                            onClick={openClaimModal}
                          />
                        )
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
