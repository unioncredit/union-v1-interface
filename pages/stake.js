import Button from "@components/button";
import Container from "@components/container";
import DepositModal from "@components/depositModal";
import StakeCard from "@components/stakeCard";
import StakeTable from "@components/stakeTable";
import TrustModal from "@components/trustModal";
import WithdrawModal from "@components/withdrawModal";
import { useTrustModalToggle } from "@contexts/Stake";
import Head from "next/head";
import { useMemo } from "react";

export default function Stake() {
  const toggleTrustModal = useTrustModalToggle();

  /**
   * @todo Hook up to contract
   */
  const data = useMemo(
    () => [
      {
        address: "mirshko.eth",
        vouched: 250,
        used: 100,
        health: 75
      },
      {
        address: "lexi.eth",
        vouched: 400,
        used: 250,
        health: 50
      }
    ],
    []
  );

  return (
    <div>
      <Head>
        <title>Stake | Union</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="flex -mx-2">
          <div className="w-5/12 px-2">
            <div className="mb-5">
              <h1 className="leading-loose">Stake</h1>
            </div>

            <StakeCard />
          </div>

          <div className="w-7/12 px-2">
            <div className="flex justify-between items-center mb-5">
              <h2 className="leading-loose">Addresses You Trust</h2>

              <Button invert disabled onClick={toggleTrustModal}>
                Trust a new member
              </Button>
            </div>

            <div className="bg-white border rounded p-4 md:p-6">
              <StakeTable data={data} />
              {/* <table>
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Vouched</th>
                    <th>Used</th>
                    <th>Health</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>mirshko.eth</td>
                    <td>250 DAI</td>
                    <td>100 DAI</td>
                    <td>
                      <HealthBar health={75} />
                    </td>
                  </tr>
                  <tr>
                    <td>lexi.eth</td>
                    <td>250 DAI</td>
                    <td>100 DAI</td>
                    <td>
                      <HealthBar health={50} />
                    </td>
                  </tr>
                </tbody>
              </table> */}
            </div>
          </div>
        </div>
      </Container>

      <TrustModal />
      <DepositModal />
      <WithdrawModal />
    </div>
  );
}
