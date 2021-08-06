import { useWeb3React } from "@web3-react/core";
import { useAutoEffect } from "hooks.macro";
import useEagerConnect from "hooks/useEagerConnect";
import useIsSanctioned from "hooks/useIsSanctioned";
import { login } from "lib/auth";
import { CONNECTORS, walletconnect } from "lib/connectors";
import getErrorMessage from "lib/getErrorMessage";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { getWalletName, getWalletIcon } from "util/formatWalletDetails";
import { ButtonRow, Card, Button, Text, Label, Heading } from "union-ui";

const WalletOptions = ({
  activatingConnector,
  setActivatingConnector,
  triedEager,
}) => {
  const { error, activate, connector } = useWeb3React();

  const isSanctioned = useIsSanctioned();
  const router = useRouter();

  return (
    <Fragment>
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
          debugger;
          setActivatingConnector(currentConnector);

          await activate(CONNECTORS[name]);

          if (name === "Injected") {
            login();
          }

          if (router.pathname === "/") router.push("/stake");
        };

        if (
          typeof window !== "undefined" &&
          name === "Injected" &&
          !(window?.ethereum || window?.web3)
        ) {
          return null;
        }

        return (
          <ButtonRow key={name} mb="4px" direction="vertical">
            <Button
              variant="secondary"
              icon={getWalletIcon(name)}
              label={getWalletName(name)}
              onClick={handleSignIn}
              disabled={disabled}
              // loading={activating}
            />
          </ButtonRow>
        );
      })}
    </Fragment>
  );
};

export const SignInCard = () => {
  const { error, connector, deactivate } = useWeb3React();

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

      deactivate();
      window.alert(getErrorMessage(error));

      setActivatingConnector(undefined);
    }
  });

  const triedEager = useEagerConnect();

  return (
    <Card size="small">
      <Card.Body>
        <Heading mb="8px">Log In</Heading>
        <Text mb="12px">
          Connect your wallet with one of the available wallet providers.{" "}
        </Text>
        <WalletOptions
          activatingConnector={activatingConnector}
          setActivatingConnector={setActivatingConnector}
          triedEager={triedEager}
        />
        <Label mt="8px" mb="0" as="p" size="small">
          Union never has access to your private keys and we’ll never ask for
          them.
        </Label>
      </Card.Body>
    </Card>
  );
};
