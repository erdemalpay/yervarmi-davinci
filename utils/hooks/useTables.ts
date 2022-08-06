import useSWR from "swr";
import { get } from "../api";

type Table = {
  finishHour: string;
};

export function useTables(date: string, location: number) {
  const { data, error } = useSWR(
    `/tables?date=${date}&location=${location}`,
    get
  );
  console.log({ data });
  return {
    tableCount: data?.data?.filter((table: Table) => !table.finishHour).length,
    isLoading: !error && !data,
    isError: error,
  };
}
