import { Card, Button, Box, Heading, Grid, Text } from "union-ui";
import { useRouter } from "next/router";
import useIsSanctioned from "hooks/useIsSanctioned";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useAutoEffect } from "hooks.macro";
import useTerms from "hooks/useTerms";
import { CONNECTORS, walletconnect } from "lib/connectors";
import { getWalletIcon } from "util/formatWalletDetails";
import { login } from "lib/auth";
import useIsMobile from "hooks/useIsMobile";

export function LoginOptions({ triedEager }) {
  const { data: confirmTerms } = useTerms();
  const router = useRouter();
  const isMobile = useIsMobile();
  const isSanctioned = useIsSanctioned();
  const { activate, error, connector, deactivate } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = useState();

  useAutoEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  });

  /**
   * Handle disconnecting from the wallet if an error occurs
   */
  useAutoEffect(() => {
    if (error) {
      if (connector === walletconnect) connector.close();

      if (!(error instanceof UnsupportedChainIdError)) {
        deactivate();
        setActivatingConnector(undefined);
      }
    }
  });

  return (
    <>
      {Object.keys(CONNECTORS).map((name, i) => {
        const currentConnector = CONNECTORS[name];
        const activating = currentConnector === activatingConnector;
        const connected = currentConnector === connector;
        const disabled = Boolean(
          !triedEager ||
            !!activatingConnector ||
            connected ||
            !!error ||
            isSanctioned ||
            !confirmTerms
        );

        const handleSignIn = async () => {
          setActivatingConnector(currentConnector);

          await activate(CONNECTORS[name]);

          if (name === "MetaMask") {
            login();
          }

          if (router.pathname === "/") router.push("/credit");
        };

        if (
          typeof window !== "undefined" &&
          name === "Injected" &&
          !(window?.ethereum || window?.web3)
        ) {
          return null;
        }

        const button = (
          <Button
            fluid
            label="Connect"
            onClick={handleSignIn}
            disabled={disabled}
            fontSize="large"
            loading={activating}
            variant="secondary"
          />
        );

        if (isMobile) {
          return (
            <Box align="center" mt={i !== 0 && "16px"}>
              {getWalletIcon(name)}
              <Text mb={0} ml="8px">
                {name}
              </Text>
              <Box ml="auto">{button}</Box>
            </Box>
          );
        }

        return (
          <Grid.Col xs={12} md={6} key={name}>
            <Card mb="24px">
              <Card.Body>
                <Box justify="center" mb="24px">
                  {getWalletIcon(name)}
                </Box>
                <Heading align="center">{name}</Heading>
                <Box fluid mt="24px">
                  {button}
                </Box>
              </Card.Body>
            </Card>
          </Grid.Col>
        );
      })}
    </>
  );
}
