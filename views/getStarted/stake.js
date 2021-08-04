import { useRouter } from "next/router";
import { Grid, Row, Col } from "union-ui";
import useIsMember from "hooks/data/useIsMember";
import { Wrapper, StakeCard, ClaimCard } from "components-ui";

import { config } from "./config";

export default function StakeView() {
  const { query } = useRouter();
  const { data: isMember = false } = useIsMember();

  return (
    <Wrapper title={config.title} tabItems={config.tabItems}>
      <Grid gutterWidth={0}>
        <Row>
          <Col xs={12} md={6}>
            <StakeCard />
          </Col>
          <Col xs={12} md={6}>
            <ClaimCard />
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  );
}
