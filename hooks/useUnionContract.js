import ABI from "@constants/abis/unionToken.json";
import { getContract } from "@util/getContract";
import { useWeb3React } from "@web3-react/core";
import { useAutoMemo } from "hooks.macro";
import { UNION_TOKEN_ADDRESSES } from "@constants/";

export default function useUnionContract() {
    const { library, chainId } = useWeb3React();

    return useAutoMemo(() => {
        try {
            return getContract(
                UNION_TOKEN_ADDRESSES[chainId],
                ABI,
                library.getSigner()
            );
        } catch {
            return null;
        }
    });
}
