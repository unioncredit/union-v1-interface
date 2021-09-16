import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { TabLink, Navigation } from "components-ui";
import {
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
  Grid,
  Row,
  Col,
  LoadingSpinner,
  ContextMenu,
  ToggleMenu,
} from "union-ui";
import useInactiveListener from "hooks/useInactiveListener";
import { Wallet } from "components-ui";
import usePublicData from "hooks/usePublicData";
import useMemberCheck from "hooks/useMemberCheck";
import { Avatar } from "./Avatar";

const contextMenuItems = [
  {
    label: "Docs",
    target: "_blank",
    href: "https://unionfinance.gitbook.io/docs/",
  },
  { label: "Blog", target: "_blank", href: "https://medium.com/union-finance" },
  {
    label: "Twitter",
    target: "_blank",
    href: "https://twitter.com/unionprotocol",
  },
  { label: "Discord", target: "_blank", href: "https://discord.gg/cZagzJ3p8G" },
  { label: "Github", target: "_blank", href: "https://github.com/unioncredit" },
];

export function Wrapper({ children, title, tabItems }) {
  const { isOpen: isVoteDelegationOpen } = useVoteDelegationModal();
  const { isOpen: isAccountModalOpen, open: openAccountModal } =
    useAccountModal();
  const { account } = useWeb3React();

  const { name } = usePublicData(account);

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
        <Layout.Main>
          <Grid style={{ display: "flex", flexGrow: 1 }}>
            <Row style={{ width: "100%", margin: 0 }}>
              <Col>
                <Layout.Header align="center">
                  <Navigation />
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
                  <Box fluid align="center" direction="vertical">
                    <ToggleMenu items={tabItems} />
                    {children}
                  </Box>
              </Col>
            </Row>
          </Grid>
          <Box mb="40px" />
        </Layout.Main>
      </Layout>
      {isAccountModalOpen && <AccountModal />}
      {isVoteDelegationOpen && <VoteDelegationModal />}
    </>
  );
}
