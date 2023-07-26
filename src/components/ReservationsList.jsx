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
    <div className="reservation-container">
      <div className="reservation-list">
        {reservations && reservations.length > 0 ? (
          reservations.map((reservation) => (
            <div key={reservation.id} className="reservation-item">
              <img src={reservation.hotel.image} alt={reservation.hotel.name} />
              <h1>{reservation.hotel.name}</h1>
              <p>{reservation.reservation_date}</p>
              <p>{reservation.duration}</p>
            </div>
          ))
        ) : (
          <p>It is empty</p>
        )}
      </div>

    </div>

  );
}
