import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/SideBar.css';
import {
  logOutUser,
  toLogin,
  toRegister,
} from '../redux/auth/authenticationSlice';

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const handleLogout = () => {
    dispatch(logOutUser()).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="nav-container">
      <NavLink to="/home" className="nav-link" activeclassname="active">
        Hotel Rooms
      </NavLink>
      {isAuthenticated && (
        <NavLink
          to="/reservations/my-reservations"
          className="nav-link"
          activeclassname="active"
        >
          My Reservations
        </NavLink>
      )}
      {isAuthenticated && (
        <NavLink
          to="reservations/new"
          className="nav-link"
          activeclassname="active"
        >
          Reserve A Room
        </NavLink>
      )}
      {isAuthenticated && (
        <NavLink to="/room/new" className="nav-link" activeclassname="active">
          Add Hotel Room
        </NavLink>
      )}
      {isAuthenticated && (
        <NavLink to="rooms" className="nav-link" activeclassname="active">
          Delete Hotel Room
        </NavLink>
      )}

      <div>
        {!isAuthenticated && (
          <>
            <NavLink to="/auth">
              <button
                type="button"
                onClick={() => {
                  dispatch(toLogin());
                }}
              >
                Log In
              </button>
            </NavLink>

            <NavLink to="/auth" className="auth-link">
              <button
                type="button"
                onClick={() => {
                  dispatch(toRegister());
                }}
              >
                Sign Up
              </button>
            </NavLink>
          </>
        )}
        {isAuthenticated && (
          <button
            type="button"
            onClick={() => {
              handleLogout();
            }}
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default SideBar;
