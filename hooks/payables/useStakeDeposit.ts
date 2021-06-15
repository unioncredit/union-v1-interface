import { MaxUint256 } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";
import type { TransactionResponse } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import useERC20Contract from "hooks/contracts/useERC20Contract";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";
import { signDaiPermit } from "eth-permit";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";
import { BigNumberish } from "@ethersproject/bignumber";

export default function useStakeDeposit() {
  const { account, chainId, library } = useWeb3React();
  const marketRegistryContract = useMarketRegistryContract();
  const DAI = useCurrentToken();
  const DAIContract = useERC20Contract(DAI);

  return useCallback(
    async (amount: number | string): Promise<TransactionResponse> => {
      const signer = library.getSigner();
      const res = await marketRegistryContract.tokens(DAI);
      const userManagerAddress = res.userManager;
      const userManagerContract = new Contract(
        userManagerAddress,
        USER_MANAGER_ABI,
        signer
      );

      const stakeAmount = parseUnits(String(amount), 18);

      const allowance = await DAIContract.allowance(
        account,
        userManagerAddress
      );
      //Approve is not required to call stakeWithPermit
      if (allowance.lt(stakeAmount)) {
        try {
          const {nonce, expiry, v, r, s} = await signDaiPermit(
            library.provider,
            DAI,
            account,
            userManagerAddress
          );
          return makeTxWithGasEstimate(
            userManagerContract,
            "stakeWithPermit",
            [stakeAmount, nonce, expiry, v, r, s]
          )
        } catch (err) {
          makeTxWithGasEstimate(
            DAIContract,
            'approve',
            [userManagerAddress, MaxUint256]
          )
        }
      }

      return makeTxWithGasEstimate(
        userManagerContract,
        "stake",
        [stakeAmount]
      )
    },
    [account, chainId, DAI, DAIContract, marketRegistryContract]
  );
}

const makeTxWithGasEstimate = async (
  contract: Contract,
  func: string,
  params: Array<string | number | BigNumberish>
): Promise<TransactionResponse> => {
  let gasLimit: BigNumberish
  try {
    const estimateGas = await contract.estimateGas[func](...params);
    gasLimit = (parseFloat(estimateGas.toString()) * 1.1).toFixed(0);
  } catch (err) {
    gasLimit = 800000;
  }

  return contract[func](...params, { gasLimit });
}
