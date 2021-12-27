import { ModalOverlay, Box, Input, Button, Alert } from "union-ui";
import Info from "union-ui/lib/icons/wireInfo.svg";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useModal } from "hooks/useModal";
import { Modal } from "components-ui";
import validateAddress from "util/validateAddress";
import { useWeb3React } from "@web3-react/core";
import errorMessages from "util/errorMessages";
import { useRouter } from "next/router";
import { Dai, MiniProfileCard } from "components-ui";
import { useAddActivity } from "hooks/data/useActivity";
import useTrustData from "hooks/data/useTrustData";
import useAdjustTrust from "hooks/payables/useAdjustTrust";
import getReceipt from "util/getReceipt";
import isHash from "util/isHash";
import handleTxError from "util/handleTxError";
import activityLabels from "util/activityLabels";
import { isAddress } from "@ethersproject/address";
import truncateAddress from "util/truncateAddress";
import useAddressLabels from "hooks/useAddressLabels";

export const VOUCH_MODAL = "vouch-modal";

export const useVouchModal = () => useModal(VOUCH_MODAL);

export function VouchModal() {
  const { query } = useRouter();
  const { account, library } = useWeb3React();
  const { close } = useVouchModal();
  const addActivity = useAddActivity();
  const { data: trustData, mutate: updateTrustData } = useTrustData();
  const { setLabel } = useAddressLabels();

  const adjustTrust = useAdjustTrust();

  const { formState, handleSubmit, register, errors, watch } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { isDirty, isSubmitting } = formState;

  const watchAddress = watch("address");
  const address = isAddress(watchAddress) && watchAddress;

  const handleNewVouch = async (data) => {
    try {
      const { hash } = await adjustTrust(data.address, data.amount);
      setLabel(data.address, data.alias);
      await getReceipt(hash, library, {
        pending: `Vouching ${data.amount} DAI for ${truncateAddress(
          data.address
        )}`,
        success: `Vouched ${data.amount} DAI for ${truncateAddress(
          data.address
        )}`,
      });
      addActivity(
        activityLabels.newVouch({
          address: data.address,
          amount: data.amount,
          hash,
        })
      );
      await updateTrustData();
      close();
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      addActivity(
        activityLabels.newVouch(
          { address: data.address, amount: data.amount, hash },
          true
        )
      );
      handleTxError(err, `Failed to vouch ${data.amount} DAI`);
    }
  };

  const validateAddressInput = (address) => {
    if (address === account) return errorMessages.notVouchSelf;
    return validateAddress(address);
  };

  const maxTrust = 25;

  const maxTrustData = trustData?.length >= maxTrust;

  return (
    <ModalOverlay onClick={close}>
      <Modal title="New vouch" onClose={close}>
        <MiniProfileCard address={address} />
        <form onSubmit={handleSubmit(handleNewVouch)}>
          <Input
            ref={register({ validate: validateAddressInput })}
            name="address"
            defaultValue={query?.address}
            label="Address"
            placeholder="e.g. 0xA1e3..."
            disabled={maxTrustData}
            error={errors.address?.message}
          />
          <Box mt="16px">
            <Input
              ref={register}
              name="alias"
              label="Alias"
              disabled={maxTrustData}
              placeholder="e.g. Halkyone Olga"
            />
          </Box>
          <Box mt="16px">
            <Input
              ref={register({
                required: errorMessages.required,
                min: {
                  value: 1.0,
                  message: errorMessages.minValueOnePointZero,
                },
              })}
              suffix={<Dai />}
              name="amount"
              type="number"
              label="Trust amount"
              placeholder="0.0"
              disabled={maxTrustData}
              error={errors?.amount?.message}
            />
          </Box>
          <Box mt="32px" direction="vertical">
            {maxTrustData && (
              <Alert
                packed
                size="small"
                label={`You have reached the max trust limit of ${trustData?.length} vouches`}
                icon={<Info />}
              />
            )}
            <Button
              fluid
              mt="8px"
              type="submit"
              loading={isSubmitting}
              disabled={!isDirty || maxTrustData}
              label="Confirm vouch"
            />
          </Box>
        </form>
      </Modal>
    </ModalOverlay>
  );
}

VouchModal.propTypes = {
  onNext: PropTypes.func.isRequired,
};
