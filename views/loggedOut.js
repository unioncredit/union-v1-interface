import { Box } from "union-ui";
import { SignInCard, Wrapper } from "components-ui";

export default function LoggedOutView() {
  return (
    <Wrapper>
      <Box mt="auto">
        <SignInCard />
      </Box>
    </Wrapper>
  );
}
