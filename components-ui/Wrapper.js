import format from "util/formatValue";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import useUnionSymbol from "hooks/useUnionSymbol";
import { TabLink, Navigation, Sidebar } from "components-ui";
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
  ContextMenu,
} from "union-ui";
import useCurrentToken from "hooks/useCurrentToken";
import useInactiveListener from "hooks/useInactiveListener";
import useTokenBalance from "hooks/data/useTokenBalance";
import { Wallet } from "components-ui";
import usePublicData from "hooks/usePublicData";
import useMemberCheck from "hooks/useMemberCheck";
import { Avatar } from "./Avatar";

const contextMenuItems = [
  { label: "Docs", target: "_blank", href: "https://unionfinance.gitbook.io/docs/" },
  { label: "Blog", target: "_blank", href: "https://medium.com/union-finance" },
  { label: "Twitter", target: "_blank", href: "https://twitter.com/unionprotocol" },
  { label: "Discord", target: "_blank", href: "https://discord.gg/cZagzJ3p8G" },
  { label: "Github", target: "_blank", href: "https://github.com/unioncredit" },
]

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
        <Sidebar />
        <Layout.Main>
          <Grid style={{ display: "flex", flexGrow: 1 }}>
            <Row style={{ width: "100%", margin: 0 }}>
              <Col>
                <Layout.Header align="center">
                  <Heading size="large" m={0}>
                    {title}
                  </Heading>
                  <Box>
                    <Box mr="8px">
                      <Wallet
                        onClick={openAccountModal}
                        name={name}
                        avatar={<Avatar address={account} />}
                        mr="8px"
                      />
                    </Box>
                    <ContextMenu items={contextMenuItems} />
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
