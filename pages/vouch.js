import Head from "next/head";
import Container from "@components/container";
import Button from "@components/button";
import HealthBar from "@components/healthBar";

export default function Vouch() {
  return (
    <div>
      <Head>
        <title>Vouch | Union</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="flex justify-between mb-10">
          <div>
            <p>Total credit vouched for you</p>
            <p className="font-semibold">21,000 DAI</p>
          </div>
          <div>
            <Button type="invert">Open request for credit</Button>
          </div>
        </div>

        <div className="mb-5">
          <div className="h-12 w-full bg-primary-500" />
        </div>

        <div className="mb-10">
          <h1>Addresses who vouched for you</h1>
        </div>

        <div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Percentage</th>
                <th className="px-4 py-2">Vouched</th>
                <th className="px-4 py-2">Used</th>
                <th className="px-4 py-2">Health</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">mirshko.eth</td>
                <td className="border px-4 py-2">70%</td>
                <td className="border px-4 py-2">250 DAI</td>
                <td className="border px-4 py-2">100 DAI</td>
                <td className="border px-4 py-2">
                  <HealthBar health={50} />
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border px-4 py-2">lexi.eth</td>
                <td className="border px-4 py-2">40%</td>
                <td className="border px-4 py-2">250 DAI</td>
                <td className="border px-4 py-2">100 DAI</td>
                <td className="border px-4 py-2">
                  <HealthBar health={100} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}
