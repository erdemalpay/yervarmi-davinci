import useSWR from "swr";
import { get } from "../api";

export enum ReservationStatusEnum {
  WAITING = "Waiting",
  COMING = "Coming",
  NOT_COMING = "Not coming",
  NOT_RESPONDED = "Not responded",
  CAME = "Already came",
}

type Reservation = {
  status: ReservationStatusEnum;
};

export function useReservations(date: string, location: number) {
  const { data, error } = useSWR(
    `/reservations?date=${date}&location=${location}`,
    get
  );
  return {
    reservedTableCount: data?.data?.filter(
      (reservation: Reservation) =>
        reservation.status === ReservationStatusEnum.COMING ||
        reservation.status === ReservationStatusEnum.WAITING
    ).length,
    isError: error,
    isReservationsLoading: !error && !data,
  };
}
