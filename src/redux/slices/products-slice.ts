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
          categories: [],  // Or any other default value
          items: response?.data?.items,
        }
      }
      return {
        categories: [],
        items: []
      };
    } catch (error) {
      console.log(error);
      return {
        categories: [],
        items: []
      }
    }
  }
)

export type categoriesType = {
  id: number;
  name: string;
  icon: string;
}

type sliceType = {
  categories: categoriesType[]
  items: Item[]
  currentCategory: number;
}

const initialState: sliceType = {
  items: [], categories: [],
  currentCategory: 1
}

const mainStoreSlice = createSlice({
  name: 'main-store',
  initialState: initialState,
  reducers: {
    setCurrentCategory: (state: Draft<typeof initialState>, action: PayloadAction<number>) => {
      state.currentCategory = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
      state.items = action.payload.items;
    })
  },

})
export const { setCurrentCategory } = mainStoreSlice.actions;


export default mainStoreSlice.reducer;