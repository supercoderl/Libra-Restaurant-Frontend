import { generateCode, reservationByTableAndStore, reservationCustomer } from "@/api/business/reservationApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getStatus = createAsyncThunk(
    'reservations/getStatus',
    async ({ tableNumber, storeId }: { tableNumber: number, storeId: string }) => {
        const response = await reservationByTableAndStore(tableNumber, storeId);
        if (response?.success)
            return response?.data;
        return null;
    }
)

export const updateReservationAsync = createAsyncThunk(
    'reservation/updateReservationAsync',
    async (reservationData: any, { rejectWithValue }) => {
        try {
            const response = await reservationCustomer({
                reservationId: reservationData.reservationId,
                status: reservationData.status,
                customerName: reservationData.customerName,
                customerPhone: reservationData.customerPhone
            });
            if (response?.success) {
                return reservationData;
            }
            return null;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const generateCodeAsync = createAsyncThunk(
    'reservation/generateCodeAsync',
    async (reservationId: number, { rejectWithValue }) => {
        try {
            const response = await generateCode(reservationId);
            if (response?.success) {
                return response?.data;
            }
            return null;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

type sliceType = {
    status: number;
    id: any;
    isChanged: boolean;
    capacity: number;
    customerName: string;
    customerPhone: string;
    storeId: any;
    tableNumber: number;
    loading: boolean;
}

const initialState: sliceType = {
    status: -1,
    id: null,
    isChanged: false,
    capacity: 0,
    customerName: '',
    customerPhone: '',
    storeId: null,
    tableNumber: -1,
    loading: false
}

const mainReservationSlice = createSlice({
    name: 'main-reservation',
    initialState: initialState,
    reducers: {
        updateReservationStatus: (state, action) => {
            const { status, tableNumber } = action.payload;
            return {
                ...state,
                status,
                tableNumber
            }
        },
        updateReservationOccupied: (state, action) => {
            const { reservationId, capacity, storeId, tableNumber, isChanged } = action.payload;

            state.id = reservationId;
            state.capacity = capacity;
            state.storeId = storeId;
            state.tableNumber = tableNumber;
            state.isChanged = isChanged; // Cập nhật xong
        },
        clearReservation: (state) => {
            state.status = -1;
            state.id = null;
            state.isChanged = false;
            state.capacity = 0;
            state.customerName = '';
            state.customerPhone = '';
            state.storeId = null;
            state.tableNumber = -1;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getStatus.fulfilled, (state, action) => {
            if (action.payload) {
                state.id = action.payload.reservationId;
                state.status = action.payload.status;
                state.customerName = action.payload.customerName;
                state.customerPhone = action.payload.customerPhone;
            }
        });
        builder
            .addCase(updateReservationAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateReservationAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    const { reservationId, capacity, isChanged, storeId, tableNumber } = action.payload;

                    // Cập nhật state bằng dữ liệu đã truyền vào
                    state.id = reservationId;
                    state.capacity = capacity;
                    state.storeId = storeId;
                    state.tableNumber = tableNumber;
                    state.isChanged = isChanged; // Cập nhật xong
                }
                state.loading = false;
            })
            .addCase(updateReservationAsync.rejected, (state, action) => {
                state.loading = false;
            });
        builder
            .addCase(generateCodeAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(generateCodeAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(generateCodeAsync.rejected, (state) => {
                state.loading = false;
            });
    },

})

export const { updateReservationStatus, clearReservation, updateReservationOccupied } = mainReservationSlice.actions

export default mainReservationSlice.reducer;