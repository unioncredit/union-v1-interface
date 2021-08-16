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

  console.log({ details });

  return (
    <Wrapper title={config.title}>
      <Box mb="40px">
        <Link href="/governance/proposals">
          <Button variant="secondary" label="Back to proposals" />
        </Link>
      </Box>
      <Grid>
        <Row>
          <Col md={8}>
            <Heading level={2} mb="8px">
              UIP-{id}
            </Heading>
            <Heading size="xlarge" mb="16px">
              {title}
            </Heading>
            <Label as="p">Proposed by</Label>
            {proposer ? <AddressLabel address={proposer} /> : "-"}
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
              <Heading level={3}>Description</Heading>
              <Text>{description}</Text>
            </Box>

            <Box direction="vertical" mt="24px">
              <Heading level={3}>Details</Heading>
              {details.map((detail) => (
                <Text>
                  {detail.target}.{detail.functionSig}(<br />&emsp;{detail.callData})
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
