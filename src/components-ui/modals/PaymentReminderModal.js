import {
  ModalOverlay,
  ButtonRow,
  Button,
  Box,
  Text,
  Label,
} from "@unioncredit/ui";
import { ReactComponent as Calendar } from "@unioncredit/ui/lib/icons/calendar.svg";
import { Modal } from "components-ui";
import { useModal, useModalOpen } from "hooks/useModal";
import useBorrowData from "hooks/data/useBorrowData";
import { roundUp } from "util/numbers";
import makeUrls from "add-event-to-calendar";
import { useMemo } from "react";

export const PAYMENT_REMINDER_MODAL = "payment-reminder-modal";

export const usePaymentReminderModal = () => useModal(PAYMENT_REMINDER_MODAL);

export const usePaymentReminderModalOpen = () =>
  useModalOpen(PAYMENT_REMINDER_MODAL);

export function PaymentReminderModal() {
  const { close } = usePaymentReminderModal();

  const { data: borrowData } = useBorrowData();

  const { interest = 0, paymentDueDate = "-" } = !!borrowData && borrowData;

  const isOpen = usePaymentReminderModalOpen();

  const date = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date;
  }, []);

  if (!isOpen) return null;

  const calendarData = {
    location: "",
    name: "Union repayment reminder",
    details: "Reminder to repay your loan on https://union.finance",
    startsAt: date,
    endsAt: date,
  };

  const urls = makeUrls(calendarData);

  return (
    <ModalOverlay onClick={close}>
      <Modal onClose={close} title="Payment reminder">
        <Text align="center" mb="24px">
          Save your payment due date to your calendar to avoid entering a
          defaulted state on your loan.
        </Text>
        <Box justify="space-between" mt="24px">
          <Label as="p" size="small" grey={400}>
            First payment amount
          </Label>
          <Label as="p" size="small" grey={400}>
            {roundUp(interest)} DAI
          </Label>
        </Box>
        <Box justify="space-between" mt="4px">
          <Label as="p" size="small" grey={400}>
            First payment due
          </Label>
          <Label as="p" size="small" grey={400}>
            {paymentDueDate}
          </Label>
        </Box>
        <ButtonRow
          align="center"
          justify="center"
          mt="18px"
          direction="vertical"
        >
          <Text mb="16px">
            <Label
              as="a"
              variant="lite"
              download="Union payment reminder"
              target="_blank"
              rel="norefferer"
              href={urls.ics}
              color="blue500"
              fluid
            >
              Download .ICS file
            </Label>
          </Text>
          <Button
            as="a"
            target="_blank"
            rel="norefferer"
            href={urls.google}
            label="Add to Google calendar"
            fluid
            icon={Calendar}
          />
        </ButtonRow>
      </Modal>
    </ModalOverlay>
  );
}
