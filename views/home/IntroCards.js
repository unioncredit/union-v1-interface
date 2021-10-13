import { Grid, Row, Col, Text, Heading, Card, Box } from "union-ui";

export default function IntroCards() {
  return (
    <Box mt="148px">
      <Grid>
        <Row>
          <Col sm={12} md={4}>
            <Card mb="16px">
              <Card.Body>
                <Box maxw="64px" mx="auto">
                  <img src="/images/efficient.png" alt="efficient" />
                </Box>
                <Heading mb="20px" weight="medium" className="bullet-header">
                  Efficient
                </Heading>
                <Text>
                  With Union, middlemen are removed from the equation. Borrowing
                  and lending has never been more efficient.
                </Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4}>
            <Card mb="16px">
              <Card.Body>
                <Box maxw="64px" mx="auto">
                  <img src="/images/lock.png" alt="open" />
                </Box>
                <Heading mb="20px" weight="medium" className="bullet-header">
                  Open
                </Heading>
                <Text>
                  Union’s protocol is fully open by nature. This gives you the
                  ability to use Union as you see fit, with no gatekeeping.
                </Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4}>
            <Card mb="16px">
              <Card.Body>
                <Box maxw="64px" mx="auto">
                  <img src="/images/people.png" alt="open" />
                </Box>
                <Heading mb="20px" weight="medium" className="bullet-header">
                  Yours
                </Heading>
                <Text>
                  Union is built by and for the community. The past and present
                  of Union is defined by you.
                </Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Grid>
    </Box>
  );
}
