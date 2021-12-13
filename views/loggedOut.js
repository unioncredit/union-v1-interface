import { Box, Heading, Text, Grid } from "union-ui";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import useEagerConnect from "hooks/useEagerConnect";
import UnsupportedChainView from "./unsupportedChain";
import { useUpdateForceConnect } from "hooks/useForceConnect";
import { LoginOptions } from "components-ui";

export default function LoggedOutView() {
  useUpdateForceConnect();

  const { error } = useWeb3React();

  const unsupportedChainId = error instanceof UnsupportedChainIdError;

  const triedEager = useEagerConnect();

  if (unsupportedChainId) {
    return <UnsupportedChainView />;
  }

  return (
    <Box align="center" direction="vertical" fluid>
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
              <LoginOptions triedEager={triedEager} />
            </Grid.Row>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </Box>
  );
}
