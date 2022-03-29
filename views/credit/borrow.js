import { useWeb3React } from "@web3-react/core";
import {
  View,
  BorrowStatsCard,
  ShareCard,
  CreditProvidersCard,
  AddressHistory,
} from "components-ui";
import { Grid, Row, Col, Card, Box } from "@unioncredit/ui";

import { config } from "./config";

export default function BorrowView() {
  const { account } = useWeb3React();

  return (
    <View tabItems={config.tabItems}>
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
                <AddressHistory address={account} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Grid>
    </View>
  );
}
