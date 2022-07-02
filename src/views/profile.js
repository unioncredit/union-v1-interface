import {
  Grid,
  Stat,
  Button,
  Text,
  Box,
  Heading,
  Card,
  Badge,
  Divider,
} from "@unioncredit/ui";
import { useWeb3React } from "@web3-react/core";
import { ReactComponent as ExternalInline } from "@unioncredit/ui/lib/icons/externalinline.svg";
import { ReactComponent as External } from "@unioncredit/ui/lib/icons/external.svg";
import { ReactComponent as Link } from "@unioncredit/ui/lib/icons/link.svg";

import truncateAddress from "util/truncateAddress";
import getEtherscanLink from "util/getEtherscanLink";
import useCopy from "hooks/useCopy";
import useChainId from "hooks/useChainId";
import usePublicData from "hooks/usePublicData";
import useIsMember from "hooks/data/useIsMember";
import useVouchData from "hooks/data/useVouchData";
import useTrustData from "hooks/data/useTrustData";
import useAddressLabels from "hooks/useAddressLabels";
import { useVouchModal, VouchModal } from "components-ui/modals";
import { LoadingOverlay } from "components-ui/LoadingOverlay";
import { View, Avatar, Copyable } from "components-ui";
import ProfileGovernance from "components-ui/ProfileGovernance";

export default function ProfileView({ address }) {
  const chainId = useChainId();
  const { account } = useWeb3React();
  const [isCopied, copy] = useCopy();

  const { getLabel } = useAddressLabels();
  const { name, ENSName } = usePublicData(address);
  const { data: rawVouchData } = useVouchData(address);
  const { data: rawTrustData } = useTrustData(address);
  const { data: isMember } = useIsMember(address);

  const { open: openVouchModal } = useVouchModal();

  const vouchData = rawVouchData || [];
  const trustData = rawTrustData || [];

  const vouchedForThem = rawVouchData
    ? vouchData.some((x) => x.address === account)
    : undefined;

  const vouchesForYou = rawTrustData
    ? trustData.some((x) => x.address === account)
    : undefined;

  const label = getLabel(address);

  const truncatedAddress = (
    <Copyable value={address}>{truncateAddress(address)}</Copyable>
  );

  const addressEtherscanLink = getEtherscanLink(chainId, address, "ADDRESS");

  const isLoading = !rawTrustData || !rawVouchData;

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
                    {vouchesForYou && (
                      <Text mt="20px" mb={0} grey={500}>
                        Vouching for you
                      </Text>
                    )}

                    {vouchedForThem === false && (
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

                    {isLoading && (
                      <Button fluid mt="20px" loading={true} label="" />
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
                {isLoading && <LoadingOverlay />}
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
                  <ProfileGovernance />
                </Card.Body>
              </Card>
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </View>

      <VouchModal address={address} />
    </>
  );
}
