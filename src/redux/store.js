import { configureStore } from '@reduxjs/toolkit';
import AuthenticationReducer from './auth/authenticationSlice';
import newReducer from './hotel/newhotelSlice';

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
    new: newReducer,
  },
});

export default store;
