import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

const Welcome = () => (
  <div className="welcome-page-container">
    <div className="welcome-color-container">
      <h1>Welcome to our Hotel Booking App!</h1>
      <p>
        Your gateway to unforgettable experiences awaits. Browse, book, and
        discover the finest hotels at your fingertips.
      </p>
      <Link to="/auth" className="welcome-auth-link">
        Begin your adventure now!
      </Link>
    </div>
  </div>
);

export default Welcome;
