import UnionSymbol from "@unioncredit/ui/lib/icons/union.svg";

import styles from "./union.module.css";

export function Union({ value }) {
  return (
    <>
      {value}{" "}
      <UnionSymbol width="16px" height="16px" className={styles.unionSymbol} />
    </>
  );
}
