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
} from "@unioncredit/ui";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { options, switchChain } from "util/switchChain";
import { networks } from "lib/connectors";
import { ReactComponent as Chevron } from "@unioncredit/ui/lib/icons/chevron.svg";
import styles from "../components-ui/loginOptions.module.css";

export default function UnsupportedChainView() {
  const [loading, setIsLoading] = useState(false);
  const { connector } = useWeb3React();

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
        mb="4px"
        mt="16px"
        size="xlarge"
        weight="medium"
        grey={800}
        align="center"
      >
        You’re connect to an unsupported network
      </Heading>
      <Text grey={500} mb="32px" align="center">
        Select one of our major supported networks below
      </Text>
      <Grid>
        <Grid.Row justify="center">
          <Grid.Col>
            <Box fluid align="center">
              <Card packed className={styles.outterCard}>
                {options
                  .filter((option) =>
                    Object.keys(networks).includes(String(option.chainId))
                  )
                  .map((props) => {
                    const { label, value, avatar, description, badges } = props;
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
                                {description}
                              </Label>
                              <Box mt="4px">
                                {badges.map(({ label, color }) => (
                                  <Badge
                                    key={label}
                                    label={label}
                                    color={color}
                                    mr="4px"
                                  />
                                ))}
                              </Box>
                            </Box>
                            <Button
                              loading={loading}
                              variant="lite"
                              icon={Chevron}
                              ml="4px"
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
