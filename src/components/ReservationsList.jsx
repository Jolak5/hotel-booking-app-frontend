import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchreservations } from '../redux/reservation/reservation';

export default function ReservationsList() {
  const { fetched, isLoading, reservations } = useSelector((state) => state.reservations);
  const dispatch = useDispatch();
  console.log(reservations);
  useEffect(() => {
    if (!fetched) {
      dispatch(fetchreservations());
    }
  }, [dispatch, fetched]);
  if (isLoading) {
    return (
      <p>Loading...</p>
    );
  }
  return (
    <div>
      {reservations && reservations.length > 0 ? (
        reservations.map((reservation) => (
          <div key={reservation.id}>
            <p>{reservation.reservation_date}</p>
            <p>{reservation.user_id}</p>
            <p>
              User Name:
              {' '}

            </p>
          </div>
        ))
      ) : (
        <p>It is empty</p>
      )}
    </div>

  );
}
