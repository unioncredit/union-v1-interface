import { useCallback } from "react";
import { parseUnits } from "@ethersproject/units";

import useUToken from "hooks/contracts/useUToken";
import useToken from "hooks/useToken";

export default function useBorrow() {
  const DAI = useToken("DAI");
  const uToken = useUToken(DAI);

  return useCallback(
    async (borrower, amount) => {
      const borrowAmount = parseUnits(String(amount), 18);
      return uToken.borrow(borrower, borrowAmount.toString());
    },
    [uToken]
  );
}
