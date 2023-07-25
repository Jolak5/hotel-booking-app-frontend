import React from 'react';
import '../styles/reserve.css';
import axios from 'axios';
import { getLocalStorage } from '../helpers/localStorage';

const postDataToApi = async () => {
  const data = {
    user_id: 1,
    hotel_id: 1,
    reservation_date: '1995-12-14',
  };

  try {
    const token = getLocalStorage('token');

    const response = await axios.post('http://localhost:3000/reservations', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const ReserveForm = () => (

  <div className="reserve-div">
    <div className="centered-div">
      <h2>Book a hotel room here</h2>
      <hr />
      <p>
        With this simple to do hack, you can easily book our hotel room
        Please note, you can only ask for refund 48 hours after booking.
      </p>
      <form className="reserve-form">
        <input
          type="date"
          id="dateInput"
          name="dateInput"

        />
        <button onClick={postDataToApi} type="submit">Book Now</button>
      </form>
    </div>
  </div>
);

export default ReserveForm;
