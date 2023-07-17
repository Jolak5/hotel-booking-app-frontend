import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HotelRooms from './components/HotelRooms';
import ReservationsList from './components/ReservationsList';
import DeleteHotel from './components/DeleteHotel';
import ReserveForm from './components/ReserveForm';
import AddHotel from './components/AddHotelRoom';
import SideBar from './components/SideBar';
import './App.css';

function App() {
  return (
    <div className="main-container">
      <SideBar />
      <div className="page-contents">
        <Routes>
          <Route path="/" index element={<HotelRooms />} />
          <Route path="reserve-room" index element={<ReserveForm />} />
          <Route path="my-reservations" index element={<ReservationsList />} />
          <Route path="add-room" index element={<AddHotel />} />
          <Route path="Add-hotel-room" index element={<AddHotel />} />
          <Route path="delete-room" index element={<DeleteHotel />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
