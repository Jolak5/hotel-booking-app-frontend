import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HotelRooms from './components/HotelRooms';
import ReservationsList from './components/ReservationsList';
import DeleteHotel from './components/DeleteHotel';
import ReserveForm from './components/ReserveForm';
import AddHotelRoom from './components/AddHotelRoom';
import SideBar from './components/SideBar';
import Authentication from './components/Authentication';
import './App.css';

function App() {
  return (
    <div className="main-container">
      <SideBar />
      <div className="page-contents">
        <Routes>
          <Route path="/home" index element={<HotelRooms />} />
          <Route
            path="/reservations/my-reservations"
            index
            element={<ReservationsList />}
          />
          <Route path="/reservations/new" index element={<ReserveForm />} />
          <Route path="/room/new" index element={<AddHotelRoom />} />
          <Route path="rooms" index element={<DeleteHotel />} />
          <Route exact path="/auth" element={<Authentication />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
