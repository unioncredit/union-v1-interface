import {
  Card,
  Label,
  Avatar,
  Button,
  Box,
  Heading,
  Text,
  Grid,
} from "union-ui";
import { useState } from "react";
import { LiteWrapper } from "components-ui";
import { switchChain, options } from "util/switchChain";

export default function UnsupportedChainView() {
  const [loading, setIsLoading] = useState(false);

  const handleChangeNetwork = (value) => async () => {
    setIsLoading(true);
    await switchChain(value);
    setIsLoading(false);
  };

  return (
    <LiteWrapper>
      <Box justify="center" align="center" direction="vertical" fluid mb="10vh">
        <Heading mb="4px" mt="64px" size="xlarge" weight="medium" grey={800}>
          You’re connect to an unsupported network
        </Heading>
        <Text grey={500} mb="32px">
          Select one of our major supported networks below
        </Text>
        <Grid>
          <Grid.Row justify="center">
            <Grid.Col xs={9}>
              <Grid.Row>
                {options.map((props) => {
                  const { label, value, imageSrc, description, buttonVariant } =
                    props;
                  return (
                    <Grid.Col xs={6}>
                      <Card>
                        <Card.Body>
                          <Box justify="center" mb="24px">
                            <Avatar size={48} src={imageSrc} />
                          </Box>
                          <Heading size="small" align="center">
                            {label}
                          </Heading>
                          <Label as="p" align="center">
                            {description}
                          </Label>
                          <Button
                            fluid
                            mt="24px"
                            variant={buttonVariant}
                            loading={loading}
                            label={`Switch to ${value}`}
                            onClick={handleChangeNetwork(props)}
                          />
                        </Card.Body>
                      </Card>
                    </Grid.Col>
                  );
                })}
              </Grid.Row>
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </Box>
    </LiteWrapper>
  );
}
