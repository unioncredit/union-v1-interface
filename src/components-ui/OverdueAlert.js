import { Box, Alert } from "@unioncredit/ui";

import { roundUp } from "util/numbers";
import useBorrowData from "hooks/data/useBorrowData";
import { PaymentModal, usePaymentModal } from "components-ui/modals";

export function OverdueAlert() {
  const { data: borrowData, mutate: updateBorrowData } = useBorrowData();
  const { open: openPaymentModal } = usePaymentModal();

  const {
    borrowedRounded = 0,
    interest = 0,
    paymentDueDate = "-",
    isOverdue = false,
  } = !!borrowData && borrowData;

  const onComplete = async () => {
    await updateBorrowData();
  };

  if (!isOverdue) {
    return null;
  }

  return (
    <>
      {" "}
      <Box w="100%" maxw="445px" mb="24px">
        <Alert
          label={`Overdue payment of ${roundUp(interest)} DAI`}
          action={{ label: "Make payment", onClick: openPaymentModal }}
        />
      </Box>
      <PaymentModal
        {...{
          paymentDueDate,
          balanceOwed: borrowedRounded,
          interest,
          onComplete,
        }}
      />
    </>
  );
}
