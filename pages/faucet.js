import Button from "@components/button";
import LoggedOutCard from "@components/loggedOutCard";
import useCurrentToken from "@hooks/useCurrentToken";
import { getTestToken } from "@lib/contracts/getTestToken";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";

export default function FaucetPage() {
  const { library, account, chainId } = useWeb3React();

  if (!(account && library))
    return (
      <div className="my-8 md:my-10">
        <Head>
          <title>Faucet | Union</title>
          <meta property="og:title" content="Faucet | Union" />
          <meta name="twitter:title" content="Faucet | Union" />
        </Head>

        <LoggedOutCard />
      </div>
    );

  const curToken = useCurrentToken();

  const onGetToken = async () => {
    try {
      await getTestToken(curToken, 10000, library.getSigner(), chainId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-10">
      <Head>
        <title>Faucet | Union</title>
        <meta property="og:title" content="Faucet | Union" />
        <meta name="twitter:title" content="Faucet | Union" />
      </Head>

      <div className="container text-center">
        <h1 className="mb-4">Testnet Faucet</h1>

        <Button invert onClick={onGetToken}>
          Get 10000 Test Tokens
        </Button>
      </div>
    </div>
  );
}
