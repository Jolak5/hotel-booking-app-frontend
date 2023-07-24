import React from 'react';
import '../styles/reserve.css';
import postDataToApi from './postReserveToApi';

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
