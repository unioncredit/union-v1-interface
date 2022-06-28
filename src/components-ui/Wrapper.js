import {
  Layout,
  Box,
  Grid,
  Row,
  Col,
  Label,
  AlertBanner,
} from "@unioncredit/ui";
import { Navigation } from "components-ui";
import { ClaimModal } from "components-ui/modals";
import useInactiveListener from "hooks/useInactiveListener";
import { useUpdateForceConnect } from "hooks/useForceConnect";
import useBetaBanner from "hooks/useBetaBanner";

export function Wrapper({ children }) {
  useInactiveListener();

  useUpdateForceConnect();

  const [showBetaBanner, hideBetaBanner] = useBetaBanner();

  return (
    <>
      <div>
        {showBetaBanner && (
          <AlertBanner
            label="This is experimental software. Do not use unless you understand the risks."
            onClose={hideBetaBanner}
          />
        )}
      </div>
      <Layout>
        <Layout.Main>
          <Grid style={{ display: "flex", flexGrow: 1 }}>
            <Row style={{ width: "100%", margin: 0 }}>
              <Col>
                <Layout.Header align="center">
                  <Navigation />
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
          <Box mt="auto" w="100%">
            <Box mt="40px" mb="16px" justify="center" fluid>
              <Label as="p" size="small" grey={300} align="center">
                Build: {process.env.REACT_APP_VERSION}
              </Label>
            </Box>
          </Box>
        </Layout.Main>
      </Layout>
      <ClaimModal />
    </>
  );
}
