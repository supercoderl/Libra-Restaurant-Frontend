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
    id: any;
    isChanged: boolean;
    capacity: number;
    customerName: string;
    customerPhone: string;
    storeId: any;
    tableNumber: number
}

const initialState: sliceType = {
    status: -1,
    id: null,
    isChanged: false,
    capacity: 0,
    customerName: '',
    customerPhone: '',
    storeId: null,
    tableNumber: -1
}

const mainReservationSlice = createSlice({
    name: 'main-reservation',
    initialState: initialState,
    reducers: {
        updateReservation: (state, action) => {
            const { reservationId, isChanged, capacity, storeId, tableNumber } = action.payload;
            state.isChanged = isChanged
            state.id = reservationId
            state.capacity = capacity
            state.storeId = storeId
            state.tableNumber = tableNumber
        },
        updateReservationStatus: (state, action) => {
            const { status, tableNumber } = action.payload;
            return {
                ...state,
                status,
                tableNumber
            }
        },
        updateReservationCustomer: (state, action) => {
            const { customerName, customerPhone } = action.payload;
            return {
                ...state,
                customerName,
                customerPhone
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getStatus.fulfilled, (state, action) => {
            state.status = action.payload;
        })
    },

})

export const { updateReservation, updateReservationStatus, updateReservationCustomer } = mainReservationSlice.actions

export default mainReservationSlice.reducer;