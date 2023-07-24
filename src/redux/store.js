import { configureStore } from '@reduxjs/toolkit';
import AuthenticationReducer from './auth/authenticationSlice';
import homeReducer from './Home/homeSlice';
import detailsReducer from './Details/detailsSlice';

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
    home: homeReducer,
    details: detailsReducer,
  },
});

export default store;
