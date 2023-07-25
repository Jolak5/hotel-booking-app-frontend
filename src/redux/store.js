import { configureStore } from '@reduxjs/toolkit';
import AuthenticationReducer from './auth/authenticationSlice';
import homeReducer from './Home/homeSlice';
import detailsReducer from './Details/detailsSlice';
import newReducer from './newhotel/newhotelSlice';

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
    home: homeReducer,
    details: detailsReducer,
    new: newReducer,
  },
});

export default store;
