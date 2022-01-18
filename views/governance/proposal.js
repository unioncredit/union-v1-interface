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
} from "union-ui";
import ArrowRight from "union-ui/lib/icons/arrowRight.svg";
import ReactMarkdown from "react-markdown";
import {
  VotingCard,
  View,
  AddressLabel,
  ProposalHistoryCard,
} from "components-ui";
import { useRouter } from "next/router";
import useProposalData from "hooks/governance/useProposalData";
import Link from "next/link";

import createArray from "util/createArray";
import getEtherscanLink from "util/getEtherscanLink";
import useChainId from "hooks/useChainId";

export default function ProposalView() {
  const chainId = useChainId();

  const { query } = useRouter();

  const { id } = query;

  const data = useProposalData(id);

  const {
    description = "-",
    title = "-",
    proposer,
    forCount,
    againstCount,
    details = [],
    status,
    blockNumber,
    pid,
    hash,
    endTimestamp,
    startTimestamp,
  } = !!data && data;

  const isLoading = !data;

  return (
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
                      <ArrowRight className="flip" width="24px" height="24px" />
                      Back to proposals
                    </>
                  }
                />
              </Link>
            </Box>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
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
                  <Skeleton key={i} height={16} width={320} shimmer mb="8px" />
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
                : details.map((detail) => (
                    <Text
                      w="100%"
                      key={`${detail.target}${detail.functionSig}${detail.callData}`}
                      style={{ wordWrap: "break-word" }}
                    >
                      {detail.target}.{detail.functionSig}({detail.callData})
                    </Text>
                  ))}
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
            <ProposalHistoryCard id={pid} blockNumber={blockNumber} />
          </Col>
        </Row>
      </Grid>
    </View>
  );
}
