import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLocalStorage } from '../../helpers/localStorage';

const url = 'http://localhost:3000/reservations';

const initialState = {
  reservations: [],
  isLoading: false,
  fetched: false,
  error: null,
};

export const fetchreservations = createAsyncThunk(
  'reservation/fetchreservations',
  async (_, thunkAPI) => {
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
  },
);

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchreservations.pending]: (state) => ({ ...state, isLoading: true }),
    [fetchreservations.fulfilled]: (state, action) => ({
      ...state,
      isLoading: false,
      fetched: true,
      reservations: action.payload,
    }),
    [fetchreservations.rejected]: (state, action) => ({
      ...state,
      isLoading: true,
      error: action.payload,
    }),
  },
});

export default reservationSlice.reducer;
