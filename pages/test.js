import Button from "components/button";
import useWeb3 from "hooks/useWeb3";
import Head from "next/head";
import { useEffect } from "react";
import { formatEther } from "@ethersproject/units";
import useSWR from "swr";

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
        <Balance />

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
        Account{" "}
        <span role="img" aria-label="robot">
          🤖
        </span>
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
        Chain Id{" "}
        <span role="img" aria-label="chain">
          ⛓
        </span>
      </p>
      <p>{chainId ?? ""}</p>
    </div>
  );
};

const getBalance = async (_, account, library) => {
  const balance = await library.getBalance(account);

  return balance;
};

const Balance = () => {
  const { account, library, chainId } = useWeb3();

  const shouldFetch =
    typeof account === "string" && library && typeof chainId === "number";

  const { data: balance } = useSWR(
    shouldFetch ? ["EthBalance", account, library, chainId] : null,
    getBalance
  );

  return (
    <div className="flex justify-between mb-4 space-x-8">
      <p>
        Balance{" "}
        <span role="img" aria-label="gold">
          💰
        </span>
      </p>
      <p>{balance ? formatEther(balance) : ""}</p>
    </div>
  );
};
