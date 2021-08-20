import { Box } from "union-ui";
import { SignInCard, Wrapper } from "components-ui";

export default function LoggedOutView() {
  return (
    <Wrapper>
      <Box justify="center" align="center" fluid mb="10vh">
        <SignInCard />
      </Box>
    </Wrapper>
  );
}
