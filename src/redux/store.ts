import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import cartSlice from './slices/cart-slice';
import mainProductSlice, { fetchData } from './slices/products-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import emblaSlice from './slices/embla-slice';
import reservationSlice, { getStatus } from './slices/reservation-slice';
import mainPaymentMethodSlice, { fetchDataPaymentMethod } from './slices/paymentMethod-slice';
import mainCategorySlice, { fetchCategoryData } from './slices/categories-slice';
import mainLocationSlice, { fetchLocationData } from './slices/locations-slice';

const reducers = combineReducers({
  cart: cartSlice,
  mainProductSlice: mainProductSlice,
  emblaStore: emblaSlice,
  reservation: reservationSlice,
  mainPaymentMethodSlice: mainPaymentMethodSlice,
  mainCategorySlice: mainCategorySlice,
  mainLocationSlice: mainLocationSlice
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useStoreDispatch = () => useDispatch<AppDispatch>()
export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector

store.dispatch(fetchData());
store.dispatch(fetchDataPaymentMethod());
store.dispatch(fetchCategoryData());
store.dispatch(fetchLocationData());

export default store