import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './../styles/Navbar.css';
import { FaBars } from 'react-icons/fa';
import { useRef } from 'react';

export default function Navbar() {
  const navRef = useRef();
  const showNavLinks = () => {
    console.log('Nav Bars Clicked');
    navRef.current.classList.toggle('nav-toggle');
  };
  return (
    <div>
      <header className="nav-container">
        <button className="menu-icon" onClick={showNavLinks}>
          <FaBars />
        </button>
        <nav className="nav-links" ref={navRef}>
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
