import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HotelRooms from './components/HotelRooms';
import ReservationsList from './components/ReservationsList';
import DeleteHotel from './components/DeleteHotel';
import ReserveForm from './components/ReserveForm';
import AddHotelRoom from './components/AddHotelRoom';
import SideBar from './components/SideBar';
import Authentication from './components/Authentication';
import { logInUser } from './redux/auth/authenticationSlice';
import { getLocalStorage } from './helpers/localStorage';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getLocalStorage('token');
    const user = getLocalStorage('user');

    if (token && user) {
      dispatch(logInUser({ token, user }));
    }
  }, [dispatch]);

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
