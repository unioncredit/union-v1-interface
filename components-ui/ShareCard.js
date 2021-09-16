import { Card, Heading, Button, Text, ButtonRow  } from "union-ui";

export function ShareCard() {

	return (
		              <Card variant="blue" mt="24px">
                <Card.Body>
                  <Heading align="center">Get extra credit</Heading>
                  <Text align="center" mb="24px">
                    Share your link with other Union members who might be
                    willing to vouch for you with their DAI.
                  </Text>
                  <Text align="center" mb="24px">https://union.finance/0xa44...3411</Text>
                  <Button label="Get QR Code" fluid />
                  <ButtonRow fluid mt="8px">
                    <Button
                      variant="secondary"
                      label="Share on Twitter"
                      fluid
                    />
                    <Button
                      variant="secondary"
                      label="Share on Telegram"
                      fluid
                    />
                  </ButtonRow>
                </Card.Body>
                </Card>

		)
}