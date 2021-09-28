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
import {
  Card,
  Heading,
  Button,
  Label,
  ButtonRow,
  CircleProgress,
  Box,
  Text,
} from "union-ui";
import { Copyable } from "./Copyable";

export function ShareCard({ vouchCount }) {
  const { account } = useWeb3React();
  const { isOpen: isCreditRequestOpen, open: openCreditRequest } =
    useCreditRequestModal();

  const url = generateLink(account);

  return (
    <>
      <Card variant="blue" mt="24px">
        <Card.Body>
          <Heading align="center">Get extra credit</Heading>
          <Text align="center" mb="24px">
            Share your link with other Union members who might be willing to
            vouch for you with their DAI.
          </Text>
          {vouchCount && (
            <Box justify="center" mb="24px" fluid>
              <CircleProgress
                percentage={(vouchCount / 3) * 100}
                complete={vouchCount >= 3}
                label={`${vouchCount}/3`}
              />
            </Box>
          )}
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
