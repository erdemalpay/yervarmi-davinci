import useSWR from "swr";
import { get } from "../api";

export type DailyHours = {
  day: string;
  openingTime?: string;
  closingTime?: string;
  isClosed?: boolean;
};

export type Location = {
  _id: number;
  name: string;
  active: boolean;
  activityNote?: string;
  tableCount: string;
  phoneNumber: string;
  googleMapsUrl?: string;
  dailyHours?: DailyHours[];
};

export function useLocations() {
  const { data, error } = useSWR(`/location`, get);
  return {
    locations: data?.data as Location[],
    isLocationsLoading: !error && !data,
    isError: error,
  };
}
