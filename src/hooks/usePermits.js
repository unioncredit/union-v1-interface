import { newRidgeState } from "react-ridge-state";
import { signDaiPermit, signERC2612Permit } from "eth-permit";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import { PermitType } from "constants/app";

export const permitsState = newRidgeState({});

export default function usePermits() {
  const { account, library, chainId } = useWeb3React();
  const [permits, setPermits] = permitsState.use();

  const savePermit = (key, permit) => {
    setPermits((x) => ({ ...x, [key]: permit }));
  };

  const removePermit = (key) => {
    setPermits((x) => ({ ...x, [key]: null }));
  };

  const getPermit = (key) => {
    const permit = permits[key];

    const expiry = permit?.expiry || permit?.deadline;

    const permitValid =
      expiry && BigNumber.from(expiry).gt(Math.floor(Date.now() / 1000));

    if (!permitValid) {
      return null;
    }

    return permit;
  };

  const signPermit = async (key, tokenAddress, spender, amount, permitType) => {
    const signFn =
      permitType === PermitType.DAI && (chainId == 1 || chainId == 42)
        ? signDaiPermit
        : signERC2612Permit;
    const signFnArgs =
      permitType === PermitType.DAI && (chainId == 1 || chainId == 42)
        ? []
        : [amount];
    const token =
      chainId == 42161 && permitType === PermitType.DAI
        ? {
            name: "Dai Stablecoin",
            version: "2",
            chainId,
            verifyingContract: tokenAddress,
          }
        : tokenAddress;
    const permit = await signFn(
      library.provider,
      token,
      account,
      spender,
      ...signFnArgs
    );
    savePermit(key, permit);
  };

  return { savePermit, removePermit, getPermit, signPermit };
}
