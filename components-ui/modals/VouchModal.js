import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { ModalOverlay, Modal, Text, Input, Button, Divider } from "union-ui";
import { useModal } from "hooks/useModal";
import { useNewVouchModal } from "components-ui/modals";
import validateAddress from "util/validateAddress";
import { useWeb3React } from "@web3-react/core";
import errorMessages from "util/errorMessages";

export const VOUCH_MODAL = "vouch-modal";

export const useVouchModal = () => useModal(VOUCH_MODAL);

export function VouchModal({ onNext }) {
  const { account } = useWeb3React();
  const { close } = useVouchModal();
  const { open: openNewVouchModal } = useNewVouchModal();

  const { handleSubmit, register, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleNext = (values) => {
    close();
    openNewVouchModal();
    onNext && onNext(values.address);
  };

  const validate = (address) => {
    if (address === account) return errorMessages.notVouchSelf;
    return validateAddress(address);
  };

  return (
    <ModalOverlay>
      <Modal title="Vouch for someone" onClose={close} drawer>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleNext)}>
            <Text size="large" mb="16px">
              Tap in or paste the Ethereum address for a contact you want to
              vouch for.
            </Text>
            <Input
              ref={register({ validate })}
              name="address"
              label="Ethereum address"
              placeholder="0x..."
              error={errors.address?.message}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            mt="16px"
            fluid
            label="Next"
            onClick={handleSubmit(handleNext)}
          />
        </Modal.Footer>
      </Modal>
    </ModalOverlay>
  );
}

VouchModal.propTypes = {
  onNext: PropTypes.func.isRequired,
};
