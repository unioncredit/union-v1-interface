import Head from "next/head";
import Container from "@components/container";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Union</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Home</h1>
      </Container>
    </div>
  );
}
