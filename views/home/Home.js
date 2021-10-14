import { Label, Heading, Logo, Box } from "union-ui";
import Head from "next/head";
import Link from "next/link";

import { links } from "constants/app";

import Header from "./Header";
import Intro from "./Intro";
import IntroCards from "./IntroCards";
import Jumbo from "./Jumbo";
import TabContent from "./TabContent";
import GetStarted from "./GetStarted";
import Wrapper from "./Wrapper";

const footerNav = [
  [
    { label: "Docs", href: links.docs },
    { label: "Governance", href: links.governance },
    { label: "Community", href: links.discord },
    { label: "Dashboard", href: "/get-started" },
  ],
  [
    { label: "Github", href: links.github },
    { label: "Discord", href: links.discord },
    { label: "Twitter", href: links.twitter },
  ],
];

export default function HomeView() {
  return (
    <div className="home">
      <Head>
        <title>Union</title>
        <meta property="og:title" content="Union" />
        <meta name="twitter:title" content="Union" />
      </Head>

      <Wrapper>
        <Header />
        <Wrapper>
          <Intro />
        </Wrapper>
        <IntroCards />

        <Box
          maxw="450px"
          direction="vertical"
          mt="162px"
          align="center"
          mb="120px"
        >
          <Heading align="center" color="blue500">
            Credit is...
          </Heading>
          <Heading align="center" mt="8px" weight="heavy" size="xxxlarge">
            “Exchanging present value for the possibility of future value”
          </Heading>
        </Box>

        <Jumbo />
        <TabContent />
        <Wrapper maxw="815px">
          <GetStarted />
        </Wrapper>
      </Wrapper>

      <footer>
        <div className="footer-logo">
          <Logo />
        </div>
        {footerNav.map((items, i) => (
          <div className="footer-nav" key={i}>
            {items.map((item, j) => (
              <Link href={item.href} key={j}>
                <a>
                  <Label as="p" className="footer-nav-item">
                    {item.label}
                  </Label>
                </a>
              </Link>
            ))}
          </div>
        ))}
      </footer>
    </div>
  );
}
