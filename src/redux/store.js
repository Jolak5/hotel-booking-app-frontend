import { configureStore } from '@reduxjs/toolkit';
import AuthenticationReducer from './auth/authenticationSlice';
import homeReducer from './Home/homeSlice';

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
    home: homeReducer,
  },
});

export default store;
