import { useWeb3React } from "@web3-react/core";
import { Card, Button, Text, Box, Label } from "@unioncredit/ui";
import { ReactComponent as Link } from "@unioncredit/ui/lib/icons/link.svg";

import {
  CreditRequestModal,
  useCreditRequestModal,
} from "components-ui/modals";

export function ShareCard({ content, size, buttonProps = { color: "blue" } }) {
  const { account } = useWeb3React();
  const { open: openCreditRequest } = useCreditRequestModal();

  if (!account) return null;

  return (
    <>
      <Card variant="blue" mt="24px" size={size} packed>
        <Card.Body>
          <Box align="center">
            {content && <Label m={0}>{content}</Label>}
            <Button
              fluid
              ml="4px"
              icon={Link}
              label="Get vouch link"
              onClick={openCreditRequest}
              {...buttonProps}
            />
          </Box>
        </Card.Body>
      </Card>
      <CreditRequestModal />
    </>
  );
}
