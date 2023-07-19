import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './Login/loginSlice';
import registrationReducer from './Registration/regSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    registration: registrationReducer,
  },
});

export default store;
