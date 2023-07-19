import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleUpdate,
  logInUser,
  registerUser,
  toggleFormAuth,
} from '../redux/auth/authenticationSlice';
import AuthRedirect from '../components/AuthRedirect';

const Authentication = () => {
  const dispatch = useDispatch();

  const {
    tempUser: { username, password, confirmPassword },
  } = useSelector((state) => state.auth);

  const formAuth = useSelector((state) => state.auth.formAuth);

  const handleLogIn = () => {
    dispatch(
      logInUser({
        user: {
          username,
          password,
        },
      })
    );
  };

  const handleRegister = () => {
    dispatch(
      registerUser({
        user: {
          username,
          password,
        },
      })
    );
    dispatch(toggleFormAuth());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleUpdate({ name, value }));
  };

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
      <form onSubmit={(e) => handleSubmit(e)} className="form-wrapper">
        <h1 className="auth-title">
          {formAuth === 'login' ? 'Log In' : 'Register'}
        </h1>

        <input
          type="text"
          placeholder="username"
          id="username"
          name="username"
          value={username}
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
        <button type="submit">
          {formAuth === 'login' ? 'Log In' : 'Register'}
        </button>
        {formAuth === 'login' ? (
          <>
            <p>Don&apos;t have an account?</p>
            <button type="button" onClick={() => dispatch(toggleFormAuth())}>
              Register
            </button>
          </>
        ) : (
          <>
            <p>Already have an account?</p>
            <button type="button" onClick={() => dispatch(toggleFormAuth())}>
              Log In
            </button>
          </>
        )}
      </form>
    </main>
  );
};

export default AuthRedirect(Authentication);
