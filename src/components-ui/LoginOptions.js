import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Box, Label, Grid, Text } from "@unioncredit/ui";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { ReactComponent as Chevron } from "@unioncredit/ui/lib/icons/chevron.svg";

import { login } from "lib/auth";
import useIsSanctioned from "hooks/useIsSanctioned";
import { CONNECTORS, walletconnect } from "lib/connectors";
import { getWalletDescription, getWalletIcon } from "util/formatWalletDetails";

import styles from "./loginOptions.module.css";

const resetWalletConnector = (connector) => {
  if (
    connector &&
    connector instanceof WalletConnectConnector &&
    connector.walletConnectProvider?.wc?.uri
  ) {
    connector.walletConnectProvider = undefined;
  }
};

export function LoginOptions({ triedEager }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isSanctioned = useIsSanctioned();
  const { activate, error, connector, deactivate } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = useState();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [connector]);

  /**
   * Handle disconnecting from the wallet if an error occurs
   */
  useEffect(() => {
    if (error) {
      if (connector === walletconnect) connector.close();

      if (!(error instanceof UnsupportedChainIdError)) {
        deactivate();
        setActivatingConnector(undefined);
      }
    }
  }, [connector, deactivate, error]);

  return (
    <Grid.Col>
      <Box fluid align="center">
        <Card packed className={styles.outterCard}>
          {Object.keys(CONNECTORS).map((name, i) => {
            const currentConnector = CONNECTORS[name];
            const activating = currentConnector === activatingConnector;
            const connected = currentConnector === connector;
            const disabled = Boolean(
              !triedEager ||
                !!activatingConnector ||
                connected ||
                !!error ||
                isSanctioned
            );

            const handleSignIn = async () => {
              setActivatingConnector(currentConnector);

              await activate(CONNECTORS[name], undefined, false);
              resetWalletConnector(CONNECTORS[name]);

              if (name === "MetaMask") {
                login();
              }

              if (pathname === "/") navigate("/credit");
            };

            if (
              typeof window !== "undefined" &&
              name === "Injected" &&
              !(window?.ethereum || window?.web3)
            ) {
              return null;
            }

            return (
              <Card
                my="6px"
                packed
                key={i}
                onClick={handleSignIn}
                className={styles.innerCard}
              >
                <Card.Body>
                  <Box align="center">
                    <Box justify="center" mr="16px">
                      {getWalletIcon(name)}
                    </Box>
                    <Box direction="vertical">
                      <Text as="h3" m={0} grey={800}>
                        {name}
                      </Text>
                      <Label as="p" m={0}>
                        {getWalletDescription(name)}
                      </Label>
                    </Box>
                    <Button
                      variant="lite"
                      icon={Chevron}
                      loading={activating}
                      disabled={disabled}
                    />
                  </Box>
                </Card.Body>
              </Card>
            );
          })}
          <Box fluid align="center" justify="center">
            <Label
              as="p"
              size="small"
              align="center"
              mt="12px"
              mb="12px"
              maxw="300px"
            >
              By connecting your wallet, you agree to Union’s Term’s &
              Conditions and Privacy Policy
            </Label>
          </Box>
        </Card>
      </Box>
    </Grid.Col>
  );
}
