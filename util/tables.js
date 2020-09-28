import { Fragment } from "react";
import Chevron from "svgs/Chevron";

/**
 * @name renderHeadRowSorting
 * @param {import("react-table").ColumnInstance} column
 */
export const renderSortIcons = (column) => {
  return (
    <Fragment>
      {column.isSorted ? (
        column.isSortedDesc ? (
          <Chevron.Down size={16} />
        ) : (
          <Chevron.Up size={16} />
        )
      ) : (
        <Chevron.Down size={16} color="transparent" />
      )}
    </Fragment>
  );
};
