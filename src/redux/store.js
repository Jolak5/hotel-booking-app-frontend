import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from './rooms/roomsSlice';
import AuthenticationReducer from './auth/authenticationSlice';

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
    room: roomsReducer,
  },
});

export default store;
