import { configureStore } from '@reduxjs/toolkit';
import glbReducer from './tabSlice';
export const store = configureStore({
  reducer: {
    glb: glbReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
