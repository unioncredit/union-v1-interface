import {
  Grid,
  Stat,
  Button,
  Text,
  Box,
  Heading,
  Card,
  Badge,
  Label,
  Divider,
} from "@unioncredit/ui";
import { ReactComponent as ExternalInline } from "@unioncredit/ui/lib/icons/externalinline.svg";
import { ReactComponent as External } from "@unioncredit/ui/lib/icons/external.svg";
import { View, Avatar, Copyable, UserVotingHistory } from "components-ui";
import useVouchData from "hooks/data/useVouchData";
import useTrustData from "hooks/data/useTrustData";
import { useWeb3React } from "@web3-react/core";
import usePublicData from "hooks/usePublicData";
import useVotingWalletData from "hooks/governance/useVotingWalletData";
import format from "util/formatValue";
import getReceipt from "util/getReceipt";
import { addActivity } from "hooks/data/useActivity";
import activityLabels from "util/activityLabels";
import isHash from "util/isHash";
import handleTxError from "util/handleTxError";
import useDelegate from "hooks/payables/useDelegate";
import { useVouchModal, VouchModal } from "components-ui/modals";
import truncateAddress from "util/truncateAddress";
import useAddressLabels from "hooks/useAddressLabels";
import getEtherscanLink from "util/getEtherscanLink";
import useChainId from "hooks/useChainId";
import useIsMember from "hooks/data/useIsMember";
import { ReactComponent as Link } from "@unioncredit/ui/lib/icons/link.svg";
import useCopy from "hooks/useCopy";

export default function ProfileView({ address }) {
  const chainId = useChainId();
  const { account, library } = useWeb3React();
  const [isCopied, copy] = useCopy();

  const delegate = useDelegate();
  const { getLabel } = useAddressLabels();
  const { name, ENSName } = usePublicData(address);
  const { data: rawVouchData } = useVouchData(address);
  const { data: rawTrustData } = useTrustData(address);
  const { data: votingWalletData } = useVotingWalletData(address);
  const { data: accountVotingWalletData } = useVotingWalletData(account);
  const { data: isMember } = useIsMember(address);

  const { open: openVouchModal } = useVouchModal();

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

  const vouchData = rawVouchData || [];
  const trustData = rawTrustData || [];

  const vouchedForThem = rawVouchData
    ? vouchData.some((x) => x.address === account)
    : undefined;

  const vouchesForYou = rawTrustData
    ? trustData.some((x) => x.address === account)
    : undefined;

  const label = getLabel(address);

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

  const truncatedAddress = (
    <Copyable value={address}>{truncateAddress(address)}</Copyable>
  );

  const addressEtherscanLink = getEtherscanLink(chainId, address, "ADDRESS");

  const isAccountProfile = account === address;

  return (
    <>
      <View>
        <Grid>
          <Grid.Row justify="center">
            <Grid.Col>
              <Card mt="24px">
                <Card.Body>
                  <Box direction="vertical" align="center">
                    <Avatar size={56} address={address} />
                    <Heading mt="8px" mb={0}>
                      {label && <>{label} &middot;</>} {name}
                    </Heading>
                    <Box mt="8px">
                      {isMember ? (
                        <Badge label="Union Member" color="blue" mr="4px" />
                      ) : (
                        <Badge label="Not a member" color="grey" mr="4px" />
                      )}
                    </Box>
                    <Box mt="8px">
                      <Badge label={truncatedAddress} color="grey" mr="4px" />
                      <a
                        href={addressEtherscanLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <External width="24px" />
                      </a>
                    </Box>
                    {vouchesForYou !== undefined &&
                      vouchedForThem !== undefined && (
                        <>
                          {vouchesForYou && (
                            <Text mt="20px" mb={0} grey={500}>
                              Vouching for you
                            </Text>
                          )}

                          {!vouchedForThem && !isAccountProfile && account && (
                            <Button
                              fluid
                              mt="20px"
                              icon="vouch"
                              onClick={openVouchModal}
                              label={`Vouch for ${name}`}
                            />
                          )}

                          {account === address && !ENSName && (
                            <>
                              <Button
                                as="a"
                                target="_blank"
                                href="https://app.ens.domains/"
                                mt="32px"
                                mb="8px"
                                fluid
                                label={
                                  <>
                                    Get a custom ENS username
                                    <ExternalInline />
                                  </>
                                }
                              />
                            </>
                          )}
                        </>
                      )}

                    <Button
                      fluid
                      mt="20px"
                      variant="secondary"
                      label={isCopied ? "Copied" : "Copy profile link"}
                      onClick={() => copy(window.location.href)}
                      icon={Link}
                    />
                  </Box>
                </Card.Body>
              </Card>
              <Card mt="24px">
                <Card.Body>
                  <Grid>
                    <Grid.Row>
                      <Grid.Col>
                        <Heading m={0}>Reputation</Heading>
                        <Text mt="24px" mb="12px" grey={700}>
                          Wallet traits
                        </Text>
                      </Grid.Col>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Col>
                        <Stat
                          label="receiving vouches from"
                          value={`${vouchData.length} accounts`}
                        />
                      </Grid.Col>
                      <Grid.Col>
                        <Stat
                          label="Vouching for"
                          value={`${trustData.length} accounts`}
                        />
                      </Grid.Col>
                    </Grid.Row>
                  </Grid>
                  <Divider mt="24px" />
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
                        <Stat
                          label="Total Votes"
                          value={format(currentVotes)}
                        />
                      </Grid.Col>
                      <Grid.Col>
                        <Stat label="Union Balance" value={format(balanceOf)} />
                      </Grid.Col>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Col>
                        <Stat
                          mt="16px"
                          label="From others"
                          value={format(votesDelegated)}
                        />
                      </Grid.Col>
                      <Grid.Col>
                        <Stat
                          mt="16px"
                          label="From you"
                          value={
                            accountIsDelegating ? format(accountBalanceOf) : 0
                          }
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
                    {address &&
                      address !== account &&
                      library &&
                      !accountIsDelegating && (
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
                </Card.Body>
              </Card>
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </View>

      <VouchModal />
    </>
  );
}
