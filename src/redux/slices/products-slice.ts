import { items } from '@/api/business/itemApi';
import Item from '@/type/Item';
import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';


export const fetchData = createAsyncThunk(
  'items/getData',
  async () => {
    try {
      const response = await items();

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
  items: Item[]
}

const initialState: sliceType = {
  items: []
}

const mainProductSlice = createSlice({
  name: 'main-product',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.items = action.payload.items;
    })
  },

})

export default mainProductSlice.reducer;