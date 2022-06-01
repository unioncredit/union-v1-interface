import { useMemo, useState } from "react";

const FILTERS = {
  member: (item) => item.isMember,
  notAMember: (item) => !item.isMember,
  healthy: (item) => !item.isOverdue && item.isMember,
  defaulted: (item) => item.isOverdue,
  all: (item) => item,
};

const SORTS = {
  all: () => {},
  "trust-ascending": (a, b) => a.trust - b.trust,
  "trust-descending": (a, b) => b.trust - a.trust,
  "label-a-z": () => {},
  "label-z-a": () => {},
};

export default function useFilterContacts(data) {
  const [filter, setFilter] = useState(false);
  const [orderBy, setOrderBy] = useState(false);

  const filteredData = useMemo(() => {
    return filter ? data.filter(FILTERS[filter]) : data;
  }, [filter, data]);

  const orderedData = useMemo(() => {
    return orderBy ? filteredData.sort(SORTS[orderBy]) : filteredData;
  }, [filteredData, orderBy]);

  return { data: orderedData, setFilter, setOrderBy };
}
