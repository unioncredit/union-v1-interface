import { Text, Button, Logo, Box } from "union-ui";
import Link from "next/link";
import { links } from "constants/app";

export default function Header() {
  return (
    <Box as="header" justify="space-between" fluid>
      <Logo withText width="50px" />
      <div className="home-nav">
        <Link href={links.governance}>
          <Text as="a" my={0} mr="24px" className="hide-lt-600">
            Governance
          </Text>
        </Link>
        <Link href={links.docs}>
          <Text as="a" my={0} mr="24px" className="hide-lt-600">
            Build
          </Text>
        </Link>
        <Link href="/get-started">
          <Button variant="lite" label="Open App" color="blue600" />
        </Link>
      </div>
    </Box>
  );
}
