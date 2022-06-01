import { NotificationStack, Notification, Label } from "@unioncredit/ui";
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
      {toasts.map(({ id, body, type, hash, title }) => {
        const link = hash && getEtherscanLink(chainId, hash, "TRANSACTION");

        const bodyContent = (
          <Label as="p" size="small">
            {body}
          </Label>
        );

        return (
          <Notification
            key={id}
            variant={type}
            onClose={handleClose(id)}
            title={title || defaultTitles[type]}
            link={link}
          >
            <Label as="p" size="small">
              {link ? (
                <a href={link} target="_blank" rel="noreferrer">
                  {bodyContent}
                </a>
              ) : (
                bodyContent
              )}
            </Label>
          </Notification>
        );
      })}
    </NotificationStack>
  );
}
