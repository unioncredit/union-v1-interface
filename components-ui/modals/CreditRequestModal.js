import { ModalOverlay, Modal, Label, Button, ButtonRow, Text } from "union-ui";
import { useModal } from "hooks/useModal";

export const CREDIT_REQUEST_MODAL = "credit-request-modal";

export const useCreditRequestModal = () => useModal(CREDIT_REQUEST_MODAL);
	
export function CreditRequestModal() {
	const { close } = useCreditRequestModal();
	return (
		<ModalOverlay>
			<Modal title="Credit Request" onClose={close}>
				<Text size="large" align="center" mb="12px">Share your credit request link</Text>
				<Label>https://union.finance/..=0x3535fae254978224</Label>
				<ButtonRow justify="center" mt="12px" fullWidth>
					<Button rounded variant="secondary" label="Copy link" icon="link" />
					<Button rounded label="Twitter" icon="twitter" />
					<Button rounded label="Telegram" icon="telegram" />
				</ButtonRow>
			</Modal>
		</ModalOverlay>
	)
}