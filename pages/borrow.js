import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import BorrowView from "views/borrow";

export default function BorrowPage() {
  const { account, library } = useWeb3React();

  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Borrow | Union</title>
        <meta property="og:title" content="Borrow | Union" />
        <meta name="twitter:title" content="Borrow | Union" />
      </Head>

      {account && library ? <BorrowView /> : <LoggedOutView />}
    </div>
  );
}
