import format from "util/formatValue";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import useUnionSymbol from "hooks/useUnionSymbol";
import { TabLink, Footer, Navigation } from "components-ui";
import {
  WalletModal,
  useWalletModal,
  AccountModal,
  useAccountModal,
} from "components-ui/modals";
import useCurrentToken from "hooks/useCurrentToken";
import useTokenBalance from "hooks/data/useTokenBalance";
import useAsyncActivity from "hooks/data/useAsyncActivity";
import {
  Tabs,
  Layout,
  Heading,
  Box,
  Button,
  Wallet,
  Logo,
  Grid,
  Row,
  Col,
} from "union-ui";
import usePublicData from "hooks/usePublicData";
import { Avatar } from "./Avatar";

export function Wrapper({ children, tabItems, title }) {
  const activity = useAsyncActivity();
  const { isOpen: isWalletModalOpen, open: openWalletModal } = useWalletModal();
  const { isOpen: isAccountModalOpen, open: openAccountModal } =
    useAccountModal();
  const { library, account } = useWeb3React();
  const router = useRouter();

  const UNION = useCurrentToken("UNION");
  const { data: unionBalance = 0.0 } = useTokenBalance(UNION);
  const { data: unionSymbol } = useUnionSymbol();

  const { name } = usePublicData(account);

  const isLoggedIn = library && account;

  const mainProps = {
    ...(!isLoggedIn ? { justify: "space-between" } : {}),
    ...(!isLoggedIn ? { align: "center" } : {}),
  };

  const headerProps = {
    ...mainProps,
    ...(!isLoggedIn ? { justify: "center" } : {}),
  };

  const tabItemLinks =
    tabItems?.length > 0
      ? tabItems.map((item) => ({ ...item, as: TabLink }))
      : [];

  const initialTab = tabItemLinks.findIndex(
    (item) => item.href === router.pathname
  );

  return (
    <>
      <Layout>
        {isLoggedIn && (
          <Layout.Sidebar>
            <Navigation />
          </Layout.Sidebar>
        )}
        <Layout.Main {...mainProps}>
          <Grid style={{ display: "flex", flexGrow: 1 }}>
            <Row style={{ width: "100%", margin: 0 }}>
              <Col>
                <Layout.Header {...headerProps} align="center">
                  {isLoggedIn ? (
                    <>
                      <Heading size="large" m={0}>
                        {title}
                      </Heading>
                      <Box>
                        <Button
                          variant="secondary"
                          icon="vouch"
                          label={`${format(unionBalance, 2)} ${unionSymbol}`}
                          onClick={openWalletModal}
                        />
                        <Wallet
                          onClick={openAccountModal}
                          name={name}
                          indicator={
                            activity.data?.length > 99
                              ? "99+"
                              : activity.data?.length
                          }
                          avatar={<Avatar address={account} />}
                        />
                      </Box>
                    </>
                  ) : (
                    <Logo width="26px" />
                  )}
                </Layout.Header>
                {tabItems && (
                  <Box mb="24px">
                    <Tabs initialActive={initialTab} items={tabItemLinks} />
                  </Box>
                )}
                {children}
              </Col>
            </Row>
          </Grid>
        </Layout.Main>
      </Layout>
      {isWalletModalOpen && <WalletModal />}
      {isAccountModalOpen && <AccountModal activity={activity} />}
    </>
  );
}
