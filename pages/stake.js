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

            <div className="bg-pink-100 border border-pink-200 rounded p-4 md:p-6">
              <div className="mb-4">
                <p className="text-lg">Your total stake</p>
                <p className="font-semibold text-xl">900 DAI</p>
              </div>

              <div className="flex justify-between py-2 items-center leading-tight">
                <p className="opacity-50">Utilized Stake</p>
                <p className="font-semibold text-lg text-right">700 DAI</p>
              </div>

              <div className="flex justify-between py-2 items-center leading-tight">
                <p className="opacity-50">Defaulted Stake</p>
                <p className="font-semibold text-lg text-right">0 DAI</p>
              </div>

              <div className="flex justify-between py-2 items-center leading-tight mb-10">
                <p className="opacity-50">Withdrawable Stake</p>
                <p className="font-semibold text-lg text-right">200 DAI</p>
              </div>

              <div className="mb-4">
                <p className="text-lg">Rewards multiplier</p>
                <p className="font-semibold text-xl">X1</p>
              </div>

              <div className="flex justify-between py-2 items-center leading-tight">
                <p className="opacity-50">Rewards</p>
                <p className="font-semibold text-lg text-right">0 DAI</p>
              </div>

              <div className="flex justify-between py-2 items-center leading-tight">
                <p className="opacity-50">Union Per Year (UPY)</p>
                <p className="font-semibold text-lg text-right">1.87 UPY</p>
              </div>

              <div className="flex -mx-3 mt-10">
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

            <div className="bg-white border border-gray-400 rounded p-4 md:p-6">
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
        </div>
      </Container>
    </div>
  );
}
