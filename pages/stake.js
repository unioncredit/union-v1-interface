import Head from "next/head";
import Container from "@components/container";

export default function Stake() {
  return (
    <div>
      <Head>
        <title>Stake | Union</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div>
          <h1>Stake</h1>

          <div>
            <div>
              <p>Your total stake</p>
              <p>900 DAI</p>
            </div>

            <div>
              <p>Rewards multiplier</p>
              <p>X1</p>
            </div>

            <div>
              <button>Deposit</button>
              <button>Withdraw</button>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h2>Addresses You Trust</h2>

            <button>Trust a new member</button>
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
      </Container>
    </div>
  );
}
