import Chevron from "svgs/Chevron";

const TablePagination = ({
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  state: { pageIndex },
}) => {
  if (pageCount <= 1) return null;

  return (
    <div className="flex justify-between items-center mt-auto pt-4 sm:pt-6">
      <p className="text-xs uppercase font-semibold">
        Page {pageIndex + 1} of {pageOptions.length}
      </p>

      <div className="flex">
        <button
          className="pagination-button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <Chevron.Left size={14} />
        </button>

        {new Array(pageCount).fill("").map((_, index) => (
          <button
            className="pagination-button"
            disabled={pageIndex === index}
            key={index}
            onClick={() => gotoPage(index)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="pagination-button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <Chevron.Right size={14} />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
