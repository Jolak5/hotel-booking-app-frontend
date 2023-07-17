import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MyReservation from './components/MyReservation';
import DeleteHotel from './components/DeleteHotel';
import Reserve from './components/Reserve';
import AddHotel from './components/AddHotel';
import './App.css';

function App() {
  return (
    <Router className="app">
      <Navbar />
      <div className="sidebar">
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="my-reservation" index element={<MyReservation />} />
          <Route path="delete-room" index element={<DeleteHotel />} />
          <Route path="reserve" index element={<Reserve />} />
          <Route path="Add-hotel-room" index element={<AddHotel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
