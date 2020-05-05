import ABI from "@constants/abis/erc20Detailed.json";
import { useBlockNumber } from "@contexts/Application";
import { formatUnits } from "@ethersproject/units";
import getContract from "@util/getContract";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { usePrevious } from "react-use";

export default function useTokenBalance(tokenAddress) {
  const { library, account } = useWeb3React();

  const globalBlockNumber = useBlockNumber();

  const [balance, setBalance] = useState("0");
  const prevBalance = usePrevious(balance);

  useEffect(() => {
    let stale = false;

    async function fetchBalance() {
      try {
        const contract = getContract(tokenAddress, ABI, library.getSigner());

        const decimals = await contract.decimals();

        const balanceOf = await contract.balanceOf(account);

        if (!stale) {
          setBalance(formatUnits(balanceOf, decimals));
          return;
        }

        setBalance(prevBalance ?? "0");
      } catch (error) {
        console.error(error);
        if (!stale) {
          setBalance(prevBalance ?? "0");
        }
      }
    }

    fetchBalance();

    return () => {
      stale = true;
      setBalance(prevBalance ?? "0");
    };
  }, [library, account, globalBlockNumber]);

  return balance;
}
