import {
  Button,
  Heading,
  Text,
  Box,
  Card,
  Grid,
  Row,
  Col,
  Stat,
  ToggleMenu,
  Label,
  Badge,
  Table,
  TableRow,
  TableCell,
} from "union-ui";
import {
  Wrapper,
  Avatar,
  ContactsSummaryRow,
  ContactsSummaryRowSkeleton,
} from "components-ui";
import useTrustData from "hooks/data/useTrustData";
import createArray from "util/createArray";

import { config } from "./config";

export default function ContactsView() {
  const { data: trustData } = useTrustData();

  const isTrustLoading = !trustData;

  return (
    <Wrapper title={config.title} tabItems={config.tabItems}>
      <Card size="fluid" noGutter>
        <Grid bordered>
          <Row nogutter>
            <Col md={4}>
              <Box>
                <ToggleMenu items={config.toggleItems} />
              </Box>
            </Col>
            <Col>
              <Box align="center">
                <Avatar size={54} address="0x000000000000000000" />
                <Box direction="vertical" mx="16px">
                  <Heading level={2}>Beth C</Heading>
                  <Text mb={0}>al.eth • 0x000000000000000000</Text>
                </Box>
                <Button
                  ml="auto"
                  rounded
                  variant="secondary"
                  label="Manage contacts"
                  icon="manage"
                />
              </Box>
            </Col>
          </Row>
          <Row noGutter>
            <Col md={4} noPadding>
              <Table noBorder noPadding>
                {isTrustLoading
                  ? createArray(3).map((_, i) => (
                      <ContactsSummaryRowSkeleton key={i} />
                    ))
                  : trustData.map((item, i) => (
                      <ContactsSummaryRow
                        {...item}
                        key={i}
                        onClick={() => alert("row-clicked")}
                      />
                    ))}
              </Table>

              <Box mt="auto" mb="24px" ml="auto" mr="auto">
                <Button
                  rounded
                  icon="vouch"
                  variant="floating"
                  label="Vouch for someone"
                />
              </Box>
            </Col>
            <Col md={8}>
              <Box mb="20px">
                <Stat label="Credit Limit" value="$2,500" />
                <Stat label="Utilized" value="$500" />
                <Stat label="Available Credit" value="$2,500" />
              </Box>
              <Box mb="24px">
                <Stat label="Balance owed" value="$250.92" />
                <Stat label="Due today" value="$28.13" />
                <Stat label="Payment due" value="~12 days" />
              </Box>
              <Box mb="24px" direction="vertical">
                <Label size="small">Trusted since</Label>
                <Heading level={3}>8th November 2020</Heading>
              </Box>
              <Box mb="24px" direction="vertical">
                <Label size="small">Loan staus</Label>
                <Badge label="Healthy" color="blue" />
              </Box>
              <Box mb="24px" direction="vertical">
                <Label size="small">Account History</Label>
                <Box mt="8px" direction="vertical">
                  <Text>Borrowed $250</Text>
                  <Label size="small">11:14am · 22 November 2020</Label>
                </Box>
                <Box mt="8px" direction="vertical">
                  <Text>Repayed $40</Text>
                  <Label size="small">11:14am · 22 November 2020</Label>
                </Box>
              </Box>
            </Col>
          </Row>
        </Grid>
      </Card>
    </Wrapper>
  );
}
