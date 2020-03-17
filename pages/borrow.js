import Button from "@components/button";
import Container from "@components/container";
import Head from "next/head";

export default function Borrow() {
  return (
    <div>
      <Head>
        <title>Borrow | Union</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="mb-5">
          <h1>Dashboard</h1>
        </div>

        <div className="flex -mx-3">
          <div className="w-1/2 px-3">
            <div className="bg-blue-800 border border-blue-800 rounded p-6">
              <div className="flex justify-between">
                <div>
                  <p>Available Credit</p>
                  <p className="font-semibold">1520 DAI</p>
                </div>

                <Button type="tertiary">Borrow</Button>
              </div>

              <div className="flex justify-between">
                <p>Percent Utilization</p>
                <div className="flex">
                  <progress value={66.99} max={100} />
                  <p className="font-semibold">66.99%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 px-3">
            <div className="bg-white border border-grey-200 rounded p-6">
              <div className="flex justify-between">
                <div>
                  <p>Balance Owed</p>
                  <p className="font-semibold">693.34 DAI</p>
                </div>

                <Button>Repay</Button>
              </div>

              <div className="flex justify-between">
                <p>Minimum Payment Due</p>
                <p className="font-semibold">64.28 DAI</p>
              </div>

              <div className="flex justify-between">
                <p>Payment Due Date</p>
                <p className="font-semibold">in 10 Days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <h2>Transactions</h2>
        </div>
      </Container>
    </div>
  );
}
