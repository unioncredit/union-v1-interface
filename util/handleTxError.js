import { addToast, FLAVORS } from "hooks/useToast";
import isHash from "./isHash";

export default function handleTxError(error) {
  console.error(error);

  let message = "Something went wrong";

  switch (error?.code) {
    case 4001:
      message = "Rejected transaction signature";
      break;
    case -3200:
    case -32603:
      message = "Internal transaction error";
      break;
    case -32602:
      message = "Invalid transaction parameters";
      break;
    default:
      break;
  }

  if (isHash(error.message)) {
    addToast(FLAVORS.TX_ERROR(message, error.message));
  } else {
    addToast(FLAVORS.TX_ERROR(message));
  }
}
