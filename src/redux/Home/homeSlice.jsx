import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'http://localhost:3000/hotels';

const initialState = {
  hotels: [],
  isLoading: false,
  fetched: false,
  error: null,
};

export const fetchhotels = createAsyncThunk('home/fetchhotels', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
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
