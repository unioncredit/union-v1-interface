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
import { switchChain, options } from "util/switchChain";

export default function UnsupportedChainView() {
  const [loading, setIsLoading] = useState(false);

  const handleChangeNetwork = (value) => async () => {
    try {
      setIsLoading(value.buttonVariant);
      await switchChain(value);
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box justify="center" align="center" direction="vertical" fluid>
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
          <Grid.Col md={12} lg={9}>
            <Grid.Row>
              {options.map((props) => {
                const { label, value, imageSrc, description, buttonVariant } =
                  props;
                return (
                  <Grid.Col xs={12} md={6} key={label}>
                    <Card mb="24px">
                      <Card.Body>
                        <Box justify="center" mb="24px">
                          <Avatar size={48} src={imageSrc} />
                        </Box>
                        <Text grey={800} weight="medium" as="h2" align="center">
                          {label}
                        </Text>
                        <Label as="p" align="center">
                          {description}
                        </Label>
                        <Button
                          fluid
                          mt="24px"
                          variant={buttonVariant}
                          loading={loading === buttonVariant}
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
  );
}