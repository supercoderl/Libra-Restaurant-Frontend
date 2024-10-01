import { items } from '@/api/business/itemApi';
import Item from '@/type/Item';
import Query from '@/type/Query';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchData = createAsyncThunk(
  'items/getData',
  async (data?: Query) => {
    try {
      const response = await items(data);

      if (response?.success && response?.data) {
        return {
          items: response?.data?.items,
        }
      }
      return {
        items: []
      };
    } catch (error) {
      console.log(error);
      return {
        items: []
      }
    }
  }
)

type sliceType = {
  items: Item[],
  loading: boolean
}

const initialState: sliceType = {
  items: [],
  loading: false
}

const mainProductSlice = createSlice({
  name: 'main-product',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
      })
  },

})

export default mainProductSlice.reducer;