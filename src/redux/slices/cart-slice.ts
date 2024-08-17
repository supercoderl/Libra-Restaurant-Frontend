import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import Item from '@/type/Item';

//stateType
type useCartType = {
  isOpen: boolean;
  itemsInCart: { item: Item, quantityOrder: number }[];
}


//initialState
const initialState: useCartType = {
  isOpen: false,
  itemsInCart: [],
}


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
    addItem: (state: Draft<typeof initialState>, action: PayloadAction<Item>) => {
      let index: number | null = null;
      if (!state.itemsInCart) {
        state.itemsInCart = [];
      }
      if (state.itemsInCart.length) {
        state.itemsInCart.forEach((element, i) => {
          if (element.item.itemId == action.payload.itemId) {
            index = i
          }
        })
      }
      if (index !== null) {
        state.itemsInCart[index].quantityOrder = state.itemsInCart[index].quantityOrder + 1
        return
      }
      state.itemsInCart.push({ item: action.payload, quantityOrder: 1 })
    },
    removeItem: (state: Draft<typeof initialState>, action: PayloadAction<number>) => {
      state.itemsInCart = state.itemsInCart.filter((element) => element.item.itemId != action.payload)
    },
    changeQuantity: (state: Draft<typeof initialState>, action: PayloadAction<{ id: number, quantity: number }>) => {
      const index = state.itemsInCart.findIndex(element => element.item.itemId === action.payload.id)
      state.itemsInCart[index].quantityOrder = action.payload.quantity
    },
    clearCart: (state: Draft<typeof initialState>) => {
      state.itemsInCart = []
    }
  },
});

// Reducers and actions
export const { openCart, closeCart, toggleCart, addItem, removeItem, changeQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;