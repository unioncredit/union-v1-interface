import { Fragment } from "react";
import classNames from "classnames";
import { UNION_TOKEN_ADDRESSES } from "constants/variables";
import truncateAddress from "util/truncateAddress";
import getEtherscanLink from "util/getEtherscanLink";

const Stat = ({ label, value, light = false }) => {
  const cachedClassNames = classNames(
    "p-4 sm:p-6 rounded-lg border",
    light
      ? "border-white border-opacity-75 bg-white bg-opacity-50"
      : "border-pink-pure bg-pink-2-light"
  );
  return (
    <div className={cachedClassNames}>
      <div className="font-semibold mb-4 crop-tight leading-tight">{label}</div>
      <div className="flex justify-between">
        <span className="text-3xl font-semibold leading-tight crop-tight">
          {value}
        </span>
      </div>
    </div>
  );
};

export default function GovernanceView() {
  return (
    <Fragment>
      <div className="gradient-pink-2-light">
        <section className="pt-16">
          <div className="container-lg">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Governance Overview
            </h1>
          </div>
        </section>

        <section className="pt-12">
          <div className="container-lg">
            <div className="mb-4">
              <Stat label={"Total Borrows Outstanding"} value={"2000"} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Stat label={"Total Staked"} value={"100,000 DAI"} />
              <Stat label={"Total Locked & Earning"} value={"40,000"} />
              <Stat label={"Total Global Frozen"} value={"40,000"} />
              <Stat label={"Total Defaulted"} value={"20,000"} />
            </div>
          </div>
        </section>

        <section className="pt-12 pb-32">
          <div className="container-lg">
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl">Union Assets</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Stat label={"Lending Pool Balance"} value={"4,000,000 DAI"} />
              <Stat
                label={"Compound Balance / Pure Token"}
                value={"4,000,000 DAI"}
              />
            </div>
          </div>
        </section>
      </div>

      <div className="bg-pink-2-light border-t border-b border-pink-2-pure">
        <section className="pt-24 pb-24">
          <div className="container-lg">
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl">UNION Token</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Stat label={"Current Supply"} value={"2,000,000"} light />
              <Stat
                label={"Address"}
                value={
                  <a
                    className="hover:underline"
                    href={getEtherscanLink(
                      4,
                      UNION_TOKEN_ADDRESSES[4],
                      "ADDRESS"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {truncateAddress(UNION_TOKEN_ADDRESSES[4], 6)}
                  </a>
                }
                light
              />
              <div className="p-4 sm:p-6 rounded-lg border border-white border-opacity-75 bg-white bg-opacity-50 col-span-2">
                <div className="h-72 py-32"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
