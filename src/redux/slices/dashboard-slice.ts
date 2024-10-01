import { analytic } from '@/api/business/dashboardApi';
import Dashboard from '@/type/Dashboard';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchDataDashboard = createAsyncThunk(
    'dashboard/analytic',
    async () => {
        try {
            const response = await analytic();
            if (response?.success && response?.data) {
                return {
                    data: response?.data,
                }
            }
            return {
                data: { orderCount: 0, paymentAmount: 0 }
            };
        } catch (error) {
            console.log(error);
            return {
                data: { orderCount: 0, paymentAmount: 0 }
            }
        }
    }
)

type sliceType = {
    data: Dashboard
}

const initialState: sliceType = {
    data: {
        orderCount: 0,
        paymentAmount: 0,
        customer: {
            customerCountInThisMonth: 0,
            customerCountInLastMonth: 0,
            percentage: 0
        }
    }
}

const mainDashboardSlice = createSlice({
    name: 'main-dashboard-method',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDataDashboard.fulfilled, (state, action) => {
            state.data = action.payload.data;
        })
    },

})

export default mainDashboardSlice.reducer;