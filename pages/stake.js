import Button from "@components/button";
import StakeCard from "@components/stakeCard";
import StakeTable from "@components/stakeTable";
import TrustModal from "@components/trustModal";
import { useTrustModalToggle } from "@contexts/Stake";
import Head from "next/head";
import { useMemo } from "react";

export default function Stake() {
  const toggleTrustModal = useTrustModalToggle();

  /**
   * @todo Hook up to contract
   * @description memoized array of objects
   * @example useMemo(
    () => [
      {
        address: "0xf6fDeE29e3A14610fdbE187e2d3442543cfA45B8",
        vouched: 250,
        used: 100,
        health: 75
      },
      {
        address: "0xc92df132c0588c3d337d2e70225a9e85f2338088",
        vouched: 400,
        used: 250,
        health: 50
      }
    ],
    []
  )
   */
  const data = useMemo(() => [], []);

  return (
    <div>
      <Head>
        <title>Stake | Union</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className="flex -mx-2 mb-5">
          <div className="w-5/12 px-2">
            <h1 className="leading-loose">Stake</h1>
          </div>

          <div className="w-7/12 px-2">
            <div className="flex justify-between items-center">
              <h2 className="leading-loose">Addresses You Trust</h2>

              <Button invert onClick={toggleTrustModal}>
                Trust a new member
              </Button>
            </div>
          </div>
        </div>

        <div className="flex -mx-2">
          <div className="w-5/12 px-2">
            <StakeCard />
          </div>

          <div className="w-7/12 px-2">
            <StakeTable data={data} />
          </div>
        </div>
      </div>

      <TrustModal />
    </div>
  );
}
