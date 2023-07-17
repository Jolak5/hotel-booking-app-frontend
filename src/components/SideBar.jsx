import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/SideBar.css';

const SideBar = () => (
  <div className="nav-container">
    <NavLink to="my-reservation" className="nav-link" activeclassname="active">
      My Reservations
    </NavLink>
    <NavLink to="Add-hotel-room" className="nav-link" activeclassname="active">
      Add hotel room
    </NavLink>
    <NavLink to="reserve" className="nav-link" activeclassname="active">
      Reserve
    </NavLink>
    <NavLink to="delete-room" className="nav-link" activeclassname="active">
      Delete Room
    </NavLink>
  </div>
);

export default SideBar;
