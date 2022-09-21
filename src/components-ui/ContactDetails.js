import { formatUnits } from "@ethersproject/units";
import { Stat, Grid, Button, Label, Box } from "@unioncredit/ui";
import { ReactComponent as Manage } from "@unioncredit/ui/lib/icons/manage.svg";

import { Dai } from "components-ui";
import format from "util/formatValue";
import { roundUp } from "util/numbers";
import { ZERO } from "constants/variables";
import { ContactsType } from "constants/app";
import useBorrowData from "hooks/data/useBorrowData";

function TrustsYouContactDetails({
  trust = ZERO,
  vouched = ZERO,
  manageContact,
  available = ZERO,
}) {
  return (
    <>
      <Grid.Row>
        <Grid.Col xs={4}>
          <Stat
            size="extra-small"
            label="Trust"
            tooltip="The DAI amount this address trusts you with"
            value={<Dai value={format(formatUnits(trust), 2)} />}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat
            size="extra-small"
            label="Vouch"
            tooltip="The DAI amount this address can underwrite based on their total staked DAI"
            value={<Dai value={format(formatUnits(vouched), 2)} />}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat
            size="extra-small"
            label="Available"
            tooltip="The DAI amount you can borrow from this address"
            value={<Dai value={format(formatUnits(available), 2)} />}
          />
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col xs={12}>
          <Button
            mt="18px"
            fluid
            label="Manage Contact"
            icon={Manage}
            onClick={manageContact}
          />
        </Grid.Col>
      </Grid.Row>
    </>
  );
}

function YouTrustContactDetails({
  manageContact,
  address,
  used,
  vouched,
  trust,
}) {
  const { data: borrowData } = useBorrowData(address);

  const { interest = 0, paymentDueDate = "-" } = !!borrowData && borrowData;

  return (
    <>
      <Grid.Row>
        <Grid.Col xs={4}>
          <Stat
            size="extra-small"
            mb="12px"
            label="Trust"
            tooltip="The DAI amount you trust this address to borrow"
            value={<Dai value={format(formatUnits(trust), 2)} />}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat
            size="extra-small"
            mb="12px"
            label="Vouch"
            tooltip="The DAI amount you can underwrite based on your total staked DAI"
            value={<Dai value={format(formatUnits(vouched), 2)} />}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat
            size="extra-small"
            mb="12px"
            align="right"
            label="Available"
            tooltip="The DAI this address has available to borrow"
            value={<Dai value={format(formatUnits(vouched.sub(used)), 2)} />}
          />
        </Grid.Col>
      </Grid.Row>

      <Grid.Row>
        <Grid.Col xs={12}>
          <Box justify="space-between" mt="8px">
            <Label as="p" grey={400}>
              Balance Owed
            </Label>
            <Label as="p" grey={700} m={0}>
              {format(formatUnits(used), 2)}
            </Label>
          </Box>
          <Box justify="space-between">
            <Label as="p" grey={400}>
              Min. Payment
            </Label>
            <Label as="p" grey={700} m={0}>
              {roundUp(formatUnits(interest))}
            </Label>
          </Box>
          <Box justify="space-between">
            <Label as="p" grey={400}>
              Payment Due
            </Label>
            <Label as="p" grey={700} m={0}>
              {paymentDueDate === "No Payment Due" ? "None" : paymentDueDate}
            </Label>
          </Box>
        </Grid.Col>
      </Grid.Row>

      <Grid.Row>
        <Grid.Col xs={12}>
          <Button
            mt="12px"
            fluid
            variant="secondary"
            label="Manage Contact"
            icon={Manage}
            onClick={manageContact}
          />
        </Grid.Col>
      </Grid.Row>
    </>
  );
}

export function ContactDetails({ contactsType, ...props }) {
  return (
    <Grid>
      {contactsType === ContactsType.YOU_TRUST ? (
        <YouTrustContactDetails {...props} />
      ) : (
        <TrustsYouContactDetails {...props} />
      )}
    </Grid>
  );
}
