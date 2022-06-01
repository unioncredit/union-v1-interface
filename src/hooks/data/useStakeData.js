import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { roundDown } from "util/numbers";
import parseRes from "util/parseRes";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";
import useCurrentToken from "../useCurrentToken";

const getStakeData =
  (marketRegistryContract) => async (_, account, tokenAddress, library) => {
    try {
      const signer = library.getSigner();
      const res = await marketRegistryContract.tokens(tokenAddress);
      const userManagerAddress = res.userManager;
      const userManagerContract = new Contract(
        userManagerAddress,
        USER_MANAGER_ABI,
        signer
      );

      const totalStake = await userManagerContract.getStakerBalance(account);

      const totalLocked = await userManagerContract.getTotalLockedStake(
        account
      );

      const totalFrozen = await userManagerContract.getTotalFrozenAmount(
        account
      );

      return {
        totalStake: parseRes(totalStake),
        utilizedStake: parseRes(totalLocked.sub(totalFrozen)),
        withdrawableStake: roundDown(
          formatUnits(totalStake.sub(totalLocked), 18)
        ),
        defaultedStake: parseRes(totalFrozen),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export default function useStakeData() {
  const { account, library } = useWeb3React();
  const curToken = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();

  const shouldFetch =
    !!marketRegistryContract &&
    typeof account === "string" &&
    isAddress(curToken);

  return useSWR(
    shouldFetch ? ["StakeData", account, curToken, library] : null,
    getStakeData(marketRegistryContract)
  );
}
