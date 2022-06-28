import { useParams } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { Grid, Stat, Button, Heading, Label } from "@unioncredit/ui";

import isHash from "util/isHash";
import format from "util/formatValue";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import activityLabels from "util/activityLabels";
import { addActivity } from "hooks/data/useActivity";
import useDelegate from "hooks/payables/useDelegate";
import useVotingWalletData from "hooks/governance/useVotingWalletData";
import { UserVotingHistory } from "components-ui";
import usePublicData from "hooks/usePublicData";
import { withUnsupportedChains } from "providers/UnsupportedChain";
import useChainId from "hooks/useChainId";

function ProfileGovernance() {
  const chainId = useChainId();
  const { account, address } = useParams();
  const { library, chainId: actualChainId } = useWeb3React();
  const delegate = useDelegate();

  const { name } = usePublicData(address);
  const { data: votingWalletData } = useVotingWalletData(address);
  const { data: accountVotingWalletData } = useVotingWalletData(account);

  const unsupportedFeature = actualChainId && actualChainId !== chainId;

  if (unsupportedFeature) return null;

  const {
    balanceOf = 0,
    currentVotes = 0,
    delegates,
  } = !!votingWalletData && votingWalletData;

  const isDelegatingToSelf = delegates === address;

  const { balanceOf: accountBalanceOf = 0, delegates: accountDelegates } =
    !!accountVotingWalletData && accountVotingWalletData;

  const accountIsDelegating = accountDelegates === address;

  const votesDelegated = isDelegatingToSelf
    ? currentVotes - balanceOf
    : currentVotes;

  const handleDelegation = async () => {
    try {
      const { hash } = await delegate(address);
      await getReceipt(hash, library);
      addActivity(activityLabels.delegate({ address, hash }));
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      handleTxError(err);
      addActivity(activityLabels.delegate({ address, hash }, true));
    }
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Col>
          <Heading mt="24px" mb="24px">
            Governance
          </Heading>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col>
          <Stat label="Total Votes" value={format(currentVotes)} />
        </Grid.Col>
        <Grid.Col>
          <Stat label="Union Balance" value={format(balanceOf)} />
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col>
          <Stat mt="16px" label="From others" value={format(votesDelegated)} />
        </Grid.Col>
        <Grid.Col>
          <Stat
            mt="16px"
            label="From you"
            value={accountIsDelegating ? format(accountBalanceOf) : 0}
          />
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col>
          <Label
            size="small"
            weight="medium"
            as="p"
            mt="24px"
            mb="16px"
            grey={400}
          >
            VOTING HISTORY
          </Label>
          <UserVotingHistory address={address} />
        </Grid.Col>
      </Grid.Row>
      {address && address !== account && library && !accountIsDelegating && (
        <Grid.Row>
          <Grid.Col>
            <Button
              mt="24px"
              variant="secondary"
              label={`Delegate votes to ${name}`}
              onClick={handleDelegation}
            />
          </Grid.Col>
        </Grid.Row>
      )}
    </Grid>
  );
}

export default withUnsupportedChains(ProfileGovernance, [421611, 42161]);
