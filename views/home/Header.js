import { Text, LogoMobile as Logo, Box, Icon } from "union-ui";
import Link from "next/link";
import { links } from "constants/app";

export default function Header() {
  return (
    <Box as="header" justify="space-between" fluid>
      <Logo width="90px" />
      <div className="home-nav">
        <Link href={links.governance}>
          <a>
            <Text as="span" my={0} mr="24px" className="hide-lt-600">
              Governance
            </Text>
          </a>
        </Link>
        <Link href={links.docs}>
          <a>
            <Text as="span" my={0} mr="24px" className="hide-lt-600">
              Build
            </Text>
          </a>
        </Link>
        <Link href="/get-started">
          <a>
            <Text as="span" color="blue600" m={0} className="open-app-text">
              Open App <Icon name="arrow-left" />
            </Text>
          </a>
        </Link>
      </div>
    </Box>
  );
}
