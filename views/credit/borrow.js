import {
  Wrapper,
  TransactionHistory,
  BorrowStatsCard,
  ShareCard,
  CreditProvidersCard,
} from "components-ui";
import { Grid, Row, Col, Card, Box } from "union-ui";

import { config } from "./config";

export default function BorrowView() {
  return (
    <Wrapper tabItems={config.tabItems}>
      <Grid>
        <Row justify="center">
          <Col>
            <Box mt="24px">
              <BorrowStatsCard />
            </Box>
            <Box mt="24px">
              <CreditProvidersCard />
            </Box>
            <ShareCard
              title="Get extra credit"
              content="Share your link with other Union members who might be willing to vouch for you with their DAI."
            />
            <Card mt="24px">
              <Card.Header
                title="Transaction History"
                subTitle="Your credit based transaction history"
              />
              <Card.Body>
                <TransactionHistory />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  );
}
