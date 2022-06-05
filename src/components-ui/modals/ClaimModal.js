import { formatUnits } from "@ethersproject/units";
import { ModalOverlay, Box, Stat, Label, Button } from "@unioncredit/ui";
import { ReactComponent as External } from "@unioncredit/ui/lib/icons/external.svg";

import format from "util/formatValue";
import useToken from "hooks/useToken";
import useUnionSymbol from "hooks/useUnionSymbol";
import useRewardsData from "hooks/data/useRewardsData";
import { useModal, useModalOpen } from "hooks/useModal";
import useTokenBalance from "hooks/data/useTokenBalance";
import { ZERO } from "constants/variables";
import { Modal } from "components-ui";
import { ClaimButton } from "components-ui/ClaimButton";
import { Union } from "components-ui/Union";
import { ClaimModalFooter } from "./ClaimModalFooter";

export const CLAIM_MODAL = "claim-modal";

export const useClaimModal = () => useModal(CLAIM_MODAL);

export const useClaimModalOpen = () => useModalOpen(CLAIM_MODAL);

export function ClaimModal() {
  const { close } = useClaimModal();

  const UNION = useToken("UNION");

  const { data: unionSymbol } = useUnionSymbol();
  const { data: rewardsData } = useRewardsData();
  const { data: unionBalance = ZERO } = useTokenBalance(UNION);

  const isOpen = useClaimModalOpen();

  if (!isOpen) return null;

  const { rewards = ZERO } = !!rewardsData && rewardsData;

  const balance = rewards.add(unionBalance);

  const rewardsView = format(formatUnits(rewards), 4);
  const balanceView = format(formatUnits(balance), 4);
  const unionBalanceView = format(formatUnits(unionBalance), 4);

  return (
    <ModalOverlay onClick={close}>
      <Modal
        title="Claim"
        onClose={close}
        size="medium"
        footer={<ClaimModalFooter />}
      >
        <Box justify="center">
          <Stat
            align="center"
            size="large"
            label={`Unclaimed ${unionSymbol}`}
            value={<Union value={balanceView} />}
          />
        </Box>
        <Box justify="space-between" mt="8px">
          <Label as="p" grey={400}>
            Wallet
          </Label>
          <Label as="p" grey={400} m={0}>
            <Union value={unionBalanceView} />
          </Label>
        </Box>
        <Box justify="space-between" mb="18px">
          <Label as="p" grey={400}>
            Unclaimed
          </Label>
          <Label as="p" grey={400} m={0}>
            <Union value={rewardsView} />
          </Label>
        </Box>
        <ClaimButton
          m={0}
          fluid
          label={`Claim ${rewardsView} ${unionSymbol}`}
        />
        <Button
          fluid
          as="a"
          mt="4px"
          variant="secondary"
          icon={External}
          href="/governance"
          target="_blank"
          label="Union Governance"
        />
      </Modal>
    </ModalOverlay>
  );
}
