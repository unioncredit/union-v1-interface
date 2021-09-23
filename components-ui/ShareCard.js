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
import { Card, Heading, Button, Label, ButtonRow } from "union-ui";

export function ShareCard() {
  const { account } = useWeb3React();
  const { isOpen: isCreditRequestOpen, open: openCreditRequest } =
    useCreditRequestModal();

  const url = generateLink(account);

  return (
    <>
      <Card variant="blue" mt="24px">
        <Card.Body>
          <Heading align="center">Get extra credit</Heading>
          <Label as="p" align="center" mb="24px">
            Share your link with other Union members who might be willing to
            vouch for you with their DAI.
          </Label>
          <Label as="p" align="center" mb="24px">
            https://union.finance/0xa44...3411
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
