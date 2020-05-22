import { Fragment } from "react";
import Button from "../components/button";

export default function FaucetView() {
  return (
    <Fragment>
      <div className="container">
        <div className="mb-10">
          <h1 className="mb-5">Step 1: Get Rinkeby Ether </h1>
          <Button secondary href="https://faucet.rinkeby.io/">
            Get Rinkeby Ether
          </Button>
        </div>
        <div className="mb-10">
          <h1 className="mb-5">
            Step 2: Supply Ether on the rinkeby version of Compound and borrow
            DAI to get rinkeby DAI{" "}
          </h1>
          <Button secondary href="https://app.compound.finance/">
            Get Compound Rinkeby Dai
          </Button>
        </div>
      </div>
    </Fragment>
  );
}
