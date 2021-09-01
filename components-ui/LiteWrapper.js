import { Layout, Box, Logo, Grid, Row, Col } from "union-ui";

export function LiteWrapper({ children }) {
  return (
    <Layout>
      <Layout.Main>
        <Grid style={{ display: "flex", flexGrow: 1 }}>
          <Row style={{ width: "100%", margin: 0 }}>
            <Col>
              <Layout.Header align="center" justify="center">
                <Logo width="26px" />
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