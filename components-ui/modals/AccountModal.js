import {
  ModalOverlay,
  Label,
  Heading,
  Box,
  Button,
  Text,
  Divider,
  StatusIcon,
} from "union-ui";
import { Modal } from "components-ui";
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
  const { account, connector, deactivate } = useWeb3React();
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
          <Box align="center" justify="space-between">
            <Text mb="9px">Wallet Connect</Text>
            <Button variant="pill" onClick={handleSignOut} label="Disconnect" />
          </Box>
          <Heading mt="4px">{name}</Heading>
          <Label size="small" grey={600}>
            {truncateAddress(account)}
          </Label>
          <Divider />
          <Box align="center" justify="space-between" mt="20px" mb="16px">
            <Text m={0} size="large">
              Activity
            </Text>
            <Button variant="pill" label="clear" onClick={clearActivity} />
          </Box>
          {isEmpty ? (
            <Text>No activity</Text>
          ) : (
            activity.map(({ amount, label, hash, failed }) => {
              if (amount && label) {
                const daiValue = (
                  <>
                    {label} <Dai value={amount} />
                  </>
                );

                return (
                  <Box align="center" justify="space-between" mt="10px">
                    <div>
                      <Text color={failed && "orange"}>
                        {hash ? (
                          <a
                            target="_blank"
                            href={getEtherscanLink(
                              chainId,
                              hash,
                              "TRANSACTION"
                            )}
                          >
                            {daiValue}
                          </a>
                        ) : (
                          daiValue
                        )}
                      </Text>
                    </div>
                    <StatusIcon
                      variant="wire"
                      name={failed ? "error" : "success"}
                    />
                  </Box>
                );
              }
              return label;
            })
          )}
        </Modal.Body>
      </Modal>
    </ModalOverlay>
  );
}
