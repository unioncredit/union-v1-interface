import {
  Grid,
  Row,
  Col,
  Card,
  Text,
  Heading,
  Button,
  Label,
  Box,
  ButtonRow,
  Divider,
  StatusIcon,
  CircleProgress,
} from "union-ui";
import { useState } from "react";
import Link from "next/link";
import { Wrapper, AddressLabel } from "components-ui";
import useIsMember from "hooks/data/useIsMember";
import useTrustCountData from "hooks/data/useTrustCountData";
import useVouchData from "hooks/data/useVouchData";
import useCreditLimit from "hooks/data/useCreditLimit";
import format from "util/formatValue";
import useRegisterMember from "hooks/payables/useRegisterMember";
import handleTxError from "util/handleTxError";
import getReceipt from "util/getReceipt";
import { useWeb3React } from "@web3-react/core";

import { config } from "./config";

export default function MembershipView() {
  const { library } = useWeb3React();
  const [registering, setRegistering] = useState(false);
  const { data: isMember = null } = useIsMember();
  const { data: trustCount = 0 } = useTrustCountData();
  const { data: vouchData = [] } = useVouchData();
  const { data: creditLimit = 0 } = useCreditLimit();
  const registerMember = useRegisterMember();

  const fencedTrustCount = trustCount >= 3 ? 3 : trustCount;

  const handleRegister = async () => {
    try {
      setRegistering(true);
      const { hash } = await registerMember();
      await getReceipt(hash, library);
      setRegistering(false);
    } catch (err) {
      setRegistering(false);
      handleTxError(err);
    }
  };

  return (
    <Wrapper title={config.title} tabItems={config.tabItems}>
      <Grid gutterWidth={0}>
        <Row>
          <Col xs={12} md={6}>
            <Card mb="20px">
              <Card.Body>
                <Box align="center" direction="vertical" my="12px">
                  <Heading>Get trusted on Union</Heading>
                  <Text align="center" mb="21px">
                    You’ll need to be trusted by 3 existing Union members before
                    you can become a member
                  </Text>
                  <CircleProgress
                    percentage={(fencedTrustCount / 3) * 100}
                    complete={fencedTrustCount >= 3}
                    label={`${fencedTrustCount}/3`}
                  />
                  <Label as="p" mt="21px">
                    Share your link with members to get vouches
                  </Label>
                  <ButtonRow mt="8px">
                    <Button rounded label="Copy link" icon="link" />
                    <Button variant="secondary" rounded icon="twitter" />
                    <Button variant="secondary" rounded icon="telegram" />
                  </ButtonRow>
                  <Divider />
                  {vouchData.slice(0, 3).map((data, i) => (
                    <Box
                      mt={i === 0 ? "21px" : "8px"}
                      justify="space-between"
                      align="center"
                      fluid
                    >
                      <AddressLabel address={data.address} />
                      <StatusIcon name="success" variant="wire" />
                    </Box>
                  ))}
                </Box>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card mb="20px">
              <Card.Body>
                <Box align="center" direction="vertical" my="12px">
                  <Heading>Become a Member</Heading>
                  <Text align="center" mb="21px">
                    Once you’re trusted, pay the membership fee to gain access
                    to credit with Union
                  </Text>
                  <Text mb="21px" size="large">
                    Get access to your <Dai value={format(creditLimit)} />{" "}
                    credit line
                  </Text>
                  <Button
                    label="Pay 1 UNION"
                    disabled={!isMember}
                    loading={registering}
                    onClick={handleRegister}
                  />
                  <Label as="p" mt="21px">
                    Get UNION by{" "}
                    <Link href="/get-started/stake">staking DAI</Link>
                  </Label>
                </Box>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  );
}
