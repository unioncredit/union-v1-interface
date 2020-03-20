import Button from "@components/button";
import Container from "@components/container";
import HealthBar from "@components/healthBar";
import LabelPair from "@components/labelPair";
import VouchBar from "@components/vouchBar";
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

        <VouchBar className="mb-12" slices={[60, 20, 10, 5, 3, 2]} />

        <div className="mb-6">
          <h1>Addresses who vouched for you</h1>
        </div>

        <div className="bg-white border rounded p-4 md:p-6">
          <table>
            <thead>
              <tr>
                <th>Address</th>
                <th>Percentage</th>
                <th>Vouched</th>
                <th>Used</th>
                <th>Health</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>mirshko.eth</td>
                <td>70%</td>
                <td>250 DAI</td>
                <td>100 DAI</td>
                <td>
                  <HealthBar health={50} />
                </td>
              </tr>
              <tr>
                <td>lexi.eth</td>
                <td>40%</td>
                <td>250 DAI</td>
                <td>100 DAI</td>
                <td>
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
