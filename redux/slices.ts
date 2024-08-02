// redux/slices.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  symbol: 'GOOG',
  prices: [],
};

const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    setSymbol: (state, action) => {
      state.symbol = action.payload;
    },
  },
});

export const { setPrices, setSymbol } = priceSlice.actions;
export default priceSlice.reducer;
