import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <header>
        <a className="logo" href="/">
          <h1>Hotel booking</h1>
        </a>
        <nav className="navbar">
          <NavLink to="my-reservation">My Reservation</NavLink>
          <NavLink to="Add-hotel-room">Add hotel room</NavLink>
          <NavLink to="reserve">Reserve</NavLink>
          <NavLink to="delete-room">Delete Room</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
