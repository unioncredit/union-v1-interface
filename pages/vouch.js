import Button from "@components/button";
import Container from "@components/container";
import HealthBar from "@components/healthBar";
import LabelPair from "@components/labelPair";
import Head from "next/head";

export default function Vouch() {
  return (
    <div>
      <Head>
        <title>Vouch | Union</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="flex justify-between mb-6">
          <LabelPair
            label="Total credit vouched for you"
            value="21,000 DAI"
            large
          />

          <div>
            <Button type="invert">Open request for credit</Button>
          </div>
        </div>

        <div className="mb-12">
          <div className="h-16 flex rounded overflow-hidden relative w-full">
            <div className="h-16 w-1/12 bg-secondary-100" />
            <div className="h-16 w-3/12 bg-secondary-200" />
            <div className="h-16 w-8/12 bg-secondary-500" />
          </div>
        </div>

        <div className="mb-6">
          <h1>Addresses who vouched for you</h1>
        </div>

        <div className="bg-white border rounded p-4 md:p-6">
          <table className="table-auto w-full border-none">
            <thead>
              <tr>
                <th className="pb-8 pt-4 leading-none border-b text-left">
                  Address
                </th>
                <th className="pb-8 pt-4 leading-none border-b text-right">
                  Percentage
                </th>
                <th className="pb-8 pt-4 leading-none border-b text-right">
                  Vouched
                </th>
                <th className="pb-8 pt-4 leading-none border-b text-right">
                  Used
                </th>
                <th className="pb-8 pt-4 leading-none border-b text-right">
                  Health
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 border-b">mirshko.eth</td>
                <td className="py-4 border-b text-right">70%</td>
                <td className="py-4 border-b text-right">250 DAI</td>
                <td className="py-4 border-b text-right">100 DAI</td>
                <td className="py-4 border-b text-right">
                  <HealthBar health={50} />
                </td>
              </tr>
              <tr>
                <td className="py-4 border-b">lexi.eth</td>
                <td className="py-4 border-b text-right">40%</td>
                <td className="py-4 border-b text-right">250 DAI</td>
                <td className="py-4 border-b text-right">100 DAI</td>
                <td className="py-4 border-b text-right">
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
