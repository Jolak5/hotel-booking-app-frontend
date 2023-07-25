import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLocalStorage } from '../../helpers/localStorage';

const url = 'http://localhost:3000/hotels';

const initialState = {
  hotels: [],
  isLoading: false,
  fetched: false,
  error: null,
};

export const createHotel = createAsyncThunk(
  'home/createHotel',
  async (newHotel, thunkAPI) => {
    try {
      const token = getLocalStorage('token');

      const formData = new FormData();
      formData.append('hotel[name]', newHotel.name);
      formData.append('hotel[description]', newHotel.description);
      formData.append('hotel[duration]', newHotel.duration);
      formData.append('hotel[price]', newHotel.price);
      formData.append('hotel[image]', newHotel.image);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const newSlice = createSlice({
  name: 'new',
  initialState,
  reducers: {},
  extraReducers: {
    [createHotel.pending]: (state) => ({ ...state, isLoading: true }),
    [createHotel.fulfilled]: (state, action) => ({
      ...state,
      isLoading: false,
      hotels: [...state.hotels, action.payload],
    }),
    [createHotel.rejected]: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },
});

export default newSlice.reducer;
