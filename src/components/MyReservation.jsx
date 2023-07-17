import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../redux/homeSlice';

function MyReservation() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <button
        type="button"
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <h1>Welcome to the random greeting app!</h1>
      this is me right here
    </div>
  );
}
export default MyReservation;
