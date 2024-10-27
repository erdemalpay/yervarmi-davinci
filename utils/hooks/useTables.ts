import useSWR from "swr";
import { get } from "../api";

type Table = {
  finishHour: string;
  isOnlineSale?: boolean;
};

export function useTables(date: string, location: number) {
  const { data, error } = useSWR(
    `/tables?date=${date}&location=${location}`,
    get
  );
  return {
    tableCount: data?.data?.filter(
      (table: Table) => !table.finishHour && !table?.isOnlineSale
    )?.length,
    isTablesLoading: !error && !data,
    isError: error,
  };
}
