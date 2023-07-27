import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  handleUpdate,
  logInUser,
  registerUser,
  toggleFormAuth,
  clearErrors,
} from '../redux/auth/authenticationSlice';
import '../styles/Authentication.css';

const Authentication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    token,
    errors,
    tempUser: { name, password, confirmPassword },
  } = useSelector((state) => state.auth);

  const formAuth = useSelector((state) => state.auth.formAuth);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch, formAuth]);

  const handleLogIn = (e) => {
    e.preventDefault();

    dispatch(logInUser({ name, password }));
  };

  const handleRegister = () => {
    dispatch(registerUser({ user: { name, password } }));
    dispatch(toggleFormAuth());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleUpdate({ name, value }));
  };

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formAuth === 'login') {
      handleLogIn(e);
    } else {
      handleRegister(e);
    }
  };

  return (
    <main className="auth-main">
      <div className="auth-welcome-text-container">
        <h3 className="welcome-heading">HOTEL BOOKING APP</h3>
        <p className="auth-welcome-message">
          Discover the best hotels around the world and book your dream vacation
          today. Sign up or login to unlock exclusive deals and offers!
        </p>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="form-wrapper">
        <h3 className="auth-title">
          {formAuth === 'login' ? 'Log In' : 'Register'}
        </h3>
        {errors && <p className="error-message">{errors}</p>}
        <input
          type="text"
          placeholder="name"
          id="name"
          name="name"
          value={name}
          onChange={(e) => handleChange(e)}
          required
        />

        <input
          type="password"
          placeholder="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => handleChange(e)}
          required
        />

        {formAuth === 'register' && (
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleChange(e)}
            required
          />
        )}
        <div className="buttons-div">
          <button type="submit" className="submit">
            {formAuth === 'login' ? 'Log In' : 'Register'}
          </button>
          {formAuth === 'login' ? (
            <>
              <p>Don&apos;t have an account?</p>
              <button
                type="button"
                className="register"
                onClick={() => dispatch(toggleFormAuth())}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <button
                type="button"
                className="login-btn"
                onClick={() => dispatch(toggleFormAuth())}
              >
                Log In
              </button>
            </>
          )}
        </div>
      </form>
    </main>
  );
};

export default Authentication;
