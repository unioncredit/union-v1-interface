import { Dai as UIDai } from "union-ui";

export function Dai({ value }) {
  return (
    <>
      <UIDai />
      {value}
    </>
  );
}
