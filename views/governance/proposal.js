import {
  Text,
  Grid,
  Row,
  Col,
  Box,
  Button,
  Heading,
  Divider,
  Label,
  Skeleton,
} from "union-ui";
import {
  VotingCard,
  Wrapper,
  AddressLabel,
  ProposalHistoryCard,
} from "components-ui";
import { useRouter } from "next/router";
import useProposalData from "hooks/governance/useProposalData";
import Link from "next/link";

import { config } from "./config";
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
  } = !!data && data;

  const isLoading = !data;

  return (
    <Wrapper title={config.title}>
      <Box mb="40px">
        <Link href="/governance/proposals">
          <Button
            variant="secondary"
            label="Back to proposals"
            icon="arrow-left"
          />
        </Link>
      </Box>
      <Grid>
        <Row>
          <Col md={8}>
            <Heading level={2} mb="8px" grey={400}>
              UIP-{id}
            </Heading>
            {isLoading ? (
              <Skeleton size="medium" mb="16px" />
            ) : (
              <Heading size="xlarge" mb="16px">
                {title}
              </Heading>
            )}
            {isLoading ? (
              <>
                <Skeleton size="small" variant="secondary" />
                <Skeleton size="medium" variant="secondary" />
              </>
            ) : (
              <>
                <Label as="p" size="small">
                  Proposed by
                </Label>
                {proposer ? <AddressLabel address={proposer} /> : "-"}
              </>
            )}
            <Divider />
            <Box mt="16px">
              <Button
                variant="pill"
                label="View bytecode"
                icon="chevron"
                iconPosition="end"
              />
            </Box>
            <Box direction="vertical" mt="24px">
              <Heading level={3} mb="12px">
                Description
              </Heading>
              {isLoading ? (
                createArray(5).map((_, i) => (
                  <Skeleton key={i} size="small" variant="secondary" w="100%" />
                ))
              ) : (
                <Text>{description}</Text>
              )}
            </Box>

            <Box direction="vertical" mt="24px">
              <Heading level={3}>Details</Heading>
              {isLoading
                ? createArray(5).map((_, i) => (
                    <Skeleton
                      key={i}
                      size="small"
                      variant="secondary"
                      w="100%"
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
            <VotingCard forCount={forCount} againstCount={againstCount} />
            <ProposalHistoryCard id={id} />
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  );
}
