import {
  Skeleton,
  ButtonRow,
  Card,
  Button,
  Text,
  Label,
  Heading,
} from "@unioncredit/ui";
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";

import { login } from "lib/auth";
import useEagerConnect from "hooks/useEagerConnect";
import useIsSanctioned from "hooks/useIsSanctioned";
import { CONNECTORS, walletconnect } from "lib/connectors";
import { getWalletName, getWalletIcon } from "util/formatWalletDetails";
import { NetworkSwitcher } from "./NetworkSwitcher";

const WalletOptions = ({
  activatingConnector,
  setActivatingConnector,
  triedEager,
}) => {
  const { error, activate, connector } = useWeb3React();

  const isSanctioned = useIsSanctioned();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Fragment>
      {Object.keys(CONNECTORS).map((name) => {
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

          await activate(CONNECTORS[name]);

          if (name === "Injected") {
            login();
          }

          if (pathname === "/") navigate("/stake");
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
              fontSize="large"
              loading={activating}
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

  const triedEager = useEagerConnect();

  if (!triedEager) {
    return (
      <Card size="small">
        <Card.Body>
          <Skeleton size="large" />
          <Skeleton size="small" variant="secondary" w="100%" />
          <Skeleton size="small" variant="secondary" w="100%" />
          <Skeleton size="large" variant="secondary" w="100%" />
          <Skeleton size="small" variant="secondary" />
        </Card.Body>
      </Card>
    );
  }

  const isUnsupportedChainId = error instanceof UnsupportedChainIdError;

  return (
    <Card size="small">
      <Card.Body>
        <Heading mb="8px">Log In</Heading>
        {isUnsupportedChainId ? (
          <NetworkSwitcher />
        ) : (
          <>
            <Text mb="12px">
              Connect your wallet with one of the available wallet providers.{" "}
            </Text>
            <WalletOptions
              activatingConnector={activatingConnector}
              setActivatingConnector={setActivatingConnector}
              triedEager={triedEager}
            />
            <Label mt="8px" mb="0" as="p" size="small" grey={400}>
              Union never has access to your private keys and we’ll never ask
              for them.
            </Label>
          </>
        )}
      </Card.Body>
    </Card>
  );
};
