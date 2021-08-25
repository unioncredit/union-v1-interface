import Head from "next/head";
import Link from "next/link";
import { Box, Heading, Layout, Button } from "union-ui";

export default function ErrorView() {
  return (
    <Layout>
      <Layout.Main>
        <Head>
          <title>Error | Union</title>
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
          <Heading align="center">An unexpected error occurred</Heading>
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
