import Button from "@components/button";
import Container from "@components/container";
import HealthBar from "@components/healthBar";
import LabelPair from "@components/labelPair";
import Head from "next/head";
import {
  useTrustModalToggle,
  useDepositModalToggle,
  useWithdrawModalToggle,
} from "@contexts/Stake";
import TrustModal from "@components/trustModal";
import DepositModal from "@components/depositModal";
import WithdrawModal from "@components/withdrawModal";

export default function Stake() {
  const toggleTrustModal = useTrustModalToggle();
  const toggleDepositModal = useDepositModalToggle();
  const toggleWithdrawModal = useWithdrawModalToggle();

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
                  <Button secondary full onClick={toggleDepositModal}>
                    Deposit
                  </Button>
                </div>
                <div className="flex-1 px-3">
                  <Button invert full onClick={toggleWithdrawModal}>
                    Withdraw
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-7/12 px-2">
            <div className="flex justify-between items-center mb-5">
              <h2 className="leading-loose">Addresses You Trust</h2>

              <Button invert onClick={toggleTrustModal}>
                Trust a new member
              </Button>
            </div>

            <div className="bg-white border rounded p-4 md:p-6">
              <table>
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
              </table>
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
