import {
  Label,
  Stat,
  Grid,
  Button,
  ModalOverlay,
  Input,
  Box,
} from "@unioncredit/ui";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";

import { useModal, useModalOpen } from "hooks/useModal";
import { useManageContactModal } from "components-ui/modals";
import { Dai, Modal } from "components-ui";
import format from "util/formatValue";
import errorMessages from "util/errorMessages";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import useTrustData from "hooks/data/useTrustData";
import { useAddActivity } from "hooks/data/useActivity";
import activityLabels from "util/activityLabels";
import useWriteOffDebt from "hooks/payables/useWriteOffDebt";
import isHash from "util/isHash";

export const WRITE_OFF_DEBT = "write-off-debt-modal";

export const useWriteOffDebtModal = () => useModal(WRITE_OFF_DEBT);

export const useWriteOffDebtModalOpen = () => useModalOpen(WRITE_OFF_DEBT);

export function WriteOffDebtModal({ address, used, vouched, isOverdue }) {
  const addActivity = useAddActivity();
  const writeOffDebt = useWriteOffDebt();

  const { library } = useWeb3React();
  const { close } = useWriteOffDebtModal();
  const { mutate: updateTrustData } = useTrustData();
  const { open: openManageContactModal } = useManageContactModal();

  const { register, watch, formState, setValue, handleSubmit } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const isOpen = useWriteOffDebtModalOpen();

  if (!isOpen) return null;

  const { isDirty, isSubmitting, errors } = formState;

  const watchAmount = watch("amount");
  const amount = Number(watchAmount || 0);
  const usedView = format(formatUnits(used), 2);

  const validate = (val) => {
    if (!val) return errorMessages.required;
    if (!isOverdue) return errorMessages.notOverDue;

    const bnValue = parseUnits(val);
    if (bnValue.gt(used)) return errorMessages.maxWriteOff;
    if (bnValue.lte(0)) return errorMessages.minValueZero;

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

  const handleWriteOffMax = () => {
    setValue("amount", usedView, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <ModalOverlay onClick={close}>
      <Modal
        title="Write-off debt"
        onClose={close}
        onBack={handleGoBack}
        size="medium"
      >
        <form onSubmit={handleSubmit(handleWriteOffDebt)}>
          <Grid>
            <Grid.Row>
              <Grid.Col>
                <Stat
                  size="medium"
                  align="center"
                  label="Vouch"
                  value={<Dai value={format(formatUnits(vouched), 2)} />}
                />
              </Grid.Col>
              <Grid.Col>
                <Stat
                  size="medium"
                  align="center"
                  label="Unpaid debt"
                  value={<Dai value={usedView} />}
                />
              </Grid.Col>
            </Grid.Row>
          </Grid>
          <Input
            type="number"
            label="Value"
            suffix={<Dai />}
            caption={`Write off max. ${usedView} DAI`}
            error={errors.amount?.message}
            onCaptionClick={handleWriteOffMax}
            {...register("amount", { validate })}
          />
          <Box justify="space-between" mt="16px">
            <Label as="p" size="small" m={0}>
              New balance owed
            </Label>
            <Label as="p" size="small" m={0}>
              {Number(formatUnits(used)) - amount}
            </Label>
          </Box>
          <Label align="center" as="p" size="small" color="red500" mt="16px">
            When you write-off debt, your locked funds are consumed, this action
            cannot be undone.
          </Label>
          <Button
            fluid
            label="Write-off debt"
            type="submit"
            loading={isSubmitting}
            disabled={!isDirty}
          />
        </form>
      </Modal>
    </ModalOverlay>
  );
}
