import Link from "next/link";
import { Box, Heading, Button, Text, ButtonRow } from "union-ui";
import { links } from "constants/app";

export default function ErrorView({ title, content }) {
  return (
    <Box fluid justify="center">
      <Box align="center" direction="vertical" maxw="440px">
        <Heading align="center" size="xxlarge" mb="12px" mt="48px">
          {title}
        </Heading>
        <Text align="center">{content}</Text>
        <ButtonRow mt="24px">
          <Link href="/">
            <Button label="Back to app" />
          </Link>
          <Link href={links.docs}>
            <Button label="Read the docs" variant="secondary" />
          </Link>
        </ButtonRow>
      </Box>
    </Box>
  );
}
