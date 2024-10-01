import { reservationStatus } from "@/api/business/reservationApi";
import { createAsyncThunk, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

export const getStatus = createAsyncThunk(
    'reservations/getStatus',
    async (reservationId: number) => {
        const response = await reservationStatus(reservationId);
        if (response?.success)
            return response?.data;
        return null;
    }
)

type sliceType = {
    status: number;
}

const initialState: sliceType = {
    status: -1
}

const mainReservationSlice = createSlice({
    name: 'main-reservation',
    initialState: initialState,
    reducers: {
        setCurrentCategory: (state: Draft<typeof initialState>, action: PayloadAction<number>) => {
            state.status = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getStatus.fulfilled, (state, action) => {
            state.status = action.payload;
        })
    },

})

export default mainReservationSlice.reducer;