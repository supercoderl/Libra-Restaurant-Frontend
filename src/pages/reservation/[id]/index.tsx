import React from 'react';
import type {NextPage} from 'next';
import ReservationContainer from 'src/containers/reservation-container';
import { useSearchParams } from 'next/navigation';

const Reservation: NextPage = () => {
  const searchParams = useSearchParams();

  return <ReservationContainer reservationId={searchParams.get("reservationId")} tableNumber={searchParams.get("tableNumber")} storeId={searchParams.get("storeId")} />;
};

export default Reservation;