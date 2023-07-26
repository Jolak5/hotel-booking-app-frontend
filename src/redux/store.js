import { configureStore } from '@reduxjs/toolkit';
import AuthenticationReducer from './auth/authenticationSlice';
import homeReducer from './Home/homeSlice';
import detailsReducer from './Details/detailsSlice';
import ReservationReducer from './reservation/reservation';
import newreservationReducer from './reservation/newreservationSlice';

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
    home: homeReducer,
    details: detailsReducer,
    reservations: ReservationReducer,
    newreservation: newreservationReducer,
  },
});

export default store;
