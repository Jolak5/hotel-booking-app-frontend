import { configureStore } from '@reduxjs/toolkit';
import AuthenticationReducer from './auth/authenticationSlice';
import homeReducer from './Home/homeSlice';
import detailsReducer from './Details/detailsSlice';
import ReservationReducer from './reservation/reservation';

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
    home: homeReducer,
    details: detailsReducer,
    reservations: ReservationReducer,
  },
});

export default store;
