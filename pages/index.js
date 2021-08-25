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
  Label,
} from "union-ui";
import Head from "next/head";
import Link from "next/link";

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
      <header>
        <div className="hide-lt-600">{/* empty */}</div>
        <div className="main-page-logo">
          <Logo withText />
        </div>
        <div className="home-nav">
          <Link href="#">
            <Label size="small" my={0} mr="24px" className="hide-lt-600">
              Governance
            </Label>
          </Link>
          <Link href="#">
            <Label size="small" my={0} mr="24px" className="hide-lt-600">
              Build
            </Label>
          </Link>
          <Link href="/get-started">
            <Button label="Open App" />
          </Link>
        </div>
      </header>
      <div className="main-page">
        <Grid>
          <Row>
            <Col xs={12}>
              <img
                src="/images/jumbo-1.png"
                alt="union-finance-header"
                className="jumbo hero"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Heading mt="29px" size="xlarge" className="intro-title">
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
                <Link href="/get-started">
                  <Button label="Open App" />
                </Link>
                <Button label="Build with Union" variant="secondary" />
              </ButtonRow>
            </Col>
          </Row>
          <Row>
            <Col>
              <Heading
                mt="148px"
                mb="15px"
                align="center"
                size="xlarge"
                className="bullet-title"
              >
                Credit, with a twist
              </Heading>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={4}>
              <Heading mb="20px" className="bullet-header">
                <img src="/images/efficient.png" alt="efficient" /> Efficient
              </Heading>
              <Text>
                With Union, middlemen are removed from the equation. Borrowing
                and lending has never been more efficient.
              </Text>
            </Col>
            <Col sm={12} md={4}>
              <Heading mb="20px" className="bullet-header">
                <img src="/images/lock.png" alt="open" /> Open
              </Heading>
              <Text>
                Union’s protocol is fully open by nature. This gives you the
                ability to use Union as you see fit, with no gatekeeping.
              </Text>
            </Col>
            <Col sm={12} md={4}>
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
            <Col xs={12} md={9}>
              <Heading
                mt="162px"
                align="center"
                className="heading--purple heading--preSubTitle"
              >
                Credit is...
              </Heading>
              <Heading align="center" mt="8px" className="heading--bold">
                “Exchanging present value for the possibility of future value”
              </Heading>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Box>
                <img
                  src="/images/jumbo-2.png"
                  alt="union-community"
                  className="jumbo"
                />
              </Box>
            </Col>
            <Col xs={12}>
              <Heading mt="8px" align="center" size="xlarge">
                No credit score, just your friend circle
              </Heading>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={12} sm={7}>
              <Text mt="8px" align="center">
                Gain trust from your friends, build up your credit line and gain
                access to credit whenever you need it
              </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Heading
                mt="196px"
                mb="24px"
                align="center"
                size="xlarge"
                className="tabs-title"
              >
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
            <Col sm={12} md={6}>
              <Card mb="20px">
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
            <Col sm={12} md={6}>
              <Card mb="20px">
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
