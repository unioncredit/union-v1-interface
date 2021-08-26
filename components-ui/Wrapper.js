import format from "util/formatValue";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import useUnionSymbol from "hooks/useUnionSymbol";
import { TabLink, Navigation } from "components-ui";
import {
  WalletModal,
  useWalletModal,
  AccountModal,
  useAccountModal,
  VoteDelegationModal,
  useVoteDelegationModal,
} from "components-ui/modals";
import {
  Tabs,
  Layout,
  Heading,
  Box,
  Button,
  Grid,
  Row,
  Col,
  LoadingSpinner,
} from "union-ui";
import useCurrentToken from "hooks/useCurrentToken";
import useInactiveListener from "hooks/useInactiveListener";
import useTokenBalance from "hooks/data/useTokenBalance";
import { Wallet } from "components-ui";
import usePublicData from "hooks/usePublicData";
import useMemberCheck from "hooks/useMemberCheck";
import { Avatar } from "./Avatar";

export function Wrapper({ children, tabItems, title }) {
  const { isOpen: isVoteDelegationOpen } = useVoteDelegationModal();
  const { isOpen: isWalletModalOpen, open: openWalletModal } = useWalletModal();
  const { isOpen: isAccountModalOpen, open: openAccountModal } =
    useAccountModal();
  const { account } = useWeb3React();
  const router = useRouter();

  const UNION = useCurrentToken("UNION");
  const { data: unionBalance = 0.0 } = useTokenBalance(UNION);
  const { data: unionSymbol } = useUnionSymbol();

  const { name } = usePublicData(account);

  const tabItemLinks =
    tabItems?.length > 0
      ? tabItems.map((item) => ({ ...item, as: TabLink }))
      : [];

  const initialTab = tabItemLinks.findIndex(
    (item) => item.href === router.pathname
  );

  useInactiveListener();
  const { isLoading } = useMemberCheck();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <>
      <Layout>
        <Layout.Sidebar>
          <Navigation />
        </Layout.Sidebar>
        <Layout.Main>
          <Grid style={{ display: "flex", flexGrow: 1 }}>
            <Row style={{ width: "100%", margin: 0 }}>
              <Col>
                <Layout.Header align="center">
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
                      avatar={<Avatar address={account} />}
                    />
                  </Box>
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
          <Box mb="80px" />
        </Layout.Main>
      </Layout>
      {isWalletModalOpen && <WalletModal />}
      {isAccountModalOpen && <AccountModal />}
      {isVoteDelegationOpen && <VoteDelegationModal />}
    </>
  );
}
