import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { ModalOverlay, Modal, Text, Input, Button, Divider } from "union-ui";
import { useModal } from "hooks/useModal";
import { useNewVouchModal } from "components-ui/modals";
import validateAddress from "util/validateAddress";

export const VOUCH_MODAL = "vouch-modal";

export const useVouchModal = () => useModal(VOUCH_MODAL);

export function VouchModal({ onNext }) {
  const { close } = useVouchModal();
  const { open: openNewVouchModal } = useNewVouchModal();

  const { handleSubmit, watch, register, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleNext = (values) => {
    close();
    openNewVouchModal();
    onNext && onNext(values.address);
  };

  const validate = (address) => {
    return validateAddress(address);
  };

  console.log({ errors });

  return (
    <ModalOverlay>
      <Modal title="Vouch for someone" onClose={close}>
        <Text size="large" mb="16px">
          Tap in or paste the Ethereum address for a contact you want to vouch
          for.
        </Text>
        <form onSubmit={handleSubmit(handleNext)}>
          <Input
            ref={register({ validate })}
            name="address"
            label="Ethereum address"
            placeholder="0x..."
            error={errors.address?.message}
          />
          <Divider />
          <Button type="submit" mt="16px" fluid label="Next" />
        </form>
      </Modal>
    </ModalOverlay>
  );
}

VouchModal.propTypes = {
  onNext: PropTypes.func.isRequired,
};
