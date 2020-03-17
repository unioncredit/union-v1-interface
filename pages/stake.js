import Head from "next/head";
import Container from "@components/container";
import Button from "@components/button";

export default function Stake() {
  return (
    <div>
      <Head>
        <title>Stake | Union</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="flex -mx-3">
          <div className="w-1/2 px-3">
            <div className="mb-5">
              <h1>Stake</h1>
            </div>

            <div className="bg-pink-100 border border-pink-200 rounded p-6">
              <div>
                <p>Your total stake</p>
                <p className="font-semibold">900 DAI</p>
              </div>

              <div className="flex justify-between">
                <p>Utilized Stake</p>
                <p className="font-semibold">700 DAI</p>
              </div>

              <div className="flex justify-between">
                <p>Defaulted Stake</p>
                <p className="font-semibold">0 DAI</p>
              </div>

              <div className="flex justify-between">
                <p>Withdrawable Stake</p>
                <p className="font-semibold">200 DAI</p>
              </div>

              <div>
                <p>Rewards multiplier</p>
                <p className="font-semibold">X1</p>
              </div>

              <div className="flex justify-between">
                <p>Rewards</p>
                <p className="font-semibold">0 DAI</p>
              </div>

              <div className="flex justify-between">
                <p>Union Per Year (UPY)</p>
                <p className="font-semibold">1.87 UPY</p>
              </div>

              <div className="flex -mx-3">
                <div className="flex-1 px-3">
                  <Button type="secondary" wide>
                    Deposit
                  </Button>
                </div>
                <div className="flex-1 px-3">
                  <Button type="invert" wide>
                    Withdraw
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 px-3">
            <div className="flex justify-between items-center mb-5">
              <h2>Addresses You Trust</h2>

              <Button type="invert">Trust a new member</Button>
            </div>

            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Vouched</th>
                  <th className="px-4 py-2">Used</th>
                  <th className="px-4 py-2">Health</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">mirshko.eth</td>
                  <td className="border px-4 py-2">250 DAI</td>
                  <td className="border px-4 py-2">100 DAI</td>
                  <td className="border px-4 py-2">
                    <progress value="50" max="100" />
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border px-4 py-2">lexi.eth</td>
                  <td className="border px-4 py-2">250 DAI</td>
                  <td className="border px-4 py-2">100 DAI</td>
                  <td className="border px-4 py-2">
                    <progress value="100" max="100" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
}
