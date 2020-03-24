import { useWalletModalToggle } from "@contexts/Application";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const toggleWalletModal = useWalletModalToggle();

  return (
    <div>
      <Head>
        <title>Union</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className="bg-white border max-w-md mx-auto rounded p-4 sm:p-6 md:p-8 text-center">
          <h1 className="mb-4">Join Union</h1>
          <p className="text-lg leading-6 text-grey-pure mb-48">
            Borrow tokens with no collateral, vouch for other people and earn
            higher interest when staking.{" "}
          </p>

          <Link href="/stake">
            <a className="btn btn-primary w-full">Start now</a>
          </Link>

          <p className="mt-4">
            Already have an account?{" "}
            <button
              className="underline font-medium"
              onClick={toggleWalletModal}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
