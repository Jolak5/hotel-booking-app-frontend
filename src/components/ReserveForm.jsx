import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchhotels } from '../redux/Home/homeSlice';
import { getLocalStorage } from '../helpers/localStorage';
import { postReservation } from '../redux/reservation/newreservationSlice';
import '../styles/ReserveForm.css';

const ReserveForm = () => {
  const { fetched, hotels } = useSelector((state) => state.home);
  const currentuser = getLocalStorage('user');
  const dispatch = useDispatch();
  const location = useLocation();
  const { hotel } = location.state || {};
  const [selectedHotel, setSelectedHotel] = useState(hotel);
  const [startDate, setStartDate] = useState(new Date().toISOString().substr(0, 10));
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
    dispatch(postReservation({
      reservation: {
        user_id: currentuser.id,
        hotel_id: selectedHotel.id,
        reservation_date: startDate,
        duration,
      },
    }));
    navigate('/reservations/my-reservations');
  };

  return (
    <div className="add-reservation-container">
      <div className="add-hotel-headings-container">
        <h2 className="add-hotel-heading">Book a hotel room here</h2>
        {/* <hr /> */}
        <p className="add-hotel-text">
          With this simple to do hack, you can easily book our hotel room
          Please note, you can only ask for refund 48 hours after booking.
        </p>
      </div>
      <form className="add-hotel-form" onSubmit={postDataToApi}>
        <label htmlFor="userName">
          User:
          <input type="text" className="text-input input" id="userName" value={currentuser.name} disabled />
        </label>
        <label htmlFor="hotelSelect">
          Hotel:
          <select id="hotelSelect" name="hotel" value={selectedHotel ? selectedHotel.id : 1} onChange={handleHotelChange}>
            {hotels.map((hotel) => (
              <option value={hotel.id} key={hotel.id}>
                {hotel.name}
              </option>
            ))}
          </select>
        </label>
        {/* {selectedHotel && selectedHotel.image
            && (
              <div>
                <p>Hotel</p>
                <img style={{ width: '100px', height: '100px' }}
                src={selectedHotel.image.url} alt={selectedHotel.name} />
              </div>
            )} */}
        <label htmlFor="startDateInput">
          Start Date:
          <input
            type="date"
            id="startDateInput"
            name="dateInput"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label htmlFor="durationInput">
          Duration (days):
          <input
            type="number"
            id="durationInput"
            name="durationInput"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <button type="submit" className="add-hotel-btn">Book Now</button>
      </form>

    </div>
  );
};

export default ReserveForm;
