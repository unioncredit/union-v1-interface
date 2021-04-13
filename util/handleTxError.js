import { addToast, FLAVORS } from "hooks/useToast";
import isHash from "./isHash";

export default function handleTxError(error) {
  let message = "Something went wrong";

  if (error?.message === "User rejected request" || error?.code === 4001)
    message = "Rejected transaction signature";

  if (error?.code === -3200 || error?.code === -32603)
    message = "Internal transaction error";

  if (error?.code === -32602) message = "Invalid transaction parameters";

  if (isHash(error.message)) {
    addToast(FLAVORS.TX_ERROR(message, error.message));
  } else {
    addToast(FLAVORS.TX_ERROR(message));
  }
}
