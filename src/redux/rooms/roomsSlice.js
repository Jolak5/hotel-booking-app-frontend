import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000/api/v1/greetings';
const initialState = {
  roomsStore: [],
  status: 'idle',
  error: null,
};

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const RoomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRooms.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.roomsStore = state.roomsStore.concat(action.payload);
    });
    builder.addCase(fetchRooms.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default RoomsSlice.reducer;
