import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../styles/SideBar.css';
import { FaFacebook, FaTwitter, FaPinterestP } from 'react-icons/fa';
import logo from '../assets/hotelAppLogo.png';
import { getLocalStorage } from '../helpers/localStorage';
import {
  logOutUser,
  toLogin,
  toRegister,
} from '../redux/auth/authenticationSlice';
import { toggleNav } from '../redux/sideBar/sideBarSlice';

const SideBar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const user = getLocalStorage('user');

  const isOpen = useSelector((state) => state.nav.isOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOutUser());
    navigate('/');
  };

  const handleHideNav = () => {
    dispatch(toggleNav());
  };

  const navStyle = {
    zIndex: '95',
    position: 'fixed',
    left: '0',
    top: '0',
    display: 'grid',
    gridTemplateRows: '1fr 3.5fr 1fr',
    width: '36vw',
    height: '100vh',
    transform: isOpen ? 'none' : 'translateX(-37vw)',
    backgroundColor: 'white',
    borderRight: 'rgb(240, 240, 240) solid 1px',
    transition: 'all 1s',
  };

  return (
    <nav style={navStyle}>
      <div className="logo-box">
        <img src={logo} alt="app-logo" className="app-logo" />
      </div>
      <ul className="pages-link">
        {isAuthenticated && (
          <li>
            <NavLink to="/home">
              <button type="button" onClick={() => handleHideNav()}>
                HOTELS
              </button>
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <NavLink to="/reservations/my-reservations">
              <button type="button" onClick={() => handleHideNav()}>
                RESERVATIONS
              </button>
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <NavLink to="/reservations/new">
              <button type="button" onClick={() => handleHideNav()}>
                RESERVE A ROOM
              </button>
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <>
            <li>
              <NavLink to="/hotel/new">
                <button type="button" onClick={() => handleHideNav()}>
                  ADD HOTEL
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/hotels" className="last-nav-link">
                <button type="button" onClick={() => handleHideNav()}>
                  DELETE HOTEL
                </button>
              </NavLink>
            </li>
          </>
        )}
      </ul>

      <section className="auth-wrapper">
        <ul className="auth-box">
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/auth" className="auth-link">
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(toLogin());
                      handleHideNav();
                    }}
                  >
                    Log In
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/auth" className="auth-link">
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(toRegister());
                      handleHideNav();
                    }}
                  >
                    Sign Up
                  </button>
                </Link>
              </li>
            </>
          )}
          {isAuthenticated && user && (
            <li>
              <h4 className="username">{user.name}</h4>
              <button
                type="button"
                className="down-btn"
                onClick={() => {
                  handleLogout();
                  handleHideNav();
                }}
              >
                Log Out
              </button>
            </li>
          )}
        </ul>
      </section>

      <div className="social-box">
        <FaPinterestP />
        <FaTwitter />
        <FaFacebook />
      </div>
    </nav>
  );
};

export default SideBar;
