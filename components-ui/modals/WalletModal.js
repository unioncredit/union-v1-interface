import {
  ModalOverlay,
  Box,
  Button,
  Divider,
  Text,
  Label,
  Heading,
} from "union-ui";
import { ClaimButton, Modal } from "components-ui";
import { useVoteDelegationModal } from "components-ui/modals";
import { useModal } from "hooks/useModal";
import useTokenBalance from "hooks/data/useTokenBalance";
import useRewardsData from "hooks/data/useRewardsData";
import useUnionSymbol from "hooks/useUnionSymbol";
import useCurrentToken from "hooks/useCurrentToken";
import format from "util/formatValue";
import { commify } from "@ethersproject/units";
import useVotingWalletData from "hooks/governance/useVotingWalletData";
import { useWeb3React } from "@web3-react/core";

export const WALLET_MODAL = "wallet-modal";

export const useWalletModal = () => useModal(WALLET_MODAL);

export function WalletModal() {
  const { account } = useWeb3React();
  const { close } = useWalletModal();

  const UNION = useCurrentToken("UNION");
  const { data: unionSymbol } = useUnionSymbol();
  const { data: rewardsData, mutate: updateRewardsData } = useRewardsData();
  const { open: openVoteDelegationModal } = useVoteDelegationModal();
  const { data: unionBalance = 0.0, mutate: updateUnionBalance } =
    useTokenBalance(UNION);

  const { rewards = 0.0 } = !!rewardsData && rewardsData;

  const { data: votingWalletData } = useVotingWalletData(account);
  const {
    balanceOf = 0,
    currentVotes = 0,
    delegates,
  } = !!votingWalletData && votingWalletData;

  const isDelegatingToSelf = delegates === account;

  const votesDelegated = isDelegatingToSelf
    ? currentVotes - balanceOf
    : currentVotes;

  const onComplete = async () => {
    await updateUnionBalance();
    await updateRewardsData();
  };

  const handleOpenVoteDelegationModal = () => {
    close();
    openVoteDelegationModal();
  };

  return (
    <ModalOverlay>
      <Modal title="Wallet" onClose={close}>
        <Modal.Body>
          <Box align="center" justify="space-between">
            <Text m={0}>Unclaimed Tokens</Text>
            <ClaimButton
              variant="pill"
              onComplete={onComplete}
              label="Claim tokens"
            />
          </Box>
          <Heading m={0}>
            {format(rewards)} {unionSymbol}
          </Heading>
          <Text mt="16px">Wallet balance</Text>
          <Heading m={0}>
            {format(unionBalance)} {unionSymbol}
          </Heading>
          <Divider />
          <Box align="center" justify="space-between" mt="20px">
            <Text mb={0}>Voting Power</Text>
            <Button
              variant="pill"
              onClick={handleOpenVoteDelegationModal}
              label="Voting profile"
            />
          </Box>
          <Heading m={0}>{commify(currentVotes.toFixed(4))} votes</Heading>
          <Label size="small">
            {commify(votesDelegated.toFixed(4))} delegated to you
          </Label>
          <Text mt="16px">Delegating to</Text>
          <Heading m={0}>Self</Heading>
        </Modal.Body>
      </Modal>
    </ModalOverlay>
  );
}
