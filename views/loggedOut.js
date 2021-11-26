import { Control, Card, Box, Heading, Text, Grid } from "union-ui";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import useEagerConnect from "hooks/useEagerConnect";
import useTerms from "hooks/useTerms";
import UnsupportedChainView from "./unsupportedChain";
import { useUpdateForceConnect } from "hooks/useForceConnect";
import { LoginOptions } from "components-ui";
import useIsMobile from "hooks/useIsMobile";

export default function LoggedOutView() {
  useUpdateForceConnect();

  const isMobile = useIsMobile();
  const { error } = useWeb3React();
  const { data: confirmTerms, setConfirmTerms } = useTerms();

  const unsupportedChainId = error instanceof UnsupportedChainIdError;

  const triedEager = useEagerConnect();

  if (unsupportedChainId) {
    return <UnsupportedChainView />;
  }

  const loginOptions = <LoginOptions triedEager={triedEager} />;

  return (
    <Box justify="center" align="center" direction="vertical" fluid>
      <Box mt="48px" className="hide-lt-600" />
      <Heading
        mb="4px"
        mt="16px"
        size="xlarge"
        weight="medium"
        grey={800}
        align="center"
      >
        Login to Union
      </Heading>
      <Text grey={500} mb="32px" align="center">
        Connect to Union with your web3 Ethereum based wallet
      </Text>
      <Grid>
        <Grid.Row justify="center">
          <Grid.Col md={12} lg={9}>
            <Grid.Row>
              <Grid.Col>
                <Card mb="16px" size="fluid" packed>
                  <Card.Body>
                    <Control
                      type="checkbox"
                      checked={confirmTerms}
                      onClick={() => setConfirmTerms(!confirmTerms)}
                      label="I agree to Union’s Terms & Conditions and Privacy Policy"
                    />
                  </Card.Body>
                </Card>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              {isMobile ? (
                <Grid.Col xs={12}>
                  <Card packed>
                    <Card.Body>{loginOptions}</Card.Body>
                  </Card>
                </Grid.Col>
              ) : (
                loginOptions
              )}
            </Grid.Row>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </Box>
  );
}
