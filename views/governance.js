import { Fragment } from "react";

const Stat = ({ label, value }) => {
  return (
    <div className="p-4 sm:p-6 rounded-lg border border-pink-2-pure bg-pink-2-light">
      <p className="font-semibold mb-4 crop-tight leading-tight">{label}</p>
      <p className="text-3xl font-semibold leading-tight crop-tight">{value}</p>
    </div>
  );
};

export default function GovernanceView() {
  return (
    <Fragment>
      <div className="hero-gradient">
        <section className="pt-16">
          <div className="container-lg">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Governance Overview
            </h1>
          </div>
        </section>

        <section className="pt-12 pb-32">
          <div className="container-lg">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Stat label={"Total Borrows Outstanding"} value={"2000"} />
              <Stat label={"Total Staked"} value={"100,000"} />
              <Stat label={"Total Locked & Earning"} value={"40,000"} />
              <Stat label={"Total Global Frozen"} value={"40,000"} />
              <Stat label={"Total Defaulted"} value={"20,000"} />
            </div>
          </div>
        </section>
      </div>

      <div className="bg-pink-2-light border-b border-t border-pink-pure">
        <section className="pt-48 pb-48"></section>
      </div>
    </Fragment>
  );
}
