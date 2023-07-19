import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '../../helpers/localStorage';

const initialState = {
  token: getLocalStorage('token') || null,
  user: getLocalStorage('user') || null,
  tempUser: {
    name: '',
    password: '',
    confirmPassword: '',
  },
  isLoading: false,
  errors: null,
  formAuth: 'login',
};

export const logInUser = createAsyncThunk(
  'auth/login',
  async (userInput, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/sessions',
        userInput
      );
      const responseData = response.data;

      // Adjust the code below based on the actual response structure
      const token = responseData.token;
      const user = responseData.user;

      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const response = await axios.delete('http://localhost:3000/sessions', {
        headers: {
          authorization: thunkAPI.getState().auth.token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  }
);
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userInput, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/users',
        userInput
      );

      return response.data;
    } catch (error) {
      if (error.response.status === 422) {
        return thunkAPI.rejectWithValue('username must be unique');
      }
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  }
);
const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    handleUpdate: (state, { payload: { name, value } }) => {
      const tempUser = { ...state.tempUser, [name]: value };
      return { ...state, tempUser };
    },
    toggleFormAuth: (state) => ({
      ...state,
      formAuth: state.formAuth === 'login' ? 'register' : 'login',
    }),
    toRegister: (state) => ({
      ...state,
      formAuth: 'register',
    }),
    toLogin: (state) => ({
      ...state,
      formAuth: 'login',
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(logInUser.fulfilled, (state, { payload }) => {
        const { token, user } = payload;

        if (token && user) {
          setLocalStorage('token', token);
          setLocalStorage('user', user);
        }

        return {
          ...state,
          token,
          user,
          isLoading: false,
          tempUser: {
            name: '',
            password: '',
          },
        };
      })
      .addCase(logInUser.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        errors: payload,
      }));
    builder
      .addCase(logOutUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(logOutUser.fulfilled, (state) => {
        removeLocalStorage('token');
        removeLocalStorage('user');
        return {
          ...state,
          isLoading: false,
          token: null,
          user: null,
        };
      })
      .addCase(logOutUser.rejected, (state) => {
        removeLocalStorage('token');
        removeLocalStorage('user');
        return {
          ...state,
          isLoading: false,
          token: null,
          user: null,
        };
      });
    builder
      .addCase(registerUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(registerUser.fulfilled, (state) => ({
        ...state,
        isLoading: false,
        tempUser: {
          name: '',
          confirmPassword: '',
        },
      }))
      .addCase(registerUser.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        errors: payload,
      }));
  },
});
export const { handleUpdate, toggleFormAuth, toRegister, toLogin } =
  authSlice.actions;
export default authSlice.reducer;
