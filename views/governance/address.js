import { Grid, Row, Col, Box, Button, Heading, Text } from "union-ui";
import { Wrapper, UserVotingOverview, UserVotingHistory } from "components-ui";

export default function AddressView() {
  return (
    <Wrapper title="Profile • mirshko.eth">
      <Box mb="40px">
        <Button variant="secondary" label="Back to proposals" />
      </Box>
      <Grid>
        <Row>
          <Col md={4}>
            <Heading level={2}>mirshko.eth</Heading>
            <Text mb="12px">0x00000000000000000</Text>
            <UserVotingOverview variant="secondary" />
          </Col>
          <Col md={8}>
            <Heading>Voting History</Heading>
            <Text mb="12px">Votes this address participated in</Text>
            <UserVotingHistory />
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  );
}
