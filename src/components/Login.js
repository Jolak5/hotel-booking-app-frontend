import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../redux/Login/loginSlice';

const Login = () => {
  const dispatch = useDispatch();

  const {
    token, isLoading, error,
  } = useSelector((state) => state.login);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postLogin({ name, password }));
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && (
        <p>
          Error:
          {error}
        </p>
      )}
      {token && (
        <p>
          Logged in with token:
          {token}
        </p>
      )}
    </div>
  );
};

export default Login;
