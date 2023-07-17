import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Hotel from './components/Hotel';
import MyReservation from './components/MyReservation';
import DeleteHotel from './components/DeleteHotel';
import Reserve from './components/Reserve';
import AddHotel from './components/AddHotel';
import SideBar from './components/SideBar';
import './App.css';

function App() {
  return (
    <div className="main-container">
      <SideBar />
      <div className="page-contents">
        <Routes>
          <Route path="/" index element={<Hotel />} />
          <Route path="my-reservation" index element={<MyReservation />} />
          <Route path="delete-room" index element={<DeleteHotel />} />
          <Route path="reserve" index element={<Reserve />} />
          <Route path="Add-hotel-room" index element={<AddHotel />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
