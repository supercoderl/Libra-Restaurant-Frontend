import { employees } from '@/api/business/userApi';
import { Employee } from '@/type/Employee';
import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';


export const fetchEmployeeData = createAsyncThunk(
    'employees/getData',
    async () => {
        try {
            const response = await employees();

            if (response?.success && response?.data) {
                return {
                    employees: response?.data?.items,  // Or any other default value
                }
            }
            return {
                employees: [],
            };
        } catch (error) {
            console.log(error);
            return {
                employees: [],
            }
        }
    }
)

type sliceType = {
    employees: Employee[]
}

const initialState: sliceType = {
    employees: [],
}

const mainEmployeeSlice = createSlice({
    name: 'main-employee',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchEmployeeData.fulfilled, (state, action) => {
            state.employees = action.payload.employees;
        })
    },

})

export default mainEmployeeSlice.reducer;