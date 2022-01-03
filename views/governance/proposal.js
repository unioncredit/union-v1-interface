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

export default function ProposalView() {
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
    displayId,
  } = !!data && data;

  const isLoading = !data;

  return (
    <View>
      <Grid>
        <Row>
          <Col>
            <Box mb="40px">
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
            <Heading level={2} mb="8px" grey={400}>
              UIP-{displayId}
            </Heading>
            {isLoading ? (
              <Skeleton height={20} width={280} mb="16px" shimmer />
            ) : (
              <Heading size="xlarge" mb="16px">
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
                <Label as="p" size="small">
                  Proposed by
                </Label>
                {proposer ? <AddressLabel address={proposer} /> : "-"}
              </>
            )}
            <Box direction="vertical" mt="24px">
              <Heading level={3} mb="12px">
                Description
              </Heading>
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
                    paragraph: (props) => <Text {...props} />,
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
              proposalId={id}
            />
            <ProposalHistoryCard id={id} blockNumber={blockNumber} />
          </Col>
        </Row>
      </Grid>
    </View>
  );
}
