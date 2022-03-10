import {
  Text,
  Grid,
  Row,
  Col,
  Box,
  Button,
  Heading,
  Label,
  Skeleton,
  Alert,
} from "union-ui";
import Link from "next/link";
import { Fragment } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { useWeb3React } from "@web3-react/core";
import ArrowRight from "union-ui/lib/icons/arrowRight.svg";
import Info from "union-ui/lib/icons/wireInfo.svg";

import {
  VotingCard,
  View,
  AddressLabel,
  ProposalHistoryCard,
} from "components-ui";
import useProposalData from "hooks/governance/useProposalData";
import { defaultAbiCoder } from "@ethersproject/abi";

import createArray from "util/createArray";
import getEtherscanLink from "util/getEtherscanLink";
import useChainId from "hooks/useChainId";
import { withUnsupportedChains } from "providers/UnsupportedChain";

import styles from "./proposal.module.css";

function ProposalView() {
  const chainId = useChainId();
  const { chainId: actualChainId } = useWeb3React();

  const { query } = useRouter();

  const { id } = query;

  const data = useProposalData(id);

  const {
    description = "-",
    title = "-",
    proposer,
    forCount = 0,
    againstCount = 0,
    status,
    blockNumber,
    pid,
    hash,
    endTimestamp,
    startTimestamp,
    targets = [],
    signatures = [],
    calldatas = [],
  } = !!data && data;

  const isLoading = !data;

  const unsupportedFeature = actualChainId && actualChainId !== chainId;

  return (
    <>
      {unsupportedFeature && (
        <Alert
          icon={<Info />}
          packed
          mb="16px"
          size="small"
          variant="info"
          label="Governance is not supported on this chain. Showing governance data from mainnet"
        />
      )}
      <View>
        <Grid>
          <Row>
            <Col>
              <Box mb="30px">
                <Link href="/governance/proposals">
                  <Button
                    variant="lite"
                    label={
                      <>
                        <ArrowRight
                          className="flip"
                          width="24px"
                          height="24px"
                        />
                        Back to proposals
                      </>
                    }
                  />
                </Link>
              </Box>
            </Col>
          </Row>
          <Row>
            <Col md={8} className={styles.contentCol}>
              {isLoading ? (
                <Skeleton height={20} width={280} mb="16px" shimmer />
              ) : (
                <Heading size="xlarge" mb="12px" grey={800}>
                  {title}
                </Heading>
              )}
              {isLoading ? (
                <>
                  <Skeleton height={16} width={220} shimmer mb="8px" />
                  <Skeleton height={16} width={220} shimmer mb="8px" />
                </>
              ) : (
                <>
                  <Label as="p" size="small" grey={400}>
                    PROPOSED BY
                  </Label>
                  {proposer ? <AddressLabel address={proposer} /> : "-"}
                </>
              )}
              <Box mt="16px">
                <a
                  href={getEtherscanLink(chainId, hash, "TRANSACTION")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="pill" label="View bytecode" />
                </a>
              </Box>
              <Box direction="vertical" mt="24px">
                <Heading level={3}>Description</Heading>
                {isLoading ? (
                  createArray(3).map((_, i) => (
                    <Skeleton
                      key={i}
                      height={16}
                      width={320}
                      shimmer
                      mb="8px"
                    />
                  ))
                ) : (
                  <ReactMarkdown
                    renderers={{
                      link: (props) => (
                        <Link href={props.href}>
                          <Text as="a" {...props} color="blue600" />
                        </Link>
                      ),
                      heading: (props) => (
                        <Text
                          size="large"
                          grey={800}
                          {...props}
                          mb="8px"
                          mt="24px"
                        />
                      ),
                      paragraph: (props) => <Text {...props} mb="8px" />,
                      listItem: (props) => <Text as="li" {...props} />,
                    }}
                  >
                    {description}
                  </ReactMarkdown>
                )}
              </Box>

              <Box direction="vertical" mt="24px" mb="24px">
                <Heading level={3}>Details</Heading>
                {isLoading
                  ? createArray(3).map((_, i) => (
                      <Skeleton
                        key={i}
                        height={16}
                        width={320}
                        shimmer
                        mb="8px"
                      />
                    ))
                  : targets.map((target, i) => {
                      const signature = signatures[i];
                      const calldata = calldatas[i];
                      const args = signature
                        .match(/(?<=\().*(?=\))/)?.[0]
                        .split(",");

                      const decoded =
                        args &&
                        calldata &&
                        defaultAbiCoder.decode(args, calldata);
                      const argumentString =
                        decoded &&
                        decoded.map((item) => item.toString()).join(",");

                      return (
                        <Fragment key={`${target}${signature}${calldata}`}>
                          <Label
                            as="a"
                            w="100%"
                            m={0}
                            grey={800}
                            href={getEtherscanLink(chainId, target, "ADDRESS")}
                            target="_blank"
                            rel="noreferrer"
                            style={{ wordWrap: "break-word" }}
                          >
                            Contract: {target}
                          </Label>
                          <Label
                            as="p"
                            w="100%"
                            style={{ wordWrap: "break-word" }}
                          >
                            Function: {signature.replace(/(\(=?)(.*)$/, "")}(
                            {argumentString})
                          </Label>
                        </Fragment>
                      );
                    })}
              </Box>
            </Col>
            <Col md={4}>
              <VotingCard
                forCount={forCount}
                againstCount={againstCount}
                status={status}
                proposalId={pid}
                endTimestamp={endTimestamp}
                startTimestamp={startTimestamp}
              />
              <ProposalHistoryCard
                id={pid}
                blockNumber={blockNumber}
                endTimestamp={endTimestamp}
                startTimestamp={startTimestamp}
              />
            </Col>
          </Row>
        </Grid>
      </View>
    </>
  );
}

export default withUnsupportedChains(ProposalView, [421611, 42161]);
