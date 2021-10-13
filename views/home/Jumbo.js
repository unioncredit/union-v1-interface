import { Text, Heading, Box } from "union-ui";

import Wrapper from "./Wrapper";

export default function Jumbo() {
  return (
    <>
      <Box maxw="650px">
        <img
          src="/images/jumbo-2.png"
          alt="union-community"
          className="jumbo jumbo--people"
        />
      </Box>
      <Heading mt="8px" align="center" size="xxlarge">
        No credit score, just your friend circle
      </Heading>
      <Wrapper maxw="470px">
        <Text mt="8px" align="center">
          Gain trust from your friends, build up your credit line and gain
          access to credit whenever you need it
        </Text>
      </Wrapper>
    </>
  );
}
