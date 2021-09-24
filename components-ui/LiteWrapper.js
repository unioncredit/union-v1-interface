import Link from "next/link";
import { Layout, Box, Logo, Grid, Row, Col, Label } from "union-ui";

export function LiteWrapper({ children }) {
  return (
    <Layout>
      <Layout.Main>
        <Grid style={{ display: "flex", flexGrow: 1 }}>
          <Row style={{ width: "100%", margin: 0 }}>
            <Col>
              <Layout.Header
                align="center"
                direction="vertical"
                justify="center"
              >
                <Link href="/">
                  <Logo width="50px" withText />
                </Link>
                <Box mt="42px">
                  <Link href="#">
                    <Label as="a" mx="21px">
                      Website
                    </Label>
                  </Link>
                  <Link href="#">
                    <Label as="a" mx="21px">
                      Twitter
                    </Label>
                  </Link>
                  <Link href="#">
                    <Label as="a" mx="21px">
                      Docs
                    </Label>
                  </Link>
                  <Link href="#">
                    <Label as="a" mx="21px">
                      Governance
                    </Label>
                  </Link>
                </Box>
              </Layout.Header>
              {children}
            </Col>
          </Row>
        </Grid>
        <Box mb="80px" />
      </Layout.Main>
    </Layout>
  );
}
