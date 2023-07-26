import React from 'react';
import { useDispatch } from 'react-redux';
import { FiMenu } from 'react-icons/fi';
import { Route, Routes, useLocation } from 'react-router-dom';
import Welcome from './components/Welcome';
import HotelRooms from './components/HotelRooms';
import ReservationsList from './components/ReservationsList';
import DeleteHotel from './components/DeleteHotel';
import ReserveForm from './components/ReserveForm';
import AddHotel from './components/AddHotel';
import SideBar from './components/SideBar';
import Authentication from './components/Authentication';
import Details from './components/Details';
import { toggleNav } from './redux/sideBar/sideBarSlice';

import './App.css';

const App = () => {
  const location = useLocation();
  const hideNavigation = location.pathname === '/';
  const dispatch = useDispatch();

  return (
    <div className="main-container">
      {!hideNavigation && (
        <FiMenu className="menu-icon" onClick={() => dispatch(toggleNav())} />
      )}
      {!hideNavigation && <SideBar />}
      <Routes>
        <Route path="/" index element={<Welcome />} />
        <Route path="/home" index element={<HotelRooms />} />
        <Route
          path="/reservations/my-reservations"
          index
          element={<ReservationsList />}
        />
        <Route path="/reservations/new" index element={<ReserveForm />} />
        <Route path="/hotel/new" index element={<AddHotel />} />
        <Route path="hotels" index element={<DeleteHotel />} />
        <Route exact path="/auth" element={<Authentication />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
