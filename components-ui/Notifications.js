import { NotificationStack, Notification, Text, Label, Icon } from "union-ui";
import { toastState, removeToast } from "hooks/useToast";
import getEtherscanLink from "util/getEtherscanLink";
import { useWeb3React } from "@web3-react/core";

const defaultTitles = {
  success: "Transaction successful",
  error: "Transaction error",
  pending: "Waiting for confirmation",
};

export function Notifications() {
  const { chainId } = useWeb3React();
  const toasts = toastState.useValue();

  if (toasts.length <= 0) return null;

  const handleClose = (id) => () => {
    removeToast(id);
  };

  return (
    <NotificationStack>
      {toasts.map(({ id, body, type, hash, title }) => (
        <Notification key={id} variant={type} onClose={handleClose(id)}>
          <Text>{title || defaultTitles[type]}</Text>
          <Label as="p" size="small">
            {hash ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={getEtherscanLink(chainId, hash, "TRANSACTION")}
              >
                View transaction <Icon name="external" />
              </a>
            ) : (
              body
            )}
          </Label>
        </Notification>
      ))}
    </NotificationStack>
  );
}
