import Head from "next/head";
import Container from "@components/container";
import Button from "@components/button";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Union</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="flex -mx-3">
          <div className="w-1/2 px-3">
            <div className="bg-secondary-100 border border-secondary-200 rounded p-4 md:p-6 h-full text-center">
              <h2 className="mb-4 text-2xl font-semibold">
                Become part of Union
              </h2>

              <p className="mb-8">
                Borrow tokens with no collateral, vouch for other people and
                earn higher interest when staking.{" "}
              </p>

              <Button wide type="secondary">
                Become a member
              </Button>

              <p className="text-sm mt-4">
                Already have an account?{" "}
                <button className="underline font-medium">
                  Connect your wallet
                </button>
              </p>
            </div>
          </div>
          <div className="w-1/2 px-3">
            <div className="bg-primary-100 border border-primary-500 rounded p-4 md:p-6 h-full text-center">
              <h2 className="mb-4 text-2xl font-semibold">
                Are you just looking to stake?
              </h2>

              <p className="mb-8">
                Connect your Ethereum wallet in order to use Union.
              </p>

              <Button wide>Start staking</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
