import { Box, Heading, Text } from "@unioncredit/ui";

export default function BlacklistedView() {
  return (
    <Box fluid justify="center">
      <Box align="center" direction="vertical" maxw="440px">
        <Heading align="center" size="xxlarge" mb="12px" mt="48px">
          No Access
        </Heading>
        <Text align="center">This address prohibits access to this page</Text>
      </Box>
    </Box>
  );
}
