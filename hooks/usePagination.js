import { useEffect, useState, useMemo } from "react";

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
    // react be like this data is the same so stringified it
    // because the upstream memos seems to be correct so fk
  }, [pageSize, page, JSON.stringify(data)]);

  useEffect(() => {
    if (data.length > 0) {
      setPage(1);
    }
  }, [data.length]);

  return {
    page,
    data: pageData,
    next,
    prev,
    maxPages,
    pageSize,
    setPage: (n) => setPage(Number(n)),
  };
}
