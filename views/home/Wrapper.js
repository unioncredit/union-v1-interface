import { Box } from "union-ui";

export default function Wrapper({ children, ...props }) {
  return (
    <Box
      fluid
      className="home-wrapper"
      direction="vertical"
      align="center"
      mx="auto"
      {...props}
    >
      {children}
    </Box>
  );
}
