import {
  Card,
  Label,
  Avatar,
  Button,
  Box,
  Heading,
  Text,
  Grid,
  Badge,
  Skeleton,
} from "@unioncredit/ui";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";
import { ReactComponent as Chevron } from "@unioncredit/ui/lib/icons/chevron.svg";

import { options, switchChain } from "util/switchChain";
import styles from "../components-ui/loginOptions.module.css";
import useChainId from "hooks/useChainId";
import useOmniMemberStatus from "hooks/data/useOmniMemberStatus";
import { ZERO } from "constants/variables";
import format from "util/formatValue";

export default function UnsupportedChainView() {
  const [loading, setIsLoading] = useState(false);
  const { connector } = useWeb3React();
  const chainId = useChainId();
  const { data: memberStatuses } = useOmniMemberStatus();

  const handleChangeNetwork = (value) => async () => {
    try {
      setIsLoading(value.buttonVariant);
      const provider = await connector.getProvider();
      await switchChain(value, provider);
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box align="center" direction="vertical" fluid>
      <Box mt="48px" className="hide-lt-600" />
      <Heading
        mb="24px"
        mt="16px"
        size="xlarge"
        weight="medium"
        grey={800}
        align="center"
      >
        Select a Network
      </Heading>
      <Grid>
        <Grid.Row justify="center">
          <Grid.Col>
            <Box fluid align="center">
              <Card packed className={styles.outterCard}>
                {options.map((props) => {
                  const { label, value, avatar } = props;
                  const status = memberStatuses?.[props.chainId] || {};
                  const { isMember = false, creditLimit = ZERO } = status;

                  return (
                    <Card
                      my="6px"
                      packed
                      key={value}
                      onClick={handleChangeNetwork(props)}
                      className={styles.innerCard}
                    >
                      <Card.Body>
                        <Box align="center">
                          <Box justify="center" mr="16px">
                            <Avatar size={48} src={avatar} />
                          </Box>
                          <Box direction="vertical">
                            <Text as="h3" m={0} grey={800}>
                              {label}
                            </Text>
                            <Label as="p" m={0}>
                              {status.isMember === undefined ? (
                                <Skeleton width={100} height={14} mt="4px" />
                              ) : isMember ? (
                                <Box align="center">
                                  <svg
                                    width="16"
                                    height="16"
                                    fill="none"
                                    viewBox="0 0 16 16"
                                    style={{ marginRight: "4px" }}
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16V16ZM11.707 6.707C11.8892 6.5184 11.99 6.2658 11.9877 6.0036C11.9854 5.7414 11.8802 5.49059 11.6948 5.30518C11.5094 5.11977 11.2586 5.0146 10.9964 5.01233C10.7342 5.01005 10.4816 5.11084 10.293 5.293L7 8.586L5.707 7.293C5.5184 7.11084 5.2658 7.01005 5.0036 7.01233C4.7414 7.0146 4.49059 7.11977 4.30518 7.30518C4.11977 7.49059 4.0146 7.7414 4.01233 8.0036C4.01005 8.2658 4.11084 8.5184 4.293 8.707L6.293 10.707C6.48053 10.8945 6.73484 10.9998 7 10.9998C7.26516 10.9998 7.51947 10.8945 7.707 10.707L11.707 6.707V6.707Z"
                                      fill="#3B82F6"
                                    />
                                  </svg>{" "}
                                  Member &sdot;{" "}
                                  {format(formatEther(creditLimit), 2)} DAI
                                  Available
                                </Box>
                              ) : (
                                <>Not a member</>
                              )}
                            </Label>
                            <Box mt="8px">
                              {Number(chainId) == props.chainId && (
                                <Badge
                                  label="Selected in wallet"
                                  color="blue"
                                />
                              )}
                            </Box>
                          </Box>
                          <Button
                            loading={loading}
                            variant="lite"
                            icon={Chevron}
                            ml="auto"
                          />
                        </Box>
                      </Card.Body>
                    </Card>
                  );
                })}
              </Card>
            </Box>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </Box>
  );
}
