import { newRidgeState } from "react-ridge-state";
import { signDaiPermit, signERC2612Permit } from "eth-permit";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import { PermitType } from "constants/app";

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
    const permitValid =
      permit?.expiry &&
      BigNumber.from(permit.expiry).gt(Math.floor(Date.now() / 1000));

    if (!permitValid) {
      return null;
    }

    return permit;
  };

  const signPermit = async (key, tokenAddress, spender, amount, permitType) => {
    const signFn =
      permitType === PermitType.ERC2612 ? signERC2612Permit : signDaiPermit;

    const signFnArgs = permitType === PermitType.ERC2612 ? [amount] : [];

    const { nonce, expiry, v, r, s } = await signFn(
      library.provider,
      tokenAddress,
      account,
      spender,
      ...signFnArgs
    );

    savePermit(key, { nonce, expiry, v, r, s });
  };

  return { savePermit, removePermit, getPermit, signPermit };
}
