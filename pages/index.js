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

      <div className="w-full mx-auto max-w-screen-md-gutter">
        <div className="flex -mx-3">
          <div className="w-1/2 px-3">
            <div className="bg-secondary-100 border border-secondary-200 rounded p-4 md:p-6 h-full text-center">
              <h2 className="mb-4">Become part of Union</h2>

              <p className="mb-8">
                Borrow tokens with no collateral, vouch for other people and
                earn higher interest when staking.
              </p>

              <Link href="/borrow">
                <a className="btn btn-secondary w-full"> Become a member</a>
              </Link>

              <p className="text-sm mt-4">
                Already have an account?{" "}
                <button
                  className="underline font-medium"
                  onClick={toggleWalletModal}
                >
                  Connect your wallet
                </button>
              </p>
            </div>
          </div>
          <div className="w-1/2 px-3">
            <div className="bg-primary-100 border border-primary-500 rounded p-4 md:p-6 h-full text-center">
              <h2 className="mb-4">Are you just looking to stake?</h2>

              <p className="mb-8">
                Connect your Ethereum wallet in order to <br />
                use Union.
              </p>

              <Link href="/stake">
                <a className="btn btn-primary w-full">Start staking</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
