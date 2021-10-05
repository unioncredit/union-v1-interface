import Link from "next/link";
import { Layout, ContextMenu, Logo, Grid, Row, Col } from "union-ui";
import { ClaimButton } from "components-ui";
import { contextMenuItems } from "constants/app";

export function LiteWrapper({ children }) {
  return (
    <Layout>
      <Layout.Main>
        <Grid style={{ display: "flex", flexGrow: 1 }}>
          <Row style={{ width: "100%", margin: 0 }}>
            <Col>
              <Layout.Header align="center">
                <Link href="/">
                  <a>
                    <Logo width="50px" />
                  </a>
                </Link>
                <ContextMenu
                  position="left"
                  items={contextMenuItems}
                  after={<ClaimButton size="small" label="Claim UNION" />}
                />
              </Layout.Header>
              {children}
            </Col>
          </Row>
        </Grid>
      </Layout.Main>
    </Layout>
  );
}
