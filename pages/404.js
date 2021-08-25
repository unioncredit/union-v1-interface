import Head from "next/head";
import Link from "next/link";
import { Box, Heading, Text, Layout, Button } from "union-ui";

export default function Custom404Page() {
  return (
    <Layout>
      <Layout.Main>
        <Head>
          <title>404 | Union</title>
          <meta property="og:title" content="404 | Union" />
          <meta name="twitter:title" content="404 | Union" />
        </Head>

        <Box
          justify="center"
          align="center"
          my="auto"
          direction="vertical"
          fluid
        >
          <Heading align="center">This page doesn’t exist</Heading>
          <Text align="center">
            You might have mistyped the address, or the page might have moved.
          </Text>
          <Link href="/">
            <Button
              label="Take me home"
              variant="secondary"
              icon="arrow-left"
            />
          </Link>
        </Box>
      </Layout.Main>
    </Layout>
  );
}
