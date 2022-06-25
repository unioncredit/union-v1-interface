import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { ModalOverlay, Label, Box, Button, Text } from "@unioncredit/ui";
import { ReactComponent as Failed } from "@unioncredit/ui/lib/icons/failed.svg";
import { ReactComponent as Success } from "@unioncredit/ui/lib/icons/success.svg";
import { ReactComponent as ExternalInline } from "@unioncredit/ui/lib/icons/externalinline.svg";

import { logout } from "lib/auth";
import format from "util/formatValue";
import { Modal, Dai } from "components-ui";
import getEtherscanLink from "util/getEtherscanLink";
import { useModal, useModalOpen } from "hooks/useModal";
import { walletconnect, injected } from "lib/connectors";
import { MiniProfileCard } from "components-ui/MiniProfileCard";
import useActivity, { useClearActivity } from "hooks/data/useActivity";

export const ACCOUNT_MODAL = "account-modal";

export const useAccountModal = () => useModal(ACCOUNT_MODAL);

export const useAccountModalOpen = () => useModalOpen(ACCOUNT_MODAL);

export function AccountModal() {
  const { chainId, account, connector, deactivate } = useWeb3React();
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

  return (
    <ModalOverlay onClick={close}>
      <Modal title="Account" onClose={close}>
        <Box align="center" justify="space-between" mb="20px">
          <Label as="p" size="small" grey={400}>
            Connected with {walletName}
          </Label>
          <Button variant="pill" onClick={handleSignOut} label="Disconnect" />
        </Box>
        <MiniProfileCard address={account} onClick={close} />
        <Box align="center" justify="space-between" mt="20px" mb="12px">
          <Label as="p" size="small" mb="8px" grey={400}>
            ACTIVITY
          </Label>
          <Button
            variant="pill"
            label="Clear Activity"
            onClick={clearActivity}
          />
        </Box>
        <Box mb="24px" direction="vertical" fluid>
          {isEmpty ? (
            <Text>No activity</Text>
          ) : (
            activity.map(({ amount, label, hash, failed }, i) => {
              const scaledAmount =
                amount?.type == "BigNumber"
                  ? BigNumber.from(amount.hex)
                  : parseUnits(amount.toString());

              return (
                <Box
                  key={`${hash}-${label}-${i}`}
                  align="center"
                  justify="space-between"
                  mt="8px"
                  fluid
                >
                  <Box align="center">
                    <Text
                      m={0}
                      as="a"
                      target="_blank"
                      rel="noreferrer"
                      color={failed && "red600"}
                      href={getEtherscanLink(chainId, hash, "TRANSACTION")}
                    >
                      {label}{" "}
                      {amount && (
                        <Dai value={format(formatUnits(scaledAmount), 2)} />
                      )}
                    </Text>
                    <ExternalInline width="24px" />
                  </Box>
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
