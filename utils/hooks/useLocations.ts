import useSWR from "swr";
import { get } from "../api";

export type Location = {
  _id: number;
  name: string;
  active: boolean;
  tableCount: number;
  gridColumns: number;
  phoneNumber: string;
  mapsUrl: string;
};

export function useLocations() {
  const { data, error } = useSWR(`/location`, get);
  return {
    locations: data?.data as Location[],
    isLocationsLoading: !error && !data,
    isError: error,
  };
}
