import Button from "components/button";
import useCurrentToken from "hooks/useCurrentToken";
import { getTestToken } from "lib/contracts/getTestToken";
import { useWeb3React } from "@web3-react/core";
import { Fragment } from "react";

export default function FaucetView() {
  const { library, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  const onGetToken = async () => {
    try {
      await getTestToken(curToken, 10000, library.getSigner(), chainId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <div className="container text-center">
        <h1 className="mb-4">Testnet DAI Faucet</h1>

        <Button invert onClick={onGetToken}>
          Get 10000 Dai
        </Button>
      </div>
    </Fragment>
  );
}
