import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './Login/loginSlice';
import registrationReducer from './Registration/regSlice';
import homeSlice from './Home/homeSlice';
import detailsSlice from './Details/detailsSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    registration: registrationReducer,
    home: homeSlice,
    details: detailsSlice,
  },
});

export default store;
