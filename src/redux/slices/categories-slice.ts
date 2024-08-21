import { categories } from '@/api/business/categoryApi';
import Category from '@/type/Category';
import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';


export const fetchCategoryData = createAsyncThunk(
  'categories/getData',
  async () => {
    try {
      const response = await categories();

      if (response?.success && response?.data) {
        return {
          categories: response?.data?.items,  // Or any other default value
        }
      }
      return {
        categories: [],
      };
    } catch (error) {
      console.log(error);
      return {
        categories: [],
      }
    }
  }
)

type sliceType = {
  categories: Category[]
  currentCategory: number;
}

const initialState: sliceType = {
  categories: [],
  currentCategory: 1
}

const mainCategorySlice = createSlice({
  name: 'main-category',
  initialState: initialState,
  reducers: {
    setCurrentCategory: (state: Draft<typeof initialState>, action: PayloadAction<number>) => {
      state.currentCategory = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryData.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
    })
  },

})
export const { setCurrentCategory } = mainCategorySlice.actions;


export default mainCategorySlice.reducer;