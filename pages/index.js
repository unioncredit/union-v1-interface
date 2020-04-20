import Button from "@components/button";
import { useWalletModalToggle } from "@contexts/Application";
import Head from "next/head";
import { Fragment } from "react";
import Benefits from "@components/benefits";

const JoinCard = () => {
  const toggleWalletModal = useWalletModalToggle();

  return (
    <div className="bg-white border max-w-md mx-auto rounded p-4 sm:p-6 md:p-8 text-center">
      <div
        className="bg-border-pure mx-auto"
        style={{ height: 130, width: "100%", maxWidth: 280 }}
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
        <meta property="og:title" content="Union" />
        <meta name="twitter:title" content="Union" />
      </Head>

      <section className="py-12 md:pb-72 relative overflow-hidden">
        <div className="container-sm z-10">
          <div className="flex flex-col md:flex-row -mx-8">
            <div className="w-full md:w-1/2 px-8">
              <div>
                <h1 className="text-3xl md:text-4xl md:mt-20 mb-6 md:mb-8">
                  Credit backed by trust
                </h1>
                <p className="text-lg md:text-xl leading-tight font-normal mb-6 md:mb-8 max-w-md">
                  Union works without the need for collateral, credit score, or
                  revealing personal information on a public ledger.
                </p>

                <Button className="btn-full-mobile">Get started</Button>

                <div className="mt-12">
                  <img
                    src="/images/credit-backed-by-trust.svg"
                    alt="Credit backed by trust"
                    className="relative"
                    style={{ zIndex: -2 }}
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 px-8">
              <div className="ml-10 md:ml-16 mt-16">
                <p className="text-type-light mb-6">
                  Trusted by industry lead companies
                </p>
                <div className="flex flex-wrap items-center -mb-4 -mr-8 md:-mr-16">
                  <div className="pb-4 pr-8 md:pr-16">
                    <img src="/images/1kx.svg" alt="1kx" />
                  </div>
                  <div className="pb-4 pr-8 md:pr-16">
                    <img src="/images/kr1.svg" alt="KR1" />
                  </div>
                  <div className="pb-4 pr-8 md:pr-16">
                    <img src="/images/coinfund.svg" alt="CoinFund" />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="w-full md:w-1/2 px-8">
              <div className="-mb-72">
                <img src="https://placehold.it/680x586/E0E4EA/E0E4EA" alt="" />

                
              </div>
            </div> */}
          </div>
        </div>

        <div
          className="bg-pink-light absolute bottom-0 left-0 w-full h-80"
          style={{
            zIndex: -2,
            transform: "skew(0, -4.76deg) translateY(calc(50vw / 12))",
          }}
        />
      </section>

      <section className="pt-16 pb-0 sm:py-16 md:py-20 lg:pb-20 lg:pt-40">
        <div className="container-sm">
          <div className="flex flex-col md:flex-row -mx-8">
            <div className="w-full md:w-1/2 px-8 mb-12 md:mb-0">
              <div>
                <h2 className="text-2xl md:text-3xl mb-6 md:mb-8">
                  Union key benefits
                </h2>
                <p className="md:text-xl leading-tight font-normal mb-6 md:mb-10 md:max-w-md">
                  You can join union by yourself and be able to just stake or
                  join with the help of 3 friends vouching for you and enjoy all
                  the benefits of Union
                </p>
                <Button className="btn-full-mobile" wide>
                  Get started
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-8 flex md:justify-end">
              <Benefits />
            </div>
          </div>
        </div>
      </section>

      <section className="container-sm hidden md:block">
        <div className="divider"></div>
      </section>

      <section className="py-12 md:py-20 lg:pt-24 lg:pb-32">
        <div className="container-sm">
          <div className="flex flex-col md:flex-row-reverse -mx-8">
            <div className="w-full md:w-1/2 px-8 flex justify-end">
              <div>
                <h2 className="text-2xl md:text-3xl mb-8 md:mb-10">
                  Become your own bank
                </h2>

                <div className="block md:hidden pb-8">
                  <img
                    src="/images/become-your-own-bank.svg"
                    alt="Become your own bank"
                    className="-mb-6"
                  />
                </div>

                <ol className="max-w-md">
                  <li className="pb-4 md:pb-6">
                    <div className="rounded p-6 bg-white shadow-card leading-tight flex items-center">
                      <div className="mr-4 h-10 w-10 rounded-full bg-pink-2-light text-xl font-semibold leading-10 text-center">
                        1
                      </div>
                      <div className="flex-1">
                        Easily manage who you trust and how much you trust them
                        with.
                      </div>
                    </div>
                  </li>
                  <li className="pb-4 md:pb-6">
                    <div className="rounded p-6 bg-white shadow-card leading-tight flex items-center">
                      <div className="mr-4 h-10 w-10 rounded-full bg-pink-2-light text-xl font-semibold leading-10 text-center">
                        2
                      </div>
                      <div className="flex-1">
                        See how much they’ve used from your pool
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="rounded p-6 bg-white shadow-card leading-tight flex items-center">
                      <div className="mr-4 h-10 w-10 rounded-full bg-pink-2-light text-xl font-semibold leading-10 text-center">
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
            <div className="w-full md:w-1/2 px-8 hidden md:block">
              <img
                src="/images/become-your-own-bank.svg"
                alt="Become your own bank"
                className="-mb-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-border-light py-8 sm:py-12 md:py-24">
        <div className="container-sm">
          <div className="flex flex-col md:flex-row md:items-center -mx-8">
            <div className="w-full md:w-1/2 px-8 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl mb-6 md:mb-8">
                Your circle of trust
              </h2>
              <p className="md:text-xl leading-tight font-normal max-w-md">
                Union is all about trust. Create your own cirlce of trust where
                you, your friends and family can borrow funds whenever needed.
              </p>
            </div>
            <div className="w-full md:w-1/2 px-8 flex justify-end">
              <img
                src="/images/circle-of-trust.svg"
                alt="Your circle of trust"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black-pure text-white py-8 sm:py-12 md:py-20 lg:py-32">
        <div className="container-sm">
          <div className="flex flex-col md:flex-row-reverse -mx-8">
            <div className="w-full md:w-1/2 px-8 mb-8 md:mb-0">
              <div className="max-w-md">
                <h2 className="text-2xl md:text-3xl mb-6 md:mb-4">
                  Check what you can build with Union
                </h2>
                <p className="md:text-xl leading-tight font-normal mb-6 md:mb-8">
                  Ability to give your smart contracts credit lines and more.
                </p>
                <Button className="btn-full-mobile" wide>
                  Read the docs
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-8">
              <img src="https://placehold.it/508x264/E0E4EA/E0E4EA" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-10 sm:py-12 md:py-20">
        <div className="container-sm">
          <h2 className="text-3xl mb-20 text-center">Union member stats</h2>
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

      <div className="container-sm">
        <div className="divider"></div>
      </div> */}

      <section className="pt-10 pb-4 sm:pb-10 sm:pt-20 lg:pt-32">
        <div className="container-sm">
          <div className="flex flex-col sm:flex-row -mx-8">
            <div className="w-full sm:w-1/2 px-8 mb-12 sm:mb-0">
              <div>
                <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-10">
                  Learn more about Union
                </h2>
                <Button className="btn-full-mobile" wide>
                  Read the white paper
                </Button>
              </div>
            </div>
            <div className="w-full sm:w-1/2 px-8 flex justify-end">
              <img
                className="w-56 sm:w-72"
                src="/images/learn-more.svg"
                alt="Learn more about Union"
              />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
