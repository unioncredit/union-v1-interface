import {
  ModalOverlay,
  Text,
  Input,
  Button,
  Divider,
  ButtonRow,
  Heading,
  Box,
  Badge,
} from "union-ui";
import { useModal } from "hooks/useModal";
import { AddressLabel, Modal } from "components-ui";
import { useVouchModal } from "components-ui/modals";
import format from "util/formatValue";
import useIsMember from "hooks/data/useIsMember";
import useBorrowData from "hooks/data/useBorrowData";
import useCreditLimit from "hooks/data/useCreditLimit";
import { useForm } from "react-hook-form";
import useTrustData from "hooks/data/useTrustData";
import useAdjustTrust from "hooks/payables/useAdjustTrust";
import { Dai } from "components-ui/Dai";
import { useWeb3React } from "@web3-react/core";
import handleTxError from "util/handleTxError";
import getReceipt from "util/getReceipt";
import errorMessages from "util/errorMessages";
import { useAddActivity } from "hooks/data/useActivity";
import activityLabels from "util/activityLabels";

export const NEW_VOUCH_MODAL = "new-vouch-modal";

export const useNewVouchModal = () => useModal(NEW_VOUCH_MODAL);

export function NewVouchModal({ address }) {
  const { library } = useWeb3React();
  const { close } = useNewVouchModal();
  const addActivity = useAddActivity();
  const { open: openVouchModal } = useVouchModal();
  const { data: isMember } = useIsMember(address);
  const { mutate: updateTrustData } = useTrustData();
  const { data: borrowData, mutate: updateBorrowData } = useBorrowData(address);
  const { data: creditLimit = 0, mutate: updateCreditLimit } =
    useCreditLimit(address);

  const adjustTrust = useAdjustTrust();

  const { register, errors, handleSubmit, formState, watch } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { isDirty, isSubmitting } = formState;

  const watchAmount = watch("amount");
  const amount = Number(watchAmount || 0);
  const newCreditLimit = amount + creditLimit;

  const handleBack = () => {
    close();
    openVouchModal();
  };

  const { borrowedRounded = 0 } = !!borrowData && borrowData;

  const handleNewVouch = async (data) => {
    try {
      const { hash } = await adjustTrust(address, data.amount);
      await getReceipt(hash, library);
      addActivity(
        activityLabels.newVouch({ address, amount: data.amount, hash })
      );
      await updateTrustData();
      await updateCreditLimit();
      await updateBorrowData();
      close();
    } catch (err) {
      addActivity(
        activityLabels.newVouch({ address, amount: data.amount }, true)
      );
      handleTxError(err);
    }
  };

  return (
    <ModalOverlay>
      <Modal title="New vouch" onClose={close} drawer>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleNewVouch)}>
            <Box mb="26px" justify="space-between">
              <AddressLabel address={address} showAddress />
              {isMember ? (
                <Badge label="Trusted contact" color="green" />
              ) : (
                <Badge label="Not yet a member" color="blue" />
              )}
            </Box>
            <Box>
              <Box direction="vertical">
                <Text>Credit limit</Text>
                <Heading>
                  <Dai value={format(creditLimit)} />
                </Heading>
              </Box>
              <Box direction="vertical" ml="32px">
                <Text>Unpaid Debt</Text>
                <Heading>
                  <Dai value={format(borrowedRounded)} />
                </Heading>
              </Box>
            </Box>
            <Divider />
            <Heading mt="28px" mb="4px">
              Set contacts trust
            </Heading>
            <Text size="large" mb="16px">
              What’s the total value of credit you’d like to make available for
              this contact?
            </Text>
            <Input
              ref={register({
                required: errorMessages.required,
                min: {
                  value: 1.0,
                  message: errorMessages.minValueOnePointZero,
                },
              })}
              suffix="DAI"
              name="amount"
              label="Value"
              placeholder="0"
              error={errors?.amount?.message}
            />
            <Box mt="32px">
              <Box direction="vertical">
                <Text>New credit limit</Text>
                <Heading>
                  <Dai value={format(newCreditLimit)} />
                </Heading>
              </Box>
            </Box>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <ButtonRow mt="16px" fluid>
            <Button
              fluid
              label="Go back"
              variant="secondary"
              disabled={isSubmitting}
              onClick={handleBack}
            />
            <Button
              fluid
              label="Submit vouch"
              disabled={!isDirty}
              loading={isSubmitting}
              onClick={handleSubmit(handleNewVouch)}
            />
          </ButtonRow>
        </Modal.Footer>
      </Modal>
    </ModalOverlay>
  );
}
