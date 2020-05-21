import { Fragment } from "react";

export default function FaucetView() {
  return (
    <Fragment>
      <div className="container">
        <div className="flex flex-col md:flex-row mb-10">
          <h1 className="mb-5">Step 1: Get Rinkeby Ether </h1>
          <a
            href="https://faucet.rinkeby.io/"
            className="inline-block pb-2 pr-4 hover:underline"
          >
            https://faucet.rinkeby.io/
          </a>
        </div>
        <div className="flex flex-col md:flex-row mb-10">
          <h1 className="mb-5">
            Step 2: Supply Ether on the rinkeby version of Compound and borrow
            DAI to get rinkeby DAI{" "}
          </h1>
          <a
            href="https://app.compound.finance/"
            className="inline-block pb-2 pr-4 hover:underline"
          >
            https://app.compound.finance/
          </a>
        </div>
      </div>
    </Fragment>
  );
}
