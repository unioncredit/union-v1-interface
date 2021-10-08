import useBorrowData from "hooks/data/useBorrowData";
import { Stat, Grid, Card, Button } from "union-ui";
import { Dai } from "components-ui";
import format from "util/formatValue";
import { roundUp, toPercent } from "util/numbers";
import useAccountHistory from "hooks/data/useAccountHistory";
import { useWeb3React } from "@web3-react/core";
import { AccountActivity } from "./AccountActivity";

function TrustsYouContactDetails({ used, utilized, vouched, manageContact }) {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Col xs={4}>
          <Stat label="Providing you" value={<Dai value={vouched} />} />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat label="Utilized" value={`${toPercent(utilized)}`} />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat
            label="Available"
            value={<Dai value={format(vouched - used)} />}
          />
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col xs={12}>
          <Button
            mt="18px"
            fluid
            label="Manage Contact"
            onClick={manageContact}
          />
        </Grid.Col>
      </Grid.Row>
    </Grid>
  );
}

function YouTrustContactDetails({
  manageContact,
  address,
  used,
  utilized,
  vouched,
}) {
  const { data: borrowData } = useBorrowData(address);

  const { interest = 0, paymentDueDate = "-" } = !!borrowData && borrowData;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Col xs={4}>
          <Stat
            mb="12px"
            label="Credit Limit"
            value={<Dai value={vouched} />}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat mb="12px" label="Utilized" value={`${toPercent(utilized)}`} />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat
            mb="12px"
            label="Available"
            value={<Dai value={format(vouched - used)} />}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat label="Balance owed" value={<Dai value={format(used)} />} />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat label="Min payment" value={<Dai value={roundUp(interest)} />} />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat
            label="Payment due"
            value={
              paymentDueDate === "No Payment Due" ? "None" : paymentDueDate
            }
          />
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col xs={12}>
          <Button
            mt="18px"
            fluid
            variant="secondary"
            label="Manage Contact"
            onClick={manageContact}
          />
        </Grid.Col>
      </Grid.Row>
    </Grid>
  );
}

export function ContactDetails({ contactsType, ...props }) {
  const { account } = useWeb3React();
  const { data, ...activity } = useAccountHistory(props.address);

  const filtered = data.filter((log) => {
    if (log.borrower && log.staker) {
      const arr = [log.borrower, log.staker];
      return arr.includes(props.address) && arr.includes(account);
    }
    return true;
  });

  return (
    <>
      <Card mb="24px" variant="packed">
        <Card.Body>
          {contactsType === "you-trust" ? (
            <YouTrustContactDetails {...props} />
          ) : (
            <TrustsYouContactDetails {...props} />
          )}
        </Card.Body>
      </Card>
      <AccountActivity {...activity} data={filtered} />
    </>
  );
}
