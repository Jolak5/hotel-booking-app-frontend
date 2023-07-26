import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLocalStorage } from '../../helpers/localStorage';

const url = 'http://localhost:3000//hotel';

export const deleteHotel = createAsyncThunk(
  'delete/deleteHotel',
  async (hotelID) => {
    const token = getLocalStorage('token');
    const response = await fetch(`${url}${hotelID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Could not delete Hotel');
    }
    return data;
  },
);
const deleteSlice = createSlice({
  name: 'delete',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteHotel.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteHotel.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteHotel.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default deleteSlice.reducer;