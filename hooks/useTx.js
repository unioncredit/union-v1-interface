import { useAutoCallback } from "hooks.macro";
import { useState } from "react";

/**
 * @name useTx
 *
 * @typedef StateAndFunction
 * @property {("WAITING"|"PENDING"|"SUCCESS"|"ERROR")} state
 * @property {Promise<void>} action
 *
 * @returns {StateAndFunction}
 */
export default function useTx() {
  const [state, setState] = useState("WAITING");

  const action = useAutoCallback(async (transaction) => {
    try {
      const tx = await transaction();

      setState("PENDING");

      await tx.wait();

      setState("SUCCESS");
    } catch (err) {
      console.error(err);
      setState("ERROR");
    }
  });

  return { state, action };
}
