import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    hoteldetails: [],
    iLoading: false,
    error: null,
};

const url = 'http://localhost:3000/hotels/';

export const fetchHotel = createAsyncThunk('details/fetchhotels', async (id, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}${id}`, {
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

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchHotel.pending]: (state) => ({ ...state, isLoading: true }),
        [fetchHotel.fulfilled]: (state, action) => ({
            ...state,
            isLoading: false,
            hoteldetails: action.payload,
        }),
        [fetchHotel.rejected]: (state, action) => ({
            ...state,
            isLoading: false,
            error: action.payload,
        }),

    },
});

export default detailsSlice.reducer;