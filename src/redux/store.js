import { configureStore } from '@reduxjs/toolkit';

import AuthenticationReducer from './auth/authenticationSlice';

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
  },
});

export default store;
