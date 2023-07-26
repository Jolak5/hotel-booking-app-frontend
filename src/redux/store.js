import { configureStore } from '@reduxjs/toolkit';
import AuthenticationReducer from './auth/authenticationSlice';
import ReservationReducer from './reservation/reservation';
import newReducer from './hotel/newhotelSlice';
import homeReducer from './Home/homeSlice';
import detailsReducer from './Details/detailsSlice';

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
    reservations: ReservationReducer,
    new: newReducer,
    home: homeReducer,
    details: detailsReducer,
  },
});

export default store;
