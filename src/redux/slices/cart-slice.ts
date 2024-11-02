import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import Item from '@/type/Item';
import { toast } from 'react-toastify';
import { OrderLine } from '@/type/OrderLine';
import { Order } from '@/type/Order';
import { actionOrder } from '@/api/business/orderApi';

//stateType
type useCartType = {
  isOpen: boolean;
  itemsInCart: { item: Item, quantityOrder: number }[];
  loading: boolean;
  isSuccess: boolean;
}


//initialState
const initialState: useCartType = {
  isOpen: false,
  itemsInCart: [],
  loading: false,
  isSuccess: false
}

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async (data: Order) => {
    try {
      const response = await actionOrder(data, 'update');

      if (response?.success) {
        return true;
      }
      return false;
    } catch (error) {
      toast("Lỗi hệ thống", { type: "error" });
      return false;
    }
  }
)

//slice
export const cartSlice = createSlice({
  name: 'cart-store',
  initialState: initialState,
  reducers: {
    openCart: (state: Draft<typeof initialState>) => {
      state.isOpen = true
    },
    closeCart: (state: Draft<typeof initialState>) => {
      state.isOpen = false
    },
    toggleCart: (state: Draft<typeof initialState>) => {
      state.isOpen = !state.isOpen
    },
    addItem: (state: Draft<typeof initialState>, action: PayloadAction<{ item: Item, quantity?: number }>) => {
      let index: number | null = null;
      if (!state.itemsInCart) {
        state.itemsInCart = [];
      }
      if (state.itemsInCart.length) {
        state.itemsInCart.forEach((element, i) => {
          if (element.item.itemId == action.payload.item.itemId) {
            index = i
          }
        })
      }
      if (index !== null) {
        if (action.payload.quantity) {
          state.itemsInCart[index].quantityOrder = state.itemsInCart[index].quantityOrder + action.payload.quantity
        }
        else {
          state.itemsInCart[index].quantityOrder = state.itemsInCart[index].quantityOrder + 1
        }
        return
      }
      state.itemsInCart.push({ item: action.payload.item, quantityOrder: action.payload.quantity ? action.payload.quantity : 1 });
      toast(`Đã thêm món ${action.payload.item.title} vào giỏ`, { type: "success" });
    },
    removeItem: (state: Draft<typeof initialState>, action: PayloadAction<number>) => {
      state.itemsInCart = state.itemsInCart.filter((element) => element.item.itemId != action.payload)
    },
    changeQuantity: (state: Draft<typeof initialState>, action: PayloadAction<{ id: number, quantity: number }>) => {
      const index = state.itemsInCart.findIndex(element => element.item.itemId === action.payload.id)
      if (action.payload.quantity > 0) {
        state.itemsInCart[index].quantityOrder = action.payload.quantity
      }
    },
    clearCart: (state: Draft<typeof initialState>) => {
      state.isOpen = false
      state.itemsInCart = []
    },
    updateItemsInCart: (state: Draft<typeof initialState>, action: PayloadAction<({ item: Item, quantityOrder: number })[]>) => {
      state.itemsInCart = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = action.payload;
        toast("Hoàn thành!", { type: "success" });
      })
      .addCase(updateOrder.rejected, (state) => {
        state.loading = false;
        state.isSuccess = false;
      });
  },
});

// Reducers and actions
export const { openCart, closeCart, toggleCart, addItem, removeItem, changeQuantity, clearCart, updateItemsInCart } = cartSlice.actions;

export default cartSlice.reducer;