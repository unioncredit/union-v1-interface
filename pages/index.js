import {
  Grid,
  Row,
  Col,
  Text,
  Heading,
  ButtonRow,
  Button,
  Card,
  Box,
  Logo,
  Tabs,
} from "union-ui";

import Head from "next/head";

const tabItems = [
  { id: "one-to-one", label: "One to One" },
  { id: "one-to-many", label: "One to Many" },
  { id: "many-to-one", label: "Many to One" },
  { id: "many-to-many", label: "Many to Many" },
];

export default function HomePage() {
  return (
    <div className="home">
      <Head>
        <title>Union</title>
        <meta property="og:title" content="Union" />
        <meta name="twitter:title" content="Union" />
      </Head>
      <div className="main-page">
        <header>
          <div className="main-page-logo">
            <Logo />
          </div>
        </header>
        <Grid>
          <Row>
            <Col xs={12}>
              <img src="/images/jumbo-1.png" alt="union-finance-header" />
            </Col>
          </Row>
          <Row>
            <Col>
              <Heading mt="29px" size="xlarge">
                The global credit union
              </Heading>
              <Text mt="16px">
                We believe the new decentralized economy can and should work by
                default for those without assets. Without an effective way to
                support unsecured lending, this new financial world will forever
                remain an asset-backed economy.
              </Text>
              <Text mt="20px">
                Union allows developers to create credit mutuals that enable
                pseudonymous unsecured credit lines, permissionlessly.
              </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <ButtonRow mt="16px">
                <Button label="Open App" />
                <Button label="Build with Union" variant="secondary" />
              </ButtonRow>
            </Col>
          </Row>
          <Row>
            <Col>
              <Heading mt="148px" mb="39px" align="center" size="xlarge">
                Credit, with a twist
              </Heading>
            </Col>
          </Row>
          <Row>
            <Col>
              <Heading mb="20px" className="bullet-header">
                <img src="/images/efficient.png" alt="efficient" /> Efficient
              </Heading>
              <Text>
                With Union, middlemen are removed from the equation. Borrowing
                and lending has never been more efficient.
              </Text>
            </Col>
            <Col>
              <Heading mb="20px" className="bullet-header">
                <img src="/images/lock.png" alt="open" /> Open
              </Heading>
              <Text>
                Union’s protocol is fully open by nature. This gives you the
                ability to use Union as you see fit, with no gatekeeping.
              </Text>
            </Col>
            <Col>
              <Heading mb="20px" className="bullet-header">
                <img src="/images/people.png" alt="open" /> Yours
              </Heading>
              <Text>
                Union is built by and for the community. The past and present of
                Union is defined by you.
              </Text>
            </Col>
          </Row>
          <Row justify="center">
            <Col md={9}>
              <Heading mt="162px" align="center" className="heading--purple">
                Credit is...
              </Heading>
              <Heading align="center" mt="8px" className="heading--bold">
                “Exchanging present value for the possibility of future value”
              </Heading>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Box mt="188px">
                <img src="/images/jumbo-2.png" alt="union-community" />
              </Box>
            </Col>
            <Col xs={12}>
              <Heading mt="8px" align="center" size="xlarge">
                No credit score, just your friend circle
              </Heading>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={7}>
              <Text mt="8px" align="center">
                Gain trust from your friends, build up your credit line and gain
                access to credit whenever you need it
              </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Heading mt="196px" mb="24px" align="center" size="xlarge">
                Credit is more fluid with Union
              </Heading>
              <Tabs items={tabItems} />
              <Box mt="24px" align="center" justify="center">
                <img
                  src="/images/one-to-one.png"
                  alt="one-to-one-relationship"
                />
              </Box>
            </Col>
          </Row>
          <Row>
            <Col>
              <Heading
                mt="148px"
                mb="24px"
                align="center"
                className="heading--bold"
              >
                Get started with Union
              </Heading>
            </Col>
          </Row>
        </Grid>
      </div>
      <div className="main-page-footer">
        <Grid>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <img src="/images/ring.png" alt="union-member-ring" />
                  <Heading align="center" mb="12px" mt="24px">
                    Become a Union member
                  </Heading>
                  <Text align="center">
                    Get vouched for, lend to your friends and take part in votes
                    to define the future of your Union.
                  </Text>
                  <Button label="Open App" mt="12px" />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <img src="/images/hands.png" alt="union-member-ring" />
                  <Heading align="center" mb="12px" mt="24px">
                    Start building with Union
                  </Heading>
                  <Text align="center">
                    Create open, credit reliant financial tools for the masses.
                    All on top of Ethereum.
                  </Text>
                  <Button label="Build with Union" mt="12px" />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Grid>
      </div>
      <footer>
        <div className="footer-logo">
          <Logo />
        </div>
        <div className="footer-nav">
          <div className="footer-nav-item">Docs</div>
          <div className="footer-nav-item">Governance</div>
          <div className="footer-nav-item">Community</div>
          <div className="footer-nav-item">Dashboard</div>
        </div>
        <div className="footer-nav">
          <div className="footer-nav-item secondary">Github</div>
          <div className="footer-nav-item secondary">Discord</div>
          <div className="footer-nav-item secondary">Twitter</div>
        </div>
      </footer>
    </div>
  );
}
