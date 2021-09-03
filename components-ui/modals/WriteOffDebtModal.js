import {
  ButtonRow,
  Divider,
  Button,
  ModalOverlay,
  Input,
  Heading,
  Text,
  Box,
  Badge,
} from "union-ui";
import { useModal } from "hooks/useModal";
import { useManageContactModal } from "components-ui/modals";
import { AddressLabel, Dai, Modal } from "components-ui";
import format from "util/formatValue";
import errorMessages from "util/errorMessages";
import { useForm } from "react-hook-form";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import useTrustData from "hooks/data/useTrustData";
import { useWeb3React } from "@web3-react/core";
import { useAddActivity } from "hooks/data/useActivity";
import activityLabels from "util/activityLabels";
import useWriteOffDebt from "hooks/payables/useWriteOffDebt";
import isHash from "util/isHash";

export const WRITE_OFF_DEBT = "write-off-debt-modal";

export const useWriteOffDebtModal = () => useModal(WRITE_OFF_DEBT);

export function WriteOffDebtModal({ address, used, vouched, isOverdue }) {
  const addActivity = useAddActivity();
  const { library } = useWeb3React();
  const { close } = useWriteOffDebtModal();
  const { mutate: updateTrustData } = useTrustData();
  const { open: openManageContactModal } = useManageContactModal();
  const writeOffDebt = useWriteOffDebt();

  const { register, formState, errors, handleSubmit } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { isDirty, isSubmitting } = formState;

  const validate = (val) => {
    if (!isOverdue) return errorMessages.notOverDue;
    if (Number(val) >= used) return errorMessages.maxWriteOff;
    if (Number(val) <= 0) return errorMessages.minValueZero;
    if (!val) return errorMessages.required;

    return true;
  };

  const handleGoBack = () => {
    close();
    openManageContactModal();
  };

  const handleWriteOffDebt = async (values) => {
    try {
      const { hash } = await writeOffDebt(address, values.amount);
      await getReceipt(hash, library);
      addActivity(
        activityLabels.writeOffDebt({ address, amount: values.amount, hash })
      );
      await updateTrustData();
      handleGoBack();
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      addActivity(
        activityLabels.writeOffDebt(
          { address, amount: values.amount, hash },
          true
        )
      );
      handleTxError(err);
    }
  };

  return (
    <ModalOverlay>
      <Modal title="Change credit limit" onClose={close} drawer>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleWriteOffDebt)}>
            <Box mb="24px" justify="space-between">
              <AddressLabel address={address} />
              <Badge label="Trusted contact" color="green" />
            </Box>
            <Box>
              <Box direction="vertical">
                <Text>Credit limit</Text>
                <Heading>
                  <Dai value={format(vouched)} />
                </Heading>
              </Box>
              <Box direction="vertical" ml="32px">
                <Text>Unpaid Debt</Text>
                <Heading>
                  <Dai value={format(used)} />
                </Heading>
              </Box>
            </Box>
            <Divider />
            <Heading mt="28px" mb="4px">
              Write-off debt
            </Heading>
            <Text mb="16px" size="large">
              Permanently write-off this contacts debt and discard locked funds.
            </Text>
            <Input
              type="number"
              ref={register({ validate })}
              name="amount"
              label="Value"
              suffix="DAI"
              error={errors.amount?.message}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <ButtonRow mt="20px" fluid>
            <Button
              fluid
              fontSize="large"
              label="Go back"
              icon="arrow-left"
              variant="secondary"
              onClick={handleGoBack}
            />
            <Button
              fluid
              label="Save"
              fontSize="large"
              disabled={!isDirty}
              loading={isSubmitting}
              onClick={handleSubmit(handleWriteOffDebt)}
            />
          </ButtonRow>
        </Modal.Footer>
      </Modal>
    </ModalOverlay>
  );
}
