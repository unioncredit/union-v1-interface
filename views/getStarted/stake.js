import { Grid, Row, Col } from "union-ui";
import { Wrapper, StakeCard, ClaimCard } from "components-ui";

import { config } from "./config";

export default function StakeView() {
  return (
    <Wrapper title={config.title} tabItems={config.tabItems}>
      <Grid gutterWidth={0}>
        <Row>
          <Col xs={12} md={6}>
            <StakeCard type="deposit" />
          </Col>
          <Col xs={12} md={6}>
            <ClaimCard />
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  );
}
