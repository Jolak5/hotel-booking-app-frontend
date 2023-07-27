import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLocalStorage } from '../../helpers/localStorage';

const url = 'https://hotel-booking-7djb.onrender.com/hotels';

const initialState = {
  hotels: [],
  isLoading: false,
  fetched: false,
  error: null,
};

export const fetchhotels = createAsyncThunk('home/fetchhotels', async (_, thunkAPI) => {
  try {
    const token = getLocalStorage('token');
    const response = await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchhotels.pending]: (state) => ({ ...state, isLoading: true }),
    [fetchhotels.fulfilled]: (state, action) => ({
      ...state,
      isLoading: false,
      fetched: true,
      hotels: action.payload,
    }),
    [fetchhotels.rejected]: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },

});

export default homeSlice.reducer;
