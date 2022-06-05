import {
  ModalOverlay,
  Label,
  Badge,
  Box,
  Button,
  Text,
  Heading,
  Divider,
} from "@unioncredit/ui";
import { useWeb3React } from "@web3-react/core";
import { ReactComponent as ExternalInline } from "@unioncredit/ui/lib/icons/externalinline.svg";
import { ReactComponent as External } from "@unioncredit/ui/lib/icons/external.svg";
import { ReactComponent as Failed } from "@unioncredit/ui/lib/icons/failed.svg";
import { ReactComponent as Success } from "@unioncredit/ui/lib/icons/success.svg";

import { Avatar } from "components-ui/Avatar";
import { Copyable, Modal, NetworkSelect, Dai } from "components-ui";
import { useModal, useModalOpen } from "hooks/useModal";
import usePublicData from "hooks/usePublicData";
import useActivity, { useClearActivity } from "hooks/data/useActivity";
import { logout } from "lib/auth";
import { walletconnect, injected } from "lib/connectors";
import truncateAddress from "util/truncateAddress";
import getEtherscanLink from "util/getEtherscanLink";

export const ACCOUNT_MODAL = "account-modal";

export const useAccountModal = () => useModal(ACCOUNT_MODAL);

export const useAccountModalOpen = () => useModalOpen(ACCOUNT_MODAL);

export function AccountModal() {
  const { chainId, account, connector, deactivate } = useWeb3React();
  const { name } = usePublicData(account);
  const { close } = useAccountModal();

  const activity = useActivity();
  const clearActivity = useClearActivity();
  const isOpen = useAccountModalOpen();

  if (!isOpen) return null;

  const handleSignOut = () => {
    if (connector === walletconnect) connector.close();

    deactivate();
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

  const addressEtherscanLink = getEtherscanLink(chainId, account, "ADDRESS");

  return (
    <ModalOverlay onClick={close}>
      <Modal title="Account" onClose={close} size="medium">
        <Box align="center" justify="space-between">
          <Label as="p" size="small" mb="8px" grey={400}>
            {walletName?.toUpperCase()}
          </Label>
          <Button variant="pill" onClick={handleSignOut} label="Disconnect" />
        </Box>
        <Box fluid align="center" direction="vertical" mt="16px">
          <Avatar address={account} size={56} />
          <Heading mt="8px">{name}</Heading>
        </Box>
        <Box fluid justify="center" mb="16px">
          <Badge
            mr="4px"
            color="grey"
            label={
              <Copyable value={account}>{truncateAddress(account)}</Copyable>
            }
          />
          <a href={addressEtherscanLink} target="_blank" rel="noreferrer">
            <External width="24px" />
          </a>
        </Box>
        <Box mb="20px">
          <NetworkSelect />
        </Box>
        <Divider />
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
                  {!failed && <Success width="22px" />}
                </Box>
              );
            })
          )}
        </Box>
      </Modal>
    </ModalOverlay>
  );
}
