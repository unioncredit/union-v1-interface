import { useMemo } from "react";
import { useForm } from "react-hook-form";

export default function useSearch(data, property = "address") {
  const { register, watch } = useForm();

  const query = watch("query");

  const searched = useMemo(() => {
    if (!query) return data;

    if (!Array.isArray(data)) return data;

    return data.filter((item) =>
      item[property].toString().toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]);

  return { data: searched, register };
}
