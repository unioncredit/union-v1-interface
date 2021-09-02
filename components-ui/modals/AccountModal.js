import {
  ModalOverlay,
  Label,
  Heading,
  Box,
  Button,
  Text,
  Divider,
  StatusIcon,
  Icon,
  NetworkIndicator,
} from "union-ui";
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
    <ModalOverlay>
      <Modal title="Account" onClose={close}>
        <Modal.Body>
          <Box mb="20px">
            <NetworkSelect />
          </Box>
          <Box align="center" justify="space-between">
            <Text mb="9px">{walletName}</Text>
            <Button variant="pill" onClick={handleSignOut} label="Disconnect" />
          </Box>
          <Heading mt="4px">{name}</Heading>
          <Label size="small" grey={600}>
            <Copyable value={account}>{account}</Copyable>
          </Label>
          <Divider />
          <Box align="center" justify="space-between" mt="20px" mb="16px">
            <Text m={0} size="large" grey={700}>
              Activity
            </Text>
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
                          {text} <Icon name="external" />
                        </a>
                      ) : (
                        text
                      )}
                    </Text>
                  </div>
                  <StatusIcon
                    variant="wire"
                    name={failed ? "error" : "success"}
                  />
                </Box>
              );
            })
          )}
          <NetworkIndicator chainId={chainId} mt="24px" mb="4px" />
        </Modal.Body>
      </Modal>
    </ModalOverlay>
  );
}
