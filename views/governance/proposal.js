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
import Link from "next/link";

import { config } from "./config";

export default function ProposalView() {
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
              UIP-12
            </Heading>
            <Heading size="xlarge" mb="16px">
              Formalize the UIP Introduction & Voting Process
            </Heading>
            <Label as="p">Proposed by</Label>
            <AddressLabel address="0x00000000000" />
            <Divider />
            <Box direction="vertical" mt="32px">
              <Heading level={3}>Action Items</Heading>
              <Text mt="12px">
                1. Support cUSDT on Union
                <br />
                2. Set new price oracle to PriceOracleProxy
              </Text>
            </Box>
            <Box mt="16px">
              <Button
                variant="pill"
                label="View bytecode"
                icon="chevron"
                iconPosition="end"
              />
            </Box>
            <Box direction="vertical" mt="24px">
              <Heading level={3}>Abstract</Heading>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse sed faucibus placerat imperdiet. Massa in elementum,
                feugiat mi, consequat a. Egestas lacinia enim ipsum leo rhoncus.
              </Text>
            </Box>
            <Box direction="vertical" mt="24px">
              <Heading level={3}>Description</Heading>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse sed faucibus placerat imperdiet. Massa in elementum,
                feugiat mi, consequat a. Egestas lacinia enim ipsum leo rhoncus.
              </Text>
            </Box>
          </Col>
          <Col md={4}>
            <VotingCard />
            <ProposalHistoryCard />
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  );
}
