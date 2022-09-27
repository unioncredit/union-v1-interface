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
            <ShareCard content="Get more Union vouches to increase your total available credit." />
            <Box mt="24px">
              <CreditProvidersCard />
            </Box>
            <Card mt="24px">
              <Card.Header
                title="Transaction History"
                subTitle="Your credit based transaction history"
              />
              <AddressHistory address={account} />
            </Card>
          </Col>
        </Row>
      </Grid>
    </View>
  );
}
