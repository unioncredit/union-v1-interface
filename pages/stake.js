import Head from "next/head";
import Container from "@components/container";
import Button from "@components/button";
import HealthBar from "@components/healthBar";

export default function Stake() {
  return (
    <div>
      <Head>
        <title>Stake | Union</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="flex -mx-2">
          <div className="w-5/12 px-2">
            <div className="mb-5 h-12">
              <h1 className="text-2xl font-semibold">Stake</h1>
            </div>

            <div className="bg-primary-100 border border-primary-500 rounded p-4 md:p-6">
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

          <div className="w-7/12 px-2">
            <div className="flex justify-between items-center mb-5 h-12">
              <h2 className="text-2xl font-semibold">Addresses You Trust</h2>

              <Button type="invert">Trust a new member</Button>
            </div>

            <div className="bg-white border border-gray-400 rounded p-4 md:p-6">
              <table className="table-auto w-full border-none ">
                <thead>
                  <tr>
                    <th className="pb-8 pt-4 leading-none border-b border-gray-400 text-left">
                      Address
                    </th>
                    <th className="pb-8 pt-4 leading-none border-b border-gray-400 text-right">
                      Vouched
                    </th>
                    <th className="pb-8 pt-4 leading-none border-b border-gray-400 text-right">
                      Used
                    </th>
                    <th className="pb-8 pt-4 leading-none border-b border-gray-400 text-right">
                      Health
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 border-b border-gray-400">
                      mirshko.eth
                    </td>
                    <td className="py-3 border-b border-gray-400">250 DAI</td>
                    <td className="py-3 border-b border-gray-400">100 DAI</td>
                    <td className="py-3 border-b border-gray-400">
                      <HealthBar health={75} />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 border-b border-gray-400">lexi.eth</td>
                    <td className="py-3 border-b border-gray-400">250 DAI</td>
                    <td className="py-3 border-b border-gray-400">100 DAI</td>
                    <td className="py-3 border-b border-gray-400">
                      <HealthBar health={50} />
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
