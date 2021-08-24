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
import { walletconnect } from "lib/connectors";
import useToast, { FLAVORS } from "hooks/useToast";
import { logout } from "lib/auth";
import truncateAddress from "util/truncateAddress";
import useActivity, { clearActivity } from "hooks/data/useActivity";
import { Dai } from "components-ui/Dai";
import getEtherscanLink from "util/getEtherscanLink";

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

  return (
    <ModalOverlay>
      <Modal title="Account" onClose={close}>
        <Modal.Body>
          <Box mb="20px">
            <NetworkSelect />
          </Box>
          <Box align="center" justify="space-between">
            <Text mb="9px">Connected</Text>
            <Button variant="pill" onClick={handleSignOut} label="Disconnect" />
          </Box>
          <Heading mt="4px">{name}</Heading>
          <Label size="small" grey={600}>
            {truncateAddress(account)}
          </Label>
          <Divider />
          <Box align="center" justify="space-between" mt="20px" mb="16px">
            <Text m={0} size="large" grey={700}>
              Activity
            </Text>
            <Button variant="pill" label="clear" onClick={clearActivity} />
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
                <Box align="center" justify="space-between" mt="8px">
                  <div>
                    <Text color={failed && "orange"} m={0}>
                      {hash ? (
                        <a
                          target="_blank"
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
