import ApplicationCard from "@components/applicationCard";
import Button from "@components/button";
import CreditRequestModal from "@components/creditRequestModal";
import LabelPair from "@components/labelPair";
import VouchBar from "@components/vouchBar";
import VouchTable from "@components/vouchTable";
import { useCreditRequestModalToggle } from "@contexts/Vouch";
import Head from "next/head";
import { useMemo } from "react";

export default function Vouch() {
  const toggleCreditRequestModal = useCreditRequestModalToggle();

  const data = {
    /**
     * @type {String}
     * @example 21,000 DAI
     */
    vouch: "0 DAI",
    /**
     * @type {Array<Number>}
     * @example [70, 30]
     */
    vouches: [],
    /**
   * @todo Hook up to contract
   * @description memoized array of objects
   * @example useMemo(
    () => [
      {
        address: "0xf6fDeE29e3A14610fdbE187e2d3442543cfA45B8",
        percentage: 70
        vouched: 250,
        used: 100,
        health: 75
      },
      {
        address: "0xc92df132c0588c3d337d2e70225a9e85f2338088",
        percentage: 30
        vouched: 400,
        used: 250,
        health: 50
      }
    ],
    []
  )
   */
    data: useMemo(() => [], [])
  };

  return (
    <div>
      <Head>
        <title>Vouch | Union</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <ApplicationCard />

        <div className="flex justify-between mb-6">
          <LabelPair
            label="Total credit vouched for you"
            value={data.vouch}
            large
          />

          <div>
            <Button invert onClick={toggleCreditRequestModal}>
              Open request for credit
            </Button>
          </div>
        </div>

        <VouchBar className="mb-10" slices={data.vouches} />

        <div className="mb-6">
          <h1>Addresses who vouched for you</h1>
        </div>

        <VouchTable data={data.data} />
      </div>

      <CreditRequestModal />
    </div>
  );
}
