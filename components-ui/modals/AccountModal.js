import { useWeb3React } from "@web3-react/core";
import { ModalOverlay, Label, Heading, Box, Button, Text } from "union-ui";

import { useModal } from "hooks/useModal";
import usePublicData from "hooks/usePublicData";
import useToast, { FLAVORS } from "hooks/useToast";
import useActivity, { useClearActivity } from "hooks/data/useActivity";
import { Copyable, Modal, NetworkSelect, Dai } from "components-ui";
import { logout } from "lib/auth";
import { walletconnect, injected } from "lib/connectors";
import getEtherscanLink from "util/getEtherscanLink";

import ExternalInline from "union-ui/lib/icons/externalinline.svg";
import Failed from "union-ui/lib/icons/failed.svg";
import Success from "union-ui/lib/icons/success.svg";

export const ACCOUNT_MODAL = "account-modal";

export const useAccountModal = () => useModal(ACCOUNT_MODAL);

export function AccountModal() {
  const { chainId, account, connector, deactivate } = useWeb3React();
  const { name } = usePublicData(account);
  const { close } = useAccountModal();
  const activity = useActivity();
  const clearActivity = useClearActivity();

  const addToast = useToast();

  const handleSignOut = () => {
    if (connector === walletconnect) connector.close();

    deactivate();
    addToast(FLAVORS.LOGGED_OUT);
    logout();
    close();
  };

  const isEmpty = !activity || activity.length <= 0;

  const walletName =
    connector === walletconnect
      ? "Wallet Connect"
      : connector === injected
      ? "Metamask"
      : null;

  return (
    <ModalOverlay onClick={close}>
      <Modal title="Account" onClose={close}>
        <Box mb="20px">
          <NetworkSelect />
        </Box>
        <Box align="center" justify="space-between">
          <Label as="p" size="small" mb="8px" grey={400}>
            {walletName.toUpperCase()}
          </Label>
          <Button variant="pill" onClick={handleSignOut} label="Disconnect" />
        </Box>
        <Heading m={0} size="large">
          {name}
        </Heading>
        <Label size="small" grey={600}>
          <Copyable value={account}>{account}</Copyable>
        </Label>
        <Box align="center" justify="space-between" mt="20px" mb="12px">
          <Label as="p" size="small" mb="8px" grey={400}>
            {"Activity".toUpperCase()}
          </Label>
          <Button variant="pill" label="clear" onClick={clearActivity} />
        </Box>
        <Box mb="24px" direction="vertical" fluid>
          {isEmpty ? (
            <Text>No activity</Text>
          ) : (
            activity.map(({ amount, label, hash, failed }) => {
              const text =
                amount && label ? (
                  <>
                    {label} <Dai value={amount} />
                  </>
                ) : (
                  label
                );

              return (
                <Box
                  key={hash}
                  align="center"
                  justify="space-between"
                  mt="8px"
                  fluid
                >
                  <div>
                    <Text color={failed && "red600"} m={0}>
                      {hash ? (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={getEtherscanLink(chainId, hash, "TRANSACTION")}
                        >
                          {text} <ExternalInline />
                        </a>
                      ) : (
                        text
                      )}
                    </Text>
                  </div>
                  {failed && <Failed width="22px" />}
                  {!failed && <Success />}
                </Box>
              );
            })
          )}
        </Box>
      </Modal>
    </ModalOverlay>
  );
}
