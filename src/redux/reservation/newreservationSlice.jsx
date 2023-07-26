import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLocalStorage } from '../../helpers/localStorage';

const url = 'http://localhost:3000//reservations';

export const postReservation = createAsyncThunk(
  'reservation/postReservation',
  async (reservationData) => {
    const token = getLocalStorage('token');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reservationData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Could not post reservation');
    }
    return data;
  },
);

const newreservationSlice = createSlice({
  name: 'newreservation',
  initialState: {
    reserve: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postReservation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postReservation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reserve.push(action.payload);
      })
      .addCase(postReservation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default newreservationSlice.reducer;
