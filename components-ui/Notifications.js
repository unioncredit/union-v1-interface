import { NotificationStack, Notification, Text, Label, Icon } from "union-ui";
import { toastState, removeToast } from "hooks/useToast";
import useIsDrawerOpen from "hooks/useIsDrawerOpen";
import useChainId from "hooks/useChainId";
import getEtherscanLink from "util/getEtherscanLink";

const defaultTitles = {
  success: "Transaction successful",
  error: "Transaction error",
  pending: "Waiting for confirmation",
};

export function Notifications() {
  const chainId = useChainId();
  const toasts = toastState.useValue();
  const isDrawerOpen = useIsDrawerOpen();

  if (toasts.length <= 0) return null;

  const handleClose = (id) => () => {
    removeToast(id);
  };

  const style = isDrawerOpen
    ? { right: "400px", transition: "all 500ms" }
    : undefined;

  return (
    <NotificationStack style={style}>
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
