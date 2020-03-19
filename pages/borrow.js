import Button from "@components/button";
import Container from "@components/container";
import Head from "next/head";
import Link from "next/link";
import HealthBar from "@components/healthBar";

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

        <div className="flex -mx-3 mb-5">
          <div className="w-1/2 px-3">
            <div className="bg-secondary-500 border border-secondary-500 rounded p-6 text-white">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <p className="mb-2 text-lg">Available Credit</p>
                  <p className="font-semibold text-xl">1520 DAI</p>
                </div>

                <Button wide type="tertiary">
                  Borrow
                </Button>
              </div>

              <div className="flex justify-between py-2">
                <p className="opacity-50">Percent Utilization</p>
                <div className="flex items-center">
                  <HealthBar health={66.99} />
                  <p className="font-semibold leading-none text-lg ml-4">
                    66.99%
                  </p>
                </div>
              </div>

              <div className="flex justify-between py-2">
                <Link href="/vouch">
                  <a className="underline text-sm">See my breakdown</a>
                </Link>
                <Link href="/stake">
                  <a className="underline text-sm">Increase my limit</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-1/2 px-3">
            <div className="bg-white border rounded p-6">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <p className="mb-2 text-lg">Balance Owed</p>
                  <p className="font-semibold text-xl">693.34 DAI</p>
                </div>

                <Button wide>Repay</Button>
              </div>

              <div className="flex justify-between py-2">
                <p className="opacity-50">Minimum Payment Due</p>
                <p className="font-semibold">64.28 DAI</p>
              </div>

              <div className="flex justify-between py-2">
                <p className="opacity-50">Payment Due Date</p>
                <p className="font-semibold">in 10 Days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <h2>Transactions</h2>
        </div>

        <div className="mb-4 bg-white border rounded p-6 flex items-center">
          <div className="h-12 w-12 rounded-full bg-gray-300" />

          <div className="flex-1 mx-4">
            <p className="mb-2 leading-none">
              <strong className="font-semibold">alex56.eth increased</strong>{" "}
              your credit limit
            </p>
            <p className="font-normal leading-none">4 Feb 2020</p>
          </div>

          <div>
            <p>650 DAI</p>
          </div>
        </div>

        <div className="mb-4 bg-white border rounded p-6 flex items-center">
          <div className="h-12 w-12 rounded-full bg-gray-300" />

          <div className="flex-1 mx-4">
            <p className="mb-2 leading-none">
              <strong className="font-semibold">alex56.eth increased</strong>{" "}
              your credit limit
            </p>
            <p className="font-normal leading-none">4 Feb 2020</p>
          </div>

          <div>
            <p>650 DAI</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
