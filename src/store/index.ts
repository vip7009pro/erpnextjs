import { configureStore } from '@reduxjs/toolkit';
import glbReducer from './tabSlice';
import workflowReducer from './workflowSlice';
export const store = configureStore({
  reducer: {
    glb: glbReducer,
    workflow: workflowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
