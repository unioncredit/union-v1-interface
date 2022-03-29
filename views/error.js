import Link from "next/link";
import { Box, Heading, Button, Text, ButtonRow } from "@unioncredit/ui";
import { links } from "constants/app";

export default function ErrorView({
  title,
  content,
  buttons = [
    { label: "Back to app", href: "/", variant: "primary" },
    { label: "Read the docs", href: links.docs, variant: "secondary" },
  ],
}) {
  return (
    <Box fluid justify="center">
      <Box align="center" direction="vertical" maxw="440px">
        <Heading align="center" size="xxlarge" mb="12px" mt="48px">
          {title}
        </Heading>
        <Text align="center">{content}</Text>
        <ButtonRow mt="24px">
          {buttons.map(({ label, href, variant }) => (
            <Link href={href} key={href}>
              <Button label={label} variant={variant} />
            </Link>
          ))}
        </ButtonRow>
      </Box>
    </Box>
  );
}
