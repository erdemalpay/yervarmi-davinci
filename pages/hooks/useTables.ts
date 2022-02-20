import useSWR from "swr";
import { get } from "../../api";

type Table = {
  finishHour: string;
};

export function useTables(date: string) {
  const { data, error } = useSWR(`/tables?date=${date}`, get);

  return {
    tableCount: data?.data?.tables.filter((table: Table) => !table.finishHour)
      .length,
    isLoading: !error && !data,
    isError: error,
  };
}
