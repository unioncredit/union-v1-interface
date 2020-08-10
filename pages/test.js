import Button from "components/button";
import useWeb3 from "hooks/useWeb3";
import Head from "next/head";
import { useEffect } from "react";

export default function TestPage() {
  const { connect, disconnect, account, error } = useWeb3();

  useEffect(() => {
    if (error) {
      window.alert(error.message);
    }
  }, [error]);

  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Test | Union</title>
      </Head>

      <div className="px-4 max-w-md mx-auto">
        <Account />
        <ChainId />

        {account ? (
          <Button full invert onClick={disconnect}>
            Disconnect
          </Button>
        ) : (
          <Button full onClick={connect}>
            Connect
          </Button>
        )}
      </div>
    </div>
  );
}

const Account = () => {
  const { account } = useWeb3();

  return (
    <div className="flex justify-between mb-4 space-x-8">
      <p>
        Account <span>🤖</span>
      </p>
      <p className="truncate">{account ?? ""}</p>
    </div>
  );
};

const ChainId = () => {
  const { chainId } = useWeb3();

  return (
    <div className="flex justify-between mb-4 space-x-8">
      <p>
        Chain Id <span>⛓</span>
      </p>
      <p>{chainId ?? ""}</p>
    </div>
  );
};
