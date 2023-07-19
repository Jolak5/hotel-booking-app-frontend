import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postRegistration } from '../redux/Registration/regSlice';

const Registration = () => {
  const dispatch = useDispatch();

  const {
    token, isLoading, error,
  } = useSelector((state) => state.registration);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postRegistration({ user: { name, password } }));
  };

  return (
    <div>
      <h1>Registration Page</h1>
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
        <button type="submit">Register</button>
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
        registered in with token:
        {token}
      </p>
      )}
    </div>
  );
};

export default Registration;
