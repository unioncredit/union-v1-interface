import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import U_TOKEN_ABI from "constants/abis/uToken.json";
import useSWR from "swr";
import parseRes from "util/parseRes";
import useCurrentToken from "../useCurrentToken";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";
import USER_MANAGER_ABI from "constants/abis/userManager.json";

const getVouch =
  (marketRegistryContract) => async (_, account, tokenAddress, library) => {
    const res = await marketRegistryContract.tokens(tokenAddress);
    const signer = library.getSigner();
    const uTokenAddress = res.uToken;
    const userManagerAddress = res.userManager;

    const userManagerContract = new Contract(
      userManagerAddress,
      USER_MANAGER_ABI,
      signer
    );

    const uTokenContract = new Contract(uTokenAddress, U_TOKEN_ABI, signer);

    const addresses = await userManagerContract.getStakerAddresses(account);

    const list = await Promise.all(
      addresses.map(async (address) => {
        const { vouchingAmount, lockedStake, trustAmount } =
          await userManagerContract.getStakerAsset(account, address);

        const totalUsed = Number(
          formatUnits(
            await userManagerContract.getTotalLockedStake(address),
            18
          )
        );

        const stakingAmount = Number(
          formatUnits(await userManagerContract.getStakerBalance(address), 18)
        );

        const isOverdue = await uTokenContract.checkIsOverdue(address);

        const vouched = parseRes(vouchingAmount);

        const used = parseRes(lockedStake);

        const trust = parseRes(trustAmount);

        const freeStakingAmount =
          stakingAmount >= totalUsed ? stakingAmount - totalUsed : 0;

        const available =
          Number(vouched) - Number(used) > freeStakingAmount
            ? freeStakingAmount.toFixed(2)
            : Number(vouched - used).toFixed(2);

        const utilized = used / vouched;

        return {
          address,
          available,
          isOverdue,
          trust,
          used,
          utilized,
          vouched,
        };
      })
    );

    return list;
  };

export default function useVouchData(address) {
  const { library, account: connectedAccount } = useWeb3React();
  const account = address || connectedAccount;

  const curToken = useCurrentToken();

  const marketRegistryContract = useMarketRegistryContract();

  const shouldFetch =
    !!marketRegistryContract &&
    typeof account === "string" &&
    isAddress(curToken) &&
    !!library;

  return useSWR(
    shouldFetch ? ["Vouch", account, curToken, library] : null,
    getVouch(marketRegistryContract)
  );
}
