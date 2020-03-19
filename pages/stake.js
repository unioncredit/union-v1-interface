import Button from "@components/button";
import Container from "@components/container";
import HealthBar from "@components/healthBar";
import LabelPair from "@components/labelPair";
import Head from "next/head";

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
              <h1>Stake</h1>
            </div>

            <div className="bg-primary-100 border border-primary-500 rounded p-4 md:p-6">
              <LabelPair
                label="Your total stake"
                value="900 DAI"
                className="mb-4"
                large
              />

              <LabelPair
                label="Utilized Stake"
                tooltip="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, aperiam sit ducimus, maxime maiores, mollitia quos deserunt vero animi tenetur architecto at alias repudiandae explicabo voluptatem voluptates laboriosam obcaecati recusandae."
                value="700 DAI"
              />
              <LabelPair
                label="Defaulted Stake"
                tooltip="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, aperiam sit ducimus, maxime maiores, mollitia quos deserunt vero animi tenetur architecto at alias repudiandae explicabo voluptatem voluptates laboriosam obcaecati recusandae."
                value="0 DAI"
              />
              <LabelPair
                label="Withdrawable Stake"
                tooltip="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, aperiam sit ducimus, maxime maiores, mollitia quos deserunt vero animi tenetur architecto at alias repudiandae explicabo voluptatem voluptates laboriosam obcaecati recusandae."
                value="200 DAI"
              />

              <LabelPair
                label="Rewards multiplier"
                value="X1"
                className="mb-4 mt-12"
                large
              />

              <LabelPair
                label="Rewards"
                tooltip="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, aperiam sit ducimus, maxime maiores, mollitia quos deserunt vero animi tenetur architecto at alias repudiandae explicabo voluptatem voluptates laboriosam obcaecati recusandae."
                value="0 DAI"
              />
              <LabelPair
                label="Union Per Year (UPY)"
                tooltip="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, aperiam sit ducimus, maxime maiores, mollitia quos deserunt vero animi tenetur architecto at alias repudiandae explicabo voluptatem voluptates laboriosam obcaecati recusandae."
                value="1.87 UNION"
              />
              <div className="flex -mx-3 mt-10">
                <div className="flex-1 px-3">
                  <Button type="secondary" full>
                    Deposit
                  </Button>
                </div>
                <div className="flex-1 px-3">
                  <Button type="invert" full>
                    Withdraw
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-7/12 px-2">
            <div className="flex justify-between items-center mb-5 h-12">
              <h2>Addresses You Trust</h2>

              <Button type="invert">Trust a new member</Button>
            </div>

            <div className="bg-white border rounded p-4 md:p-6">
              <table className="table-auto w-full border-none ">
                <thead>
                  <tr>
                    <th className="pb-8 pt-4 leading-none border-b text-left">
                      Address
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
                    <td className="py-3 border-b">mirshko.eth</td>
                    <td className="py-3 border-b">250 DAI</td>
                    <td className="py-3 border-b">100 DAI</td>
                    <td className="py-3 border-b">
                      <HealthBar health={75} />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 border-b">lexi.eth</td>
                    <td className="py-3 border-b">250 DAI</td>
                    <td className="py-3 border-b">100 DAI</td>
                    <td className="py-3 border-b">
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
