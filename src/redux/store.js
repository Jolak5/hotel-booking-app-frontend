import { configureStore } from '@reduxjs/toolkit';
import AuthenticationReducer from './auth/authenticationSlice';
import ReservationReducer from './reservation/reservation';
import newReducer from './hotel/newhotelSlice';
import homeReducer from './Home/homeSlice';
import detailsReducer from './Details/detailsSlice';
import deleteReducer from './Delete/deleteSlice';
import SideBarReducer from './sideBar/sideBarSlice';

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
    reservations: ReservationReducer,
    new: newReducer,
    home: homeReducer,
    details: detailsReducer,
    delete: deleteReducer,
    nav: SideBarReducer,
  },
});

export default store;
