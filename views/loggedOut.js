import { Box } from "union-ui";
import { SignInCard, LiteWrapper } from "components-ui";

export default function LoggedOutView() {
  return (
    <LiteWrapper>
      <Box justify="center" align="center" fluid mb="10vh">
        <SignInCard />
      </Box>
    </LiteWrapper>
  );
}
