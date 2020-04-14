import Button from "@components/button";
import { useWalletModalToggle } from "@contexts/Application";
import Head from "next/head";
import { Fragment } from "react";

const JoinCard = () => {
  const toggleWalletModal = useWalletModalToggle();

  return (
    <div className="bg-white border max-w-md mx-auto rounded p-4 sm:p-6 md:p-8 text-center">
      <div
        className="bg-border-pure mx-auto"
        style={{ height: 130, width: 280 }}
      />

      <h1 className="mb-4 mt-6">Join Union</h1>
      <p className="text-lg leading-6 text-grey-pure mb-8">
        Borrow tokens with no collateral, vouch for other people and earn higher
        interest when staking.
      </p>

      <Button onClick={toggleWalletModal} full>
        Start now
      </Button>

      <p className="mt-4">
        Already have an account?{" "}
        <button className="underline font-medium" onClick={toggleWalletModal}>
          Sign in
        </button>
      </p>
    </div>
  );
};

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Union</title>
      </Head>

      <section className="py-10 sm:py-12 md:py-20 lg:pb-32 relative overflow-hidden">
        <div className="container z-10">
          <div className="flex">
            <div className="w-1/2">
              <div>
                <h1 className="text-4xl mb-8 mt-20">Credit backed by trust</h1>
                <p className="text-xl leading-tight font-normal mb-10 max-w-md">
                  Union works without the need for collateral, credit score, or
                  revealing personal information on a public ledger.
                </p>
                <Button>Get started</Button>
              </div>
            </div>
            <div className="w-1/2">
              <div
                className="bg-grey-light"
                style={{ width: 680, height: 586 }}
              ></div>
            </div>
          </div>
        </div>

        <div
          className="bg-pink-light absolute bottom-0 left-0 w-full"
          style={{
            height: 400,
            zIndex: -1,
            transform: "skew(0, -4.76deg) translateY(calc(50vw / 12))",
            minHeight: "400px",
          }}
        ></div>
      </section>

      <section className="py-10 sm:py-12 md:py-20 lg:pb-24 lg:pt-32">
        <div className="container">
          <h2 className="text-3xl mb-8">Union key benefits</h2>
          <p className="text-xl leading-tight font-normal mb-10 max-w-md">
            You can join union by yourself and be able to just stake or join
            with the help of 3 friends vouching for you and enjoy all the
            benefits of Union
          </p>
          <Button>Get started</Button>
        </div>
      </section>

      <div className="container">
        <div className="divider"></div>
      </div>

      <section className="py-10 sm:py-12 md:py-20 lg:pt-24 lg:pb-32">
        <div className="container">
          <div className="flex flex-row-reverse">
            <div className="w-1/2 flex justify-end">
              <div>
                <h2 className="text-3xl mb-10 mt-6">Become your own bank</h2>
                <ol className="max-w-md">
                  <li className="pb-6">
                    <div className="rounded p-6 bg-white shadow-lg leading-tight flex items-center">
                      <div className="mr-4 h-10 w-10 rounded-full bg-pink-pure text-xl font-semibold leading-10 text-center">
                        1
                      </div>
                      <div className="flex-1">
                        Easily manage who you trust and how much you trust them
                        with.
                      </div>
                    </div>
                  </li>
                  <li className="pb-6">
                    <div className="rounded p-6 bg-white shadow-lg leading-tight flex items-center">
                      <div className="mr-4 h-10 w-10 rounded-full bg-pink-pure text-xl font-semibold leading-10 text-center">
                        2
                      </div>
                      <div className="flex-1">
                        See how much they’ve used from your pool
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="rounded p-6 bg-white shadow-lg leading-tight flex items-center">
                      <div className="mr-4 h-10 w-10 rounded-full bg-pink-pure text-xl font-semibold leading-10 text-center">
                        3
                      </div>
                      <div className="flex-1">
                        See when their due date is and adjust their trust as you
                        go along
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
            <div className="w-1/2">
              <div
                className="bg-grey-light"
                style={{ height: 545, width: 525 }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-border-light py-10 sm:py-12 md:py-20">
        <div className="container">
          <div className="flex items-center">
            <div className="w-1/2">
              <h2 className="text-3xl mb-8">Your circle of trust</h2>
              <p className="text-xl leading-tight font-normal max-w-md">
                Union is all about trust. Create your own cirlce of trust where
                you, your friends and family can borrow funds whenever needed.
              </p>
            </div>
            <div className="w-1/2 flex justify-end">
              <div
                className="bg-grey-light"
                style={{ height: 400, width: 400 }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black-pure text-white py-10 sm:py-12 md:py-20 lg:py-32">
        <div className="container">
          <h2 className="text-3xl mb-4">Check what you can build with Union</h2>
          <p className="text-xl leading-tight font-normal mb-8 max-w-md">
            Ability to give your smart contracts credit lines and more.
          </p>
          <Button>Read the docs</Button>
        </div>
      </section>

      <section className="py-10 sm:py-12 md:py-20">
        <div className="container">
          <h2 className="text-3xl mb-20 text-center">
            Union member statistics
          </h2>
          <ul className="flex justify-center">
            <li>
              <div className="p-4 text-center">
                <div className="text-3xl mb-4 leading-none font-semibold">
                  120
                </div>
                <div className="text-2xl leading-tight font-normal">
                  Members
                </div>
              </div>
            </li>
            <li className="px-6">
              <div className="vertical-divider"></div>
            </li>
            <li>
              <div className="p-4 text-center">
                <div className="text-3xl mb-4 leading-none font-semibold">
                  12,000
                </div>
                <div className="text-2xl leading-tight font-normal">
                  DAI Staked
                </div>
              </div>
            </li>
            <li className="px-6">
              <div className="vertical-divider"></div>
            </li>
            <li>
              <div className="p-4 text-center">
                <div className="text-3xl mb-4 leading-none font-semibold">
                  7,000
                </div>
                <div className="text-2xl leading-tight font-normal">
                  Borrowed to date
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <div className="container">
        <div className="divider"></div>
      </div>

      <section className="py-10 sm:py-12 md:py-20 lg:py-32">
        <div className="container">
          <h2 className="text-3xl mb-10">Learn more about Union</h2>
          <Button>Read the white paper</Button>
        </div>
      </section>
    </Fragment>
  );
}
