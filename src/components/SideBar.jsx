import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/SideBar.css';

const SideBar = () => (
  <div className="nav-container">
    <NavLink to="/" className="nav-link" activeclassname="active">
      Hotel Rooms
    </NavLink>
    <NavLink to="reserve-room" className="nav-link" activeclassname="active">
      Reserve A Room
    </NavLink>
    <NavLink to="my-reservations" className="nav-link" activeclassname="active">
      My Reservations
    </NavLink>
    <NavLink to="add-room" className="nav-link" activeclassname="active">
      Add Hotel Room
    </NavLink>
    <NavLink to="delete-room" className="nav-link" activeclassname="active">
      Delete Hotel Room
    </NavLink>
  </div>
);

export default SideBar;
