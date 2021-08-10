import format from "util/formatValue";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import useUnionSymbol from "hooks/useUnionSymbol";
import { TabLink, Footer, Navigation } from "components-ui";
import useCurrentToken from "hooks/useCurrentToken";
import useTokenBalance from "hooks/data/useTokenBalance";
import { Tabs, Layout, Heading, Box, Button, Wallet, Logo } from "union-ui";

export function Wrapper({ children, tabItems, title }) {
  const { library, account } = useWeb3React();
  const router = useRouter();

  const UNION = useCurrentToken("UNION");
  const { data: unionBalance = 0.0 } = useTokenBalance(UNION);
  const { data: unionSymbol } = useUnionSymbol();

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
    <Layout>
      {isLoggedIn && (
        <Layout.Sidebar>
          <Navigation />
        </Layout.Sidebar>
      )}
      <Layout.Main {...mainProps}>
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
                />
                <Wallet />
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
        <Footer />
      </Layout.Main>
    </Layout>
  );
}
