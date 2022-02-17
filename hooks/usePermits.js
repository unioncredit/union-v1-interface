import { newRidgeState } from "react-ridge-state";
import { signDaiPermit, signERC2612Permit } from "eth-permit";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import { PermitType } from "constants/app";
import { MaxUint256 } from "@ethersproject/constants";

export const permitsState = newRidgeState({});

export default function usePermits() {
  const { account, library } = useWeb3React();
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
      permitType === PermitType.ERC2612 ? signERC2612Permit : signDaiPermit;

    const signFnArgs =
      permitType === PermitType.ERC2612 ? [MaxUint256.toString()] : [];
    const permit = await signFn(
      library.provider,
      tokenAddress,
      account,
      spender,
      ...signFnArgs
    );

    savePermit(key, permit);
  };

  return { savePermit, removePermit, getPermit, signPermit };
}
