import React from 'react';

const ReserveForm = () => (
  <div>
    <h2>Book a hotel room here</h2>
    <p>
      with this simple to do hack, you can easily book our hotel room
      Please note, you can only ask for refund 48 hours after booking.
    </p>
    <form method="post">
      <input
        type="date"
        id="dateInput"
        name="dateInput"

      />
      <button type="submit">Book Now</button>
    </form>
  </div>
);

export default ReserveForm;
