import useSWR from "swr";
import { get } from "../api";

export function useTables(date: string, location: number) {
  const { data, error } = useSWR(
    `/tables/yer_varmi?date=${date}&location=${location}`,
    get
  );
  return {
    tableCount: data?.data,
    isTablesLoading: !error && !data,
    isError: error,
  };
}
