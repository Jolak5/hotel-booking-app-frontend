import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchhotels } from '../redux/Home/homeSlice';
import { getLocalStorage } from '../helpers/localStorage';
import { postReservation } from '../redux/reservation/newreservationSlice';
import '../styles/AddHotel.css';

const ReserveForm = () => {
  const { fetched, hotels } = useSelector((state) => state.home);
  const currentuser = getLocalStorage('user');
  const dispatch = useDispatch();
  const location = useLocation();
  const { hotel } = location.state || {};
  const [selectedHotel, setSelectedHotel] = useState(hotel);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substr(0, 10),
  );
  const [duration, setDuration] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchhotels());
    }
    if (hotel) {
      setSelectedHotel(hotel);
    } else if (hotels.length > 0) {
      setSelectedHotel(hotels[0]);
    }
  }, [dispatch, fetched, hotel, hotels]);

  useEffect(() => {
    if (!hotel && hotels.length) {
      setSelectedHotel(hotels[0]);
    }
  }, [hotels, hotel]);

  const handleHotelChange = (e) => {
    const hotelId = Number(e.target.value);
    const chosenHotel = hotels.find((hotel) => hotel.id === hotelId);
    setSelectedHotel(chosenHotel);
  };

  const postDataToApi = (event) => {
    event.preventDefault();
    dispatch(
      postReservation({
        reservation: {
          user_id: currentuser.id,
          hotel_id: selectedHotel.id,
          reservation_date: startDate,
          duration,
        },
      }),
    );
    navigate('/reservations/my-reservations', {
      state: {
        directAccess: false,
      },
    });
  };

  return (
    <div className="add-hotel-container">
      <div className="add-hotel-headings-container">
        <h2 className="add-hotel-heading">Book a hotel room here</h2>
        <p className="add-hotel-text">
          With this simple to do hack, you can easily book our hotel room Please
          note, you can only ask for refund 48 hours after booking.
        </p>
      </div>
      <form className="add-hotel-form" onSubmit={postDataToApi}>
        <label htmlFor="userName" className="form-label">
          User:
          <br />
          <input
            type="text"
            className="text-input input"
            id="userName"
            value={currentuser.name}
            disabled
          />
        </label>
        <label htmlFor="hotelSelect" className="form-label">
          Hotel:
          <br />
          <select
            id="hotelSelect"
            name="hotel"
            value={selectedHotel ? selectedHotel.id : 1}
            onChange={handleHotelChange}
            className="text-input input"
          >
            {hotels.length === 0 && (
              <option value="" disabled>
                There are no hotels. Add a hotel first!
              </option>
            )}
            {hotels.map((hotel) => (
              <option value={hotel.id} key={hotel.id}>
                {hotel.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="startDateInput" className="form-label">
          Start Date:
          <br />
          <input
            type="date"
            id="startDateInput"
            name="dateInput"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="text-input input"
          />
        </label>
        <label htmlFor="durationInput" className="form-label">
          Duration (days):
          <br />
          <input
            type="number"
            id="durationInput"
            name="durationInput"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="number-input input"
          />
        </label>
        <button type="submit" className="add-hotel-btn">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default ReserveForm;
