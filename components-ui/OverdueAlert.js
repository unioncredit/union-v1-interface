import { Box, Alert } from "union-ui";
import { usePaymentModal } from "components-ui/modals";
import { roundUp } from "util/numbers";
import useBorrowData from "hooks/data/useBorrowData";
import { formatUnits } from "@ethersproject/units";
import { ZERO } from "constants/app";

export function OverdueAlert() {
  const { data: borrowData } = useBorrowData();
  const { open: openPaymentModal } = usePaymentModal();

  const { interest = ZERO, isOverdue = false } = !!borrowData && borrowData;

  if (!isOverdue) {
    return null;
  }

  const interestN = Number(formatUnits(interest, 18));

  return (
    <>
      {" "}
      <Box w="100%" maxw="445px" mb="24px">
        <Alert
          label={`Overdue payment of ${roundUp(interestN)} DAI`}
          action={{ label: "Make payment", onClick: openPaymentModal }}
        />
      </Box>
    </>
  );
}
