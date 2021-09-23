import { useState, useMemo } from "react";

export default function usePagination(data = [], pageSize = 8) {
  const [page, setPage] = useState(1);

  const maxPages = Math.ceil(data.length / pageSize);

  const next = () => {
    setPage((n) => (n + 1 >= maxPages ? maxPages : n + 1));
  };

  const prev = () => {
    setPage((n) => (n - 1 <= 0 ? 0 : n - 1));
  };

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [pageSize, page, data]);

  return {
    page,
    data: pageData,
    next,
    prev,
    maxPages,
    setPage: (n) => setPage(Number(n)),
  };
}
