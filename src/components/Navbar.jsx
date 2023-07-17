import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './../styles/Navbar.css';
import { FaBars } from 'react-icons/fa';

export default function Navbar() {
  return (
    <div>
      <header className="nav-container">
        <button className="menu-icon">
          <FaBars />
        </button>
        <nav className="nav-links">
          <NavLink to="my-reservation">My Reservations</NavLink>
          <NavLink to="Add-hotel-room">Add hotel room</NavLink>
          <NavLink to="reserve">Reserve</NavLink>
          <NavLink to="delete-room">Delete Room</NavLink>
          <button>Logout</button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
