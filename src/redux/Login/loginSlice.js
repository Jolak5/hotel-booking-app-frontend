import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'http://localhost:3000/sessions';

const initialState = {
  token: null,
  isLoading: false,
  error: null,
};

export const postLogin = createAsyncThunk('home/postlogin', async (user, thunkAPI) => {
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

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(postLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.token = payload.token;
    });
    builder.addCase(postLogin.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export default loginSlice.reducer;
