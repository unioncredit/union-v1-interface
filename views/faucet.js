import { Fragment } from "react";
import Button from "../components/button";

export default function FaucetView() {
  return (
    <Fragment>
      <div className="container">
        <div className="mb-10">
          <h1 className="mb-5">Step 1: Get Testnet Ether </h1>
          <Button secondary href="https://faucet.kovan.network">
            Get Kovan Ether
          </Button>
        </div>
        <div className="mb-10">
          <h1 className="mb-5">
            Step 2: Supply Ether on the Kovan version of Compound and borrow DAI to get Kovan DAI{" "}
          </h1>
          <Button secondary href="https://app.compound.finance/">
            Get Compound Kovan Dai
          </Button>
        </div>
      </div>
    </Fragment>
  );
}
