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
    <Wrapper title={config.title} tabItems={config.tabItems}>
      <Grid>
        <Row justify="center">
          <Col xs={12} md={8} lg={6}>
            <Box mt="24px">
              <BorrowStatsCard />
            </Box>
            <Box mt="24px">
              <CreditProvidersCard />
            </Box>
            <ShareCard />
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
