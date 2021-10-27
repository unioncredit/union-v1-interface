import { ModalOverlay, Label, Heading, Box, Button, Text } from "union-ui";
import ExternalInline from "union-ui/lib/icons/externalinline.svg";
import { Modal, NetworkSelect } from "components-ui";
import { useModal } from "hooks/useModal";
import { useWeb3React } from "@web3-react/core";
import usePublicData from "hooks/usePublicData";
import { walletconnect, injected } from "lib/connectors";
import useToast, { FLAVORS } from "hooks/useToast";
import { logout } from "lib/auth";
import useActivity, { clearActivity } from "hooks/data/useActivity";
import { Dai } from "components-ui/Dai";
import getEtherscanLink from "util/getEtherscanLink";
import { Copyable } from "components-ui/Copyable";

export const ACCOUNT_MODAL = "account-modal";

export const useAccountModal = () => useModal(ACCOUNT_MODAL);

export function AccountModal() {
  const { chainId, account, connector, deactivate } = useWeb3React();
  const { name } = usePublicData(account);
  const { close } = useAccountModal();
  const activity = useActivity();

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
          <Button
            variant="pill"
            label="clear"
            onClick={() => clearActivity(chainId)}
          />
        </Box>
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
              <Box key={hash} align="center" justify="space-between" mt="8px">
                <div>
                  <Text color={failed && "orange"} m={0}>
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
              </Box>
            );
          })
        )}
      </Modal>
    </ModalOverlay>
  );
}
