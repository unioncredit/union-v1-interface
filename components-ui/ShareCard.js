import { useWeb3React } from "@web3-react/core";
import {
  CreditRequestModal,
  useCreditRequestModal,
} from "components-ui/modals";
import generateLink, {
  generateTwitterLink,
  generateTelegramLink,
} from "util/generateLink";
import Link from "next/link";
import { Card, Heading, Button, Label, ButtonRow, Text } from "union-ui";
import { Copyable } from "./Copyable";

export function ShareCard({ title, content }) {
  const { account } = useWeb3React();
  const { isOpen: isCreditRequestOpen, open: openCreditRequest } =
    useCreditRequestModal();

  const url = generateLink(account);

  return (
    <>
      <Card variant="blue" mt="24px">
        <Card.Body>
          <Heading align="center">{title}</Heading>
          <Text align="center" mb="24px">
            {content}
          </Text>
          <Label as="p" align="center" size="small" m={0} color="blue400">
            VOUCH LINK
          </Label>
          <Label as="p" align="center" mb="24px">
            <Copyable value={url}>
              {url.slice(0, 16)}...{url.slice(-16)}
            </Copyable>
          </Label>
          <Button label="Get QR Code" fluid onClick={openCreditRequest} />
          <ButtonRow fluid mt="8px">
            <Link href={generateTwitterLink(url)}>
              <Button
                variant="secondary"
                color="blue"
                label="Share on Twitter"
                fluid
              />
            </Link>
            <Link href={generateTelegramLink(url)}>
              <Button
                variant="secondary"
                color="blue"
                label="Share on Telegram"
                fluid
              />
            </Link>
          </ButtonRow>
        </Card.Body>
      </Card>
      {isCreditRequestOpen && <CreditRequestModal />}
    </>
  );
}
