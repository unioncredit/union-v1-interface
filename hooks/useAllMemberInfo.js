import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useCurrentToken from "./useCurrentToken";
import useMemberContract from "./contracts/useMemberContract";

const getAllMemberInfo = (memberContract) => async (_, curToken, library) => {
  const signer = library.getSigner();

  const addMemberFilter = memberContract.filters.LogAddMember();
  addMemberFilter.fromBlock = 0;
  const addMemberLogs = await signer.provider.getLogs(addMemberFilter);

  const applyMemberFilter = memberContract.filters.LogApplyMember();
  applyMemberFilter.fromBlock = 0;
  const applyMemberLogs = await signer.provider.getLogs(applyMemberFilter);

  const txs = await Promise.all([
    ...addMemberLogs.map(async (log) => {
      const logData = memberContract.interface.parseLog(log);
      const [member] = logData.args;
      try {
        const availableCreditLimit = await memberContract.getCreditLimit(
          curToken,
          member
        );

        const totalCreditLimit = await memberContract.getTotalCreditLimit(
          curToken,
          member
        );

        return {
          address: member,
          availableCreditLimit: Number(
            formatUnits(availableCreditLimit, 18)
          ).toFixed(2),
          totalCreditLimit: Number(formatUnits(totalCreditLimit, 18)).toFixed(
            2
          ),
        };
      } catch (error) {
        console.error(error);
        return {
          address: member,
        };
      }
    }),
    ...applyMemberLogs.map(async (log) => {
      const logData = memberContract.interface.parseLog(log);
      const [borrower] = logData.args;
      try {
        const availableCreditLimit = await memberContract.getCreditLimit(
          curToken,
          borrower
        );

        const totalCreditLimit = await memberContract.getTotalCreditLimit(
          curToken,
          borrower
        );

        return {
          address: borrower,
          availableCreditLimit: Number(
            formatUnits(availableCreditLimit, 18)
          ).toFixed(2),
          totalCreditLimit: Number(formatUnits(totalCreditLimit, 18)).toFixed(
            2
          ),
        };
      } catch (error) {
        console.error(error);
        return {
          address: borrower,
        };
      }
    }),
  ]);

  return txs;
};

export default function useAllMemberInfo() {
  const { library } = useWeb3React();
  const curToken = useCurrentToken();
  const memberContract = useMemberContract();

  const shouldFetch = !!memberContract && !!library;

  return useSWR(
    shouldFetch ? ["Member", curToken, library] : null,
    getAllMemberInfo(memberContract)
  );
}
