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
} from "union-ui";
import { Wrapper, Avatar } from "components-ui";

import { config } from "./config";

export default function ContactsView() {
  return (
    <Wrapper title={config.title} tabItems={config.tabItems}>
      <Card size="fluid" noGutter>
        <Grid bordered>
          <Row nogutter>
            <Col md={4}>
              <ToggleMenu items={config.toggleItems} />
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
          <Row nogutter>
            <Col md={4}>No contacts</Col>
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
                <Text>No history</Text>
              </Box>
            </Col>
          </Row>
        </Grid>
      </Card>
    </Wrapper>
  );
}
