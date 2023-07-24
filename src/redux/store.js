import { configureStore } from '@reduxjs/toolkit';

import AuthenticationReducer from './auth/authenticationSlice';
import ReservationReducer from './reservation/reservation';

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
    reservations: ReservationReducer,
  },
});

export default store;
