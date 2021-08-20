import { NotificationStack, Notification, Text, Label } from "union-ui";
import { toastState, removeToast } from "hooks/useToast";
import useIsDrawerOpen from "hooks/useIsDrawerOpen";

const defaultTitles = {
  success: "Transaction successful",
  error: "Transaction error",
  pending: "Waiting for confirmation",
};

export function Notifications() {
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
            {body} {hash && "link"}
          </Label>
        </Notification>
      ))}
    </NotificationStack>
  );
}
