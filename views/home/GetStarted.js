import Link from "next/link";
import { Grid, Col, Row, Heading, Text, Button, Card, Box } from "union-ui";

export default function GetStarted() {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <Heading
            mt="120px"
            mb="40px"
            align="center"
            size="xxlarge"
            weight="bold"
          >
            Get started with Union
          </Heading>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6}>
          <Card mb="20px">
            <Card.Body>
              <Box maxw="140px" mx="auto">
                <img src="/images/ring.png" alt="union-member-ring" />
              </Box>
              <Heading
                align="center"
                weight="regular"
                mb="12px"
                mt="24px"
                size="large"
              >
                Become a Union member
              </Heading>
              <Text align="center">
                Get vouched for, lend to your friends and take part in votes to
                define the future of your Union.
              </Text>
              <Link href="/get-started">
                <Button fluid label="Open App" mt="16px" />
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card mb="20px">
            <Card.Body>
              <Box maxw="140px" mx="auto">
                <img src="/images/hands.png" alt="union-member-ring" />
              </Box>
              <Heading
                align="center"
                weight="regular"
                mb="12px"
                mt="24px"
                size="large"
              >
                Start building with Union
              </Heading>
              <Text align="center">
                Create open, credit reliant financial tools for the masses. All
                on top of Ethereum.
              </Text>
              <Link href="https://unionfinance.gitbook.io/docs/" taget="_blank">
                <Button
                  fluid
                  mt="16px"
                  variant="secondary"
                  label="Build with Union"
                />
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Grid>
  );
}
