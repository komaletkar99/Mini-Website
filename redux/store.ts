// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import priceReducer from './slices';

const rootReducer = combineReducers({
  price: priceReducer,
});

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const wrapper = createWrapper(makeStore);

