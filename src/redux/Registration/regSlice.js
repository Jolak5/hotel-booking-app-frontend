import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'http://localhost:3000/users';

const initialState = {
  token: null,
  isLoading: false,
  error: null,
};

export const postRegistration = createAsyncThunk('home/postregistration', async (user, thunkAPI) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postRegistration.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(postRegistration.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.token = payload.token;
    });
    builder.addCase(postRegistration.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export default registrationSlice.reducer;
