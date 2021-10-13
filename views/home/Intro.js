import { Text, Heading, ButtonRow, Button } from "union-ui";
import Link from "next/link";

export default function Intro() {
  return (
    <>
      <img
        src="/images/jumbo-1.png"
        alt="union-finance-header"
        className="jumbo hero"
      />
      <Heading mt="29px" weight="medium" size="xxlarge" align="center">
        The global credit union
      </Heading>
      <Text mt="16px" align="center">
        We believe the new decentralized economy can and should work by default
        for those without assets. Without an effective way to support unsecured
        lending, this new financial world will forever remain an asset-backed
        economy.
      </Text>
      <Text mt="20px" align="center">
        Union allows developers to create credit mutuals that enable
        pseudonymous unsecured credit lines, permissionlessly.
      </Text>
      <ButtonRow justify="center" mt="18px">
        <Link href="/get-started">
          <Button label="Open App" w="200px" />
        </Link>
      </ButtonRow>
    </>
  );
}
