import { Box, Alert } from "@unioncredit/ui";

import { roundUp } from "util/numbers";
import useBorrowData from "hooks/data/useBorrowData";
import { PaymentModal, usePaymentModal } from "components-ui/modals";
import { formatUnits } from "@ethersproject/units";
import format from "util/formatValue";

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

  const interestScaledDown = Number(roundUp(formatUnits(interest)));
  const interestNormalised =
    interestScaledDown < 0.1 ? 0.1 : interestScaledDown;
  const interestView = format(interestNormalised, 2);

  return (
    <>
      <Box w="100%" maxw="445px" mb="24px">
        <Alert
          label={`Overdue payment of ${interestView} DAI`}
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
